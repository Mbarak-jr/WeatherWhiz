import WeatherIcon from './WeatherIcon';

export default function WeatherCard({ weather }) {
  if (!weather) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full text-center border border-white/20">
        <div className="flex flex-col items-center justify-center space-y-4 h-64">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-indigo-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xl font-medium text-gray-700">No weather data available</p>
          <p className="text-gray-500">Search for a city to see weather information</p>
        </div>
      </div>
    );
  }

  const {
    city = 'Unknown Location',
    temp = '--',
    condition = 'Clear',
    description = 'Weather data not available',
    humidity = '--',
    windSpeed = '--',
    icon = '01d'
  } = weather;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 w-full border border-white/20">
      {/* City and Main Weather */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
          <p className="text-lg text-gray-600 capitalize mt-1">{description}</p>
        </div>
        <WeatherIcon condition={condition} icon={icon} className="h-16 w-16" />
      </div>

      {/* Temperature Display */}
      <div className="flex items-center justify-center py-6">
        <span className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          {temp}°C
        </span>
      </div>

      {/* Weather Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-indigo-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <p className="text-sm font-semibold text-indigo-600">Humidity</p>
          </div>
          <p className="text-2xl font-bold text-indigo-800 mt-2">{humidity}%</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-blue-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
            </svg>
            <p className="text-sm font-semibold text-blue-600">Wind Speed</p>
          </div>
          <p className="text-2xl font-bold text-blue-800 mt-2">{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}