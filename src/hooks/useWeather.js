import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { fetchWeather } from '../api/weather';

export function useWeather() {
  const context = useContext(WeatherContext);
  
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }

  const { 
    weather, 
    setWeather,
    favorites,
    addFavorite,
    removeFavorite,
    loading,
    setLoading,
    error,
    setError
  } = context;

  const getWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
      return weatherData;
    } catch (err) {
      setError(err.message);
      setWeather(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    weather,
    getWeather,
    favorites,
    addFavorite,
    removeFavorite,
    loading,
    error
  };
}