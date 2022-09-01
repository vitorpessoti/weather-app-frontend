import { Temperature } from "./temperature"
import { FeelsLike } from "./feels-like"
import { WeatherDescription } from "./weather-description"

export type DailyWeatherDetails = {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: Temperature,
    feels_like: FeelsLike,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: Array<WeatherDescription>,
    clouds: number,
    pop: number,
    uvi: number,
}