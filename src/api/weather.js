/**
 * Weather API Service for OpenWeatherMap
 * Documentation: https://openweathermap.org/current
 */

// ✅ Use environment variable for API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a city
 * @param {string} city - City name to search for
 * @returns {Promise<Object>} - Formatted weather data
 */
export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return transformWeatherData(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    throw new Error(
      error.message === 'city not found' 
        ? 'City not found. Please try another location.'
        : 'Failed to fetch weather data. Please try again later.'
    );
  }
}

/**
 * Transforms raw API response into a usable format
 * @param {Object} data - Raw API response from OpenWeather
 * @returns {Object} - Transformed data
 */
function transformWeatherData(data) {
  return {
    city: data.name,
    country: data.sys?.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    windDeg: data.wind.deg,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // meters to km
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
    coord: data.coord,
    timestamp: data.dt
  };
}

/**
 * Fetches 5-day weather forecast data by coordinates
 * @param {Object} coord - { lat, lon }
 * @returns {Promise<Array>} - List of forecast entries
 */
export async function fetchForecast(coord) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Forecast request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.list.map(item => ({
      date: item.dt_txt,
      temp: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
      windSpeed: Math.round(item.wind.speed * 3.6),
      humidity: item.main.humidity
    }));
  } catch (error) {
    console.error('Forecast API Error:', error);
    throw new Error('Failed to load forecast data.');
  }
}
