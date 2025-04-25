import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(`https://e-commerce-5a5i.onrender.com/api/products`);

        
        const filteredProducts = response.data.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        setSuggestions(filteredProducts.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

 
  const handleSearch = () => {
    if (query.trim() === "") return;

    navigate(`/products?query=${query}`);
    setShowSuggestions(false);
    setQuery(""); // Clear input after search
  };

  
  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <div className="relative p-4">
      <div className="flex items-center max-w-screen justify-between gap-3">
        <input
          type="text"
          placeholder="Search for products..."
          className="border p-2 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-[80vw] bg-white border rounded-md mt-1 shadow-md max-h-48 overflow-auto z-10">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="p-2 border-b bg-slate-100 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectSuggestion(product)}
            >
              {product.name} -{" "}
              <span className="text-gray-600">{product.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
