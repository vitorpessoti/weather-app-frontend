import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Rain from '../../assets/images/10n.jpg';
import DewPoint from '../../assets/in_app_icons/dew-point.png';
import FeelsLike from '../../assets/in_app_icons/feels-like.png';
import Humidity from '../../assets/in_app_icons/humidity.png';
import Precipitation from '../../assets/in_app_icons/precipitation.png';
import Pressure from '../../assets/in_app_icons/pressure.png';
import UvIndex from '../../assets/in_app_icons/sun.png';
import Wind from '../../assets/in_app_icons/wind.png';
import { Info } from '../../components/Card';
import { DailyForecast } from '../../components/DailyForecast/daily-forecast';
import { HourlyForecast } from '../../components/HourlyForecast/hourly-forecast';
import { BaseLayout } from '../../layouts/BaseLayout';
import GeocodingService from '../../services/geocoding/search.service';
import Dates from '../../services/utils/dates';
import './styles.scss';
import { Location } from '../../types/location';
import { Weather } from '../../types/weather';

export function HomePage() {
  const [location, setLocation] = useState({} as Location);
  const [weather, setWeather] = useState({} as Weather);
  const [sunrise, setSunrise] = useState(new Date());
  const [sunset, setSunset] = useState(new Date());
  const [dailyRows, setDailyRows] = useState<JSX.Element[]>([]);
  const [hourlyRows, setHourlyRows] = useState<JSX.Element[]>([]);

  useEffect(() => {
    populateData();
  }, []);

  const isGeolocationSupported = () => navigator.geolocation;
  const styles = {
    mainCard: {
      backgroundImage: `url(${Rain})`
    },
    imageList: {
      flexWrap: 'nowrap'
    },
    image: {
      maxWidth: 200
    }
  }

  async function populateData() {
    if (!isGeolocationSupported()) {
      console.log('Geolocation is not supported by your browser');
    } else {
      await getLocation();
    }
  }

  async function getLocation() {
    console.log('Locating...');
    navigator.geolocation.getCurrentPosition(async (position) => {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      const weatherData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        units: 'metric'
      };

      const locationResponse = await GeocodingService.getByLatitudeLongitude(locationData);
      const weatherResponse = await GeocodingService.getForecast(weatherData);

      setLocation(locationResponse.data.item.data[0]);
      setWeather(weatherResponse.data.item);
      setSunrise(Dates.timestampToDate(weatherResponse.data.item.current.sunrise));
      setSunset(Dates.timestampToDate(weatherResponse.data.item.current.sunset));

      for (let i = 0; i < weatherResponse.data.item.daily.length; i++) {
        const day = weatherResponse.data.item.daily[i];
        const dayDate = Dates.timestampToDate(day.dt);
        const formattedDate = Dates.formatDate(dayDate, 'MMM DD');
        const tempMax = Math.round(day.temp.max);
        const tempMin = Math.round(day.temp.min);
        const image = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const newDailyForecastElement = <DailyForecast
          image={image}
          alt={day.weather.description}
          title={formattedDate}
          subtitle={`${tempMax}º - ${tempMin}º`}
        />;
        setDailyRows(oldArray => [...oldArray, newDailyForecastElement]);
      }

      for (let i = 0; i < weatherResponse.data.item.hourly.length; i++) {
        const hour = weatherResponse.data.item.hourly[i];
        const hourDate = Dates.timestampToDate(hour.dt);
        const formattedDate = Dates.formatDate(hourDate, 'h a');
        const temp = Math.round(hour.temp);
        const image = `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
        const newHourlyForecastElement = <HourlyForecast
          image={image}
          alt={hour.weather.description}
          title={formattedDate}
          subtitle={`${temp}º`}
        />;
        setHourlyRows(oldArray => [...oldArray, newHourlyForecastElement]);
      }
    }, () => {
      console.log('Unable to retrieve your location');
    });
  }

  if (!location.city) {
    return (
      <BaseLayout>
        <div className="home d-flex-horizontally-centered">
          <ReactLoading type='bubbles' color='#1976d2' height={'5%'} width={'5%'} />
        </div>
      </BaseLayout>
    )
  } else {
    return (
      <>
        <BaseLayout>
          <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Grid container spacing={6}>
              <Grid item xs={5}>
                <Card className="image-container" style={styles.mainCard} sx={{ minHeight: 200 }}>
                  <CardContent>
                    <span className="image-container-text location-text">
                      {location.city}, {location.regionCode}, {location.country}
                    </span>
                  </CardContent>
                  <CardActions sx={{ padding: '16px' }}>
                    <span className="image-container-text temperature-text">
                      {Math.round(weather.current.temp)}°C
                      <br />
                      {weather.current.weather[0].main}
                    </span>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={7}>
                <div className="infos-data">
                  <div className="sunrise-sunset-text">
                    <span>Sunrise: {Dates.formatDate(sunrise, 'HH:mm')}</span>
                    <span>Sunset: {Dates.formatDate(sunset, 'HH:mm')}</span>
                  </div>
                  <div className="min-max-text">
                    <span>Max: {Math.round(weather.daily[0].temp.max)}°</span>
                    <span>Min: {Math.round(weather.daily[0].temp.min)}°</span>
                  </div>
                </div>

                <div className="cards-container">
                  <Info
                    image={Wind}
                    alt="sol"
                    title="Wind"
                    subtitle={weather.current.wind_speed + ' m/s'}
                  />
                  <Info
                    image={FeelsLike}
                    alt="sol"
                    title="Feels like"
                    subtitle={Math.round(weather.current.feels_like) + 'º'}
                  />
                  <Info
                    image={Pressure}
                    alt="sol"
                    title="Pressure"
                    subtitle={weather.current.pressure + ' hPa'}
                  />
                  <Info
                    image={Precipitation}
                    alt="sol"
                    title="% Precip."
                    subtitle={(weather.daily[0].pop * 100) + '%'}
                  />
                  <Info
                    image={DewPoint}
                    alt="sol"
                    title="Dew point"
                    subtitle={Math.round(weather.current.dew_point) + ' º'}
                  />
                  <Info
                    image={Humidity}
                    alt="sol"
                    title="Humidity"
                    subtitle={weather.current.humidity + '%'}
                  />
                  <Info
                    image={UvIndex}
                    alt="sol"
                    title="UV index"
                    subtitle={Math.round(weather.current.uvi) + '/10'}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <h3>8-day forecast</h3>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <div className="scrolling-wrapper">
                  {dailyRows}
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <h3>Hourly forecast</h3>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <div className="scrolling-wrapper">
                  {hourlyRows}
                </div>
              </Grid>
            </Grid>
          </Box>
        </BaseLayout>
      </>
    );
  }
}
