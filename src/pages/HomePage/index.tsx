import { useEffect, useState } from 'react';
import { BaseLayout } from '../../layouts/BaseLayout';
import Rain from '../../assets/images/10n.jpg';
import UvIndex from '../../assets/in_app_icons/sun.png';
import Wind from '../../assets/in_app_icons/wind.png';
import FeelsLike from '../../assets/in_app_icons/feels-like.png';
import Pressure from '../../assets/in_app_icons/pressure.png';
import Precipitation from '../../assets/in_app_icons/precipitation.png';
import DewPoint from '../../assets/in_app_icons/dew-point.png';
import Humidity from '../../assets/in_app_icons/humidity.png';
import { Info } from '../../components/Card';
import Button from '@mui/material/Button';
import GeocodingService from '../../services/geocoding/search.service';
import Dates from '../../services/utils/dates';
import './styles.scss';
import ReactLoading from 'react-loading';

type Location = {
  [key: string]: any;
}
type Weather = {
  [key: string]: any;
}

export function HomePage() {
  const [location, setLocation] = useState({} as Location);
  const [weather, setWeather] = useState({} as Weather);
  const [sunrise, setSunrise] = useState(new Date());
  const [sunset, setSunset] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    populateData();
  }, []);

  async function populateData() {
    if (!isGeolocationSupported()) {
      console.log('Geolocation is not supported by your browser');
    } else {
      await getLocation();
    }
  }

  function isGeolocationSupported() {
    return navigator.geolocation;
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
      setCurrentTime(Dates.timestampToDate(weatherResponse.data.item.current.dt));
      setSunrise(Dates.timestampToDate(weatherResponse.data.item.current.sunrise));
      setSunset(Dates.timestampToDate(weatherResponse.data.item.current.sunset));
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
          <div className="home">
            <aside className="image-container">
              <img src={Rain} alt="rain" />
              <figcaption className="country-state-text">{location.city}, {location.regionCode}, {location.country}</figcaption>
              <figcaption className="temperature-text">
                {Math.round(weather.current.temp)}°C 
                <figcaption>
                  {weather.current.weather[0].main}
                </figcaption>
              </figcaption>
            </aside>

            <div className="data-container">
              <div className="infos-data">
                <div className="sunrise-sunset-text">
                  <span>Sunrise: {Dates.formatDate(sunrise, 'HH:mm')}</span>
                  <span>Sunset: {Dates.formatDate(sunset, 'HH:mm')}</span>
                </div>
                <div className="min-max-text">
                  <span>Max: {Math.round(weather.daily[0].temp.max)}°</span>
                  <span>Min: {Math.round(weather.daily[0].temp.min)}°</span>
                </div>
                <div className="button-group">
                  <Button variant="contained" size="large">
                    Hourly
                  </Button>
                  <Button variant="contained" size="large">
                    Daily
                  </Button>
                </div>
              </div>
              <div className="cards-container">
                <Info image={Wind} alt="sol" title="Wind" subtitle="6.69 km/h" />
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
            </div>
          </div>
        </BaseLayout>
      </>
    );
  }
}
