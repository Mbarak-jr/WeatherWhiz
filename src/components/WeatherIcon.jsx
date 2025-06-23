export default function WeatherIcon({ condition = 'Clear', icon = '01d' }) {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    return (
      <div className="flex flex-col items-center">
        <img 
          src={iconUrl} 
          alt={condition} 
          className="w-16 h-16" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png';
          }}
        />
      </div>
    );
  }