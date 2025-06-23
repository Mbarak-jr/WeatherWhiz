import { createContext, useState, useCallback } from 'react';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Stable reference for addFavorite
  const addFavorite = useCallback((city) => {
    if (city && !favorites.includes(city)) {
      setFavorites(prev => [...prev, city]);
    }
  }, [favorites]);

  // Stable reference for removeFavorite
  const removeFavorite = useCallback((city) => {
    setFavorites(prev => prev.filter(fav => fav !== city));
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        loading,
        setLoading,
        error,
        setError
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}