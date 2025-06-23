import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { weather, getWeather, loading, error, addFavorite } = useWeather();

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    await getWeather(city);
  };

  const handleAddFavorite = (city) => {
    addFavorite(city);
    toast.success(`${city} added to favorites!`, {
      position: "top-center",
      duration: 2000,
      style: {
        background: 'linear-gradient(to right, #7c3aed, #ec4899)',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '12px',
        padding: '16px 24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#7c3aed',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Toaster />
      
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Weather Forecast
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Get accurate weather information for any location around the world
          </p>
        </div>
        
        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-8 border border-white/20">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-xl font-medium text-gray-700">Fetching weather data...</p>
            <p className="text-gray-500 mt-2">This won't take long</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-lg mb-8">
            <div className="flex items-start">
              <svg className="w-8 h-8 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-lg">Oops! Something went wrong</h3>
                <p className="mt-1">{error}</p>
                <button 
                  onClick={() => handleSearch(weather?.city || '')}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Weather Content */}
        {!loading && !error && (
          <div className="space-y-8">
            <WeatherCard weather={weather} />
            
            {weather?.city && (
              <button
                onClick={() => handleAddFavorite(weather.city)}
                className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 group"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className="text-lg">Add to Favorites</span>
                </div>
              </button>
            )}
          </div>
        )}
        
        {/* Attribution */}
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Data provided by <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">OpenWeatherMap</a></p>
          <p className="mt-1">© {new Date().getFullYear()} Weather App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}