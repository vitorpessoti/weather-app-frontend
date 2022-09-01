import { CurrentWeatherDetails } from "./current-weather-details"
import { DailyWeatherDetails } from "./daily-weather-details"
import { HourlyWeatherDetails } from "./hourly-weather-details"

export type Weather = {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: CurrentWeatherDetails,
    hourly: Array<HourlyWeatherDetails>,
    daily: Array<DailyWeatherDetails>
  }