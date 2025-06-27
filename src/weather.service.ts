import axios, { AxiosResponse } from "axios";
import {
  GeocodeInterface,
  GeocodeResponseInterface,
} from "./interfaces/geocode.interface";
import { MyWeatherInterface } from "./interfaces/my-weather.interface";
import { WeatherDataResponse } from "./interfaces/weather-data-response.interface";
import { weatherMapper } from "./mapper/weather.mapper";

const API_BASE_URL = process.env.WEATHER_API_BASE_URL;

export async function getWeather(
  city?: string
): Promise<MyWeatherInterface | undefined> {
  const targetCity = city || process.env.DEFAULT_CITY || "Berlin";
  const baseUrl = API_BASE_URL || "https://api.open-meteo.com/v1/";

  const geocode = await fetchGeocodingApi(targetCity);

  const { latitude, longitude } = geocode;

  const timeNow = new Date();
  const today = timeNow.toISOString().split("T")[0];
  const tomorrow = new Date(timeNow.getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const params = {
    latitude,
    longitude,
    hourly: [
      "temperature_2m",
      "precipitation",
      "wind_speed_10m",
      "wind_direction_10m",
      "is_day",
      "weathercode",
    ],
    start_date: today,
    end_date: tomorrow,
    timezone: "auto",
  };

  try {
    const forecastResponse: AxiosResponse<WeatherDataResponse> =
      await axios.get(`${baseUrl}/forecast`, {
        params,
      });

    return weatherMapper(forecastResponse.data, geocode);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function fetchGeocodingApi(city: string): Promise<GeocodeInterface> {
  try {
    const response = await axios.get<GeocodeResponseInterface>(
      `https://geocoding-api.open-meteo.com/v1/search`,
      { params: { name: city, countryCode: "DE", count: 1 } }
    );

    const geocode = response.data.results.find(
      (g) => g.name.toLowerCase() === city.toLowerCase()
    );

    if (!geocode) {
      throw new Error(`Kein Geocode für "${city}" gefunden.`);
    }

    return geocode;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Fehler bei der Geocoding-Abfrage: ${error.message}`);
    } else {
      throw new Error(`Fehler bei der Geocoding-Abfrage: ${String(error)}`);
    }
  }
}
