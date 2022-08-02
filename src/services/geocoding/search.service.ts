import { api } from '../axios-config';
import { City, LatitudeLongitude, Forecast } from '../../types/type-services/geocoding-types';

class GeocodingService {
  async getByCity(data: City) {
    try {
      return await api.post('geocoding/namePrefix', data);
    } catch (error) {
      console.log(error);
    }
  }

  async getByLatitudeLongitude(data: LatitudeLongitude) {
    try {
      return await api.post('/geocoding/latLong', data);
    } catch (error) {
      console.log(error);
    }
  }

  async getForecast(data: Forecast) {
    try {
      return await api.post('/onecall', data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new GeocodingService();