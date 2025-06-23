import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import WeatherIcon from '../components/WeatherIcon';

export default function Favorites() {
  const { favorites, removeFavorite, getWeather } = useWeather();
  const [viewedCity, setViewedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleView = async (city) => {
    setIsLoading(true);
    try {
      const weatherData = await getWeather(city);
      setViewedCity(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Favorite Cities
          </h1>
          <p className="mt-2 text-gray-600">
            Your saved locations for quick access
          </p>
        </div>
        
        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20">
            <div className="flex flex-col items-center justify-center space-y-4 h-64">
              <svg 
                className="w-16 h-16 text-indigo-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700">No favorites yet</h3>
              <p className="text-gray-500 max-w-xs">
                Search for cities and click the heart icon to save them here
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Favorites List */}
            <ul className="space-y-4">
              {favorites.map((city) => (
                <li 
                  key={city} 
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-800 truncate max-w-[180px]">
                      {city}
                    </span>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleView(city)}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center shadow-md hover:shadow-lg disabled:opacity-70"
                      >
                        {isLoading && viewedCity?.city === city ? (
                          <svg className="animate-spin -ml-1 mr-1.5 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => removeFavorite(city)}
                        className="bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 text-red-600 px-4 py-2 rounded-lg font-medium transition-all flex items-center shadow-sm hover:shadow-md border border-red-200"
                      >
                        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Weather Details Modal */}
            {viewedCity && (
              <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{viewedCity.city}</h2>
                  <button 
                    onClick={() => setViewedCity(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center justify-center py-4">
                  <div className="text-center">
                    <WeatherIcon 
                      condition={viewedCity.condition} 
                      icon={viewedCity.icon} 
                      className="w-24 h-24 mx-auto"
                    />
                    <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                      {viewedCity.temp}°C
                    </div>
                    <p className="text-lg text-gray-600 capitalize mt-2">
                      {viewedCity.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-indigo-50/80 p-4 rounded-xl border border-indigo-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <span className="font-medium text-indigo-600">Humidity</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-800 mt-2">
                      {viewedCity.humidity}%
                    </div>
                  </div>

                  <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                      </svg>
                      <span className="font-medium text-blue-600">Wind</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800 mt-2">
                      {viewedCity.windSpeed} km/h
                    </div>
                  </div>

                  {viewedCity.feelsLike && (
                    <div className="bg-purple-50/80 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-purple-600">Feels Like</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-800 mt-2">
                        {viewedCity.feelsLike}°C
                      </div>
                    </div>
                  )}

                  {viewedCity.pressure && (
                    <div className="bg-pink-50/80 p-4 rounded-xl border border-pink-100">
                      <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 9v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9m14 0V7a2 2 0 00-2-2H8a2 2 0 00-2 2v2m14 0h-4M6 9h4m0 0V7a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                        <span className="font-medium text-pink-600">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold text-pink-800 mt-2">
                        {viewedCity.pressure} hPa
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Counter */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-white/20">
            <span className="text-indigo-600 font-medium">
              {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'}
            </span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600 text-sm">
              {favorites.length === 0 ? 'Add some cities!' : 'Tap to view weather'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}