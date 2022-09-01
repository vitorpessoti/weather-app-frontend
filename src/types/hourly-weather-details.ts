import { WeatherDescription } from "./weather-description"

export type HourlyWeatherDetails = {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: Array<WeatherDescription>,
    pop: number
}