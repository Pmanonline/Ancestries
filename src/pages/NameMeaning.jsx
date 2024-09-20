import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DirectionButton1 } from "../components/d-button";
import {
  NameMeaningCard1,
  NameMeaningCard2,
} from "../components/Cards/NameMeaningCards";
import { useNavigate } from "react-router-dom";
import NoResult from "../assets/images/noResult.png";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

export default function NameMeaning() {
  const [surname, setSurname] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (surname.trim()) {
      setIsSearching(true);
      try {
        const response = await fetch(
          `${backendURL}/api/searchUser?query=${surname}`
        );
        const data = await response.json();
        setSearchResults(data.names);
        setNoResults(data.names.length === 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setIsSearching(false);
    }
  };

  const handleChange = async (e) => {
    const newValue = e.target.value;
    setSurname(newValue);

    if (newValue.trim()) {
      try {
        const response = await fetch(
          `${backendURL}/api/searchUser?query=${newValue}`
        );
        const data = await response.json();
        setSearchResults(data.names);
        setNoResults(data.names.length === 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleResultClick = (name) => {
    navigate(`/names/${name}`);
  };

  useEffect(() => {
    if (isSearching) {
      // No need for additional fetch here; handled in handleSubmit.
      return;
    }

    const fetchData = async () => {
      if (surname.trim()) {
        const response = await fetch(
          `${backendURL}/api/searchUser?query=${surname}`
        );
        const data = await response.json();
        setSearchResults(data.names);
        setNoResults(data.names.length === 0);
      }
    };

    // Delay the fetch by 500ms to prevent too many requests
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [surname, isSearching]);
  const handleAlphabetSearch = async (letter) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `${backendURL}/api/searchUser?query=${letter}`
      );
      const data = await response.json();
      setSearchResults(data.names);
      setNoResults(data.names.length === 0);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setIsSearching(false);
  };
  return (
    <section className="my-[3rem]">
      <div className="text-center">
        <h1 className="text-3xl mod:text-lg font-bold mb-6 font-Montserrat text-center">
          Discover the meaning and history behind <br /> your last name
        </h1>
        <p className="text-lg mb-4 mod:text-sm text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, Lorem ipsum dolor
        </p>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            placeholder="Enter your surname or the preferred surname"
            value={surname}
            onChange={handleChange}
            className="px-6 sm:w-[26rem] py-2 focus:outline-none focus:ring-1 focus:ring-green text-black bg-NavClr rounded-tl-xl rounded-bl-xl"
            aria-label="Surname input"
          />
          <button
            type="submit"
            className="focus:ring-1 focus:ring-green bg-NavClr px-4 py-2 hover:bg-green-600 rounded-tr-xl rounded-br-xl"
          >
            <DirectionButton1 />
          </button>
        </form>
      </div>

      {isSearching ? (
        <div className="text-center mt-4">
          <p className="text-lg font-semibold mb-2">Searching...</p>
        </div>
      ) : noResults && surname.trim() ? (
        <div className="text-center mt-4">
          <div className="flex flex-col items-center">
            <img src={NoResult} alt="No Results" className="w-24 h-24 mb-4" />
            <p className="text-lg font-semibold mb-2">No results found</p>
            <p className="text-gray-500">
              Try a different search term or check the spelling.
            </p>
          </div>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="text-center mt-4">
            <p className="text-lg mb-2">Related Searches</p>
            <div className="flex flex-wrap justify-center space-x-2">
              {searchResults.map((result) => (
                <button
                  key={result._id}
                  onClick={() => handleResultClick(result.name)}
                  className="bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded"
                >
                  {result.name}
                </button>
              ))}
            </div>
          </div>
        )
      )}

      <p className="text-center mt-5">Or browse surnames alphabetically:</p>
      <div className="flex justify-center mb-[5rem]">
        <AlphabeticalSearchButton onClick={handleAlphabetSearch} />
      </div>

      <div className="sm:flex justify-around">
        <NameMeaningCard1 />
        <NameMeaningCard2 />
      </div>
      <div className="text-center py-[4rem]">
        <h3 className="text-2xl font-bold mod:text-xl">
          See what interesting facts you’ll learn about your{" "}
          <span className="break-header"></span> surname on Ancestry.
        </h3>
        <p>
          With the world's largest collection of online family history records,
          Ancestry helps you find the details of your family story.
        </p>
      </div>
    </section>
  );
}

const AlphabeticalSearchButton = ({ onClick }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="flex space-x-1">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onClick(letter)}
          className="text-gray-700 hover:text-green hover:font-bold focus:outline-none"
          aria-label={`Search by ${letter.toUpperCase()}`}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

AlphabeticalSearchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
