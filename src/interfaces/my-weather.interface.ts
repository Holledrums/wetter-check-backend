export interface HourlyForecastInterface {
  time: string; // ISO 8601 format, e.g., "2023-10-01T12:00:00Z"
  temperature: string; // e.g., 15.5 for 15.5°C
  windspeed: string; // e.g., 10.2 for 10.2 km/h
  winddirection: string; // e.g., 180 for south
  isDay: number; // "1" for day, "0" for night
  weatherDescription: string; // WMO code, e.g., "800" for clear sky
  precipitation: string; // e.g., "0.0" for no precipitation
}
export interface MyWeatherInterface {
  city: string; // e.g., "Berlin"
  forecast: HourlyForecastInterface[]; // Array of hourly forecasts
}
