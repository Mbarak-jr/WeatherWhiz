import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center shadow-lg rounded-xl overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-5 py-3 pr-16 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          aria-label="Search for a city"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className={`absolute right-0 h-full px-4 flex items-center justify-center ${
            query.trim() 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-all duration-300`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      {query.trim() && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Press Enter or click the search icon
        </p>
      )}
    </form>
  );
}