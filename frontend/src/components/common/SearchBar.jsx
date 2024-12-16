import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const userInput = event.target.value;
    setQuery(userInput);

    if (userInput.length > 2) {
      try {
        const response = await axios.get(
          `https://autocomplete.search.hereapi.com/v1/autocomplete`,
          {
            params: {
              q: userInput,
              apiKey: 'YOUR_API_KEY',
            },
          }
        );
        setSuggestions(response.data.items);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setSuggestions([]);

    // Pass the selected destination's position to the parent
    if (onSelect) {
      onSelect(suggestion.position);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for an address..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          color: 'var(--text-color)',
          backgroundColor: 'var(--secondary-color)',
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid #cccc',
              backgroundColor: 'var(--secondary-color)',
              color: 'var(--text-color)',
            }}
          >
            {suggestion.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
