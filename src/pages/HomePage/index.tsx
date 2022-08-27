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
import './styles.scss';

export function HomePage() {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    populateData();
  });

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
      const data = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      const response = await GeocodingService.getByLatitudeLongitude(data);
      console.log('response', response);

    }, () => {
      console.log('Unable to retrieve your location');
    });
  }

  return (
    <>
      <BaseLayout>
        <div className="home">
          <aside className="image-container">
            <img src={Rain} alt="rain" />
            <figcaption className="country-state-text">Tokyo, Japan</figcaption>
            <figcaption className="temperature-text">
              19°C <figcaption>Rain</figcaption>
            </figcaption>
          </aside>

          <div className="data-container">
            <div className="infos-data">
              <div className="sunrise-sunset-text">
                <span>Sunrise: 06:30</span>
                <span>Sunset: 17:45</span>
              </div>
              <div className="min-max-text">
                <span>Max: 23°</span>
                <span>Min: 15°</span>
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
                subtitle="26°"
              />
              <Info
                image={Pressure}
                alt="sol"
                title="Pressure"
                subtitle="1018 hPa"
              />
              <Info
                image={Precipitation}
                alt="sol"
                title="Precipitation"
                subtitle="0.3 mm"
              />
              <Info
                image={DewPoint}
                alt="sol"
                title="Dew point"
                subtitle="21°"
              />
              <Info
                image={Humidity}
                alt="sol"
                title="Humidity"
                subtitle="76%"
              />
              <Info
                image={UvIndex}
                alt="sol"
                title="UV index"
                subtitle="6/10"
              />
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
