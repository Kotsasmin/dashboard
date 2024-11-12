import React, { useState } from 'react';

const SearchCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`, '_blank');
  };

  return (
    <div className="bg-black glassmorphism p-4 sm:p-6 ">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Search Google</h2>
      <form onSubmit={handleSearch} className="flex flex-col space-y-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg focus:outline-none border border-gray-300 bg-white bg-opacity-20 text-white"
          placeholder="Search Google..."
        />
        <button
          type="submit"
          className="glassmorphism-button text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchCard;
