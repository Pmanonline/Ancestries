import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHistoricalPeople } from "../features/historicalFeature/historicalAction";
import HistoricalModal from "../components/tools/HistoricalModal"; // Import the modal component
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { DirectionButton2 } from "../components/d-button";

const HistoricalPeople = () => {
  const backendURL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "https://gekoda-api.onrender.com";
  const dispatch = useDispatch();
  const { historicalPeople, loading, error } = useSelector(
    (state) => state.historicalPeople
  );

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedSector, setSelectedSector] = useState("All");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPeople = Array.isArray(historicalPeople)
    ? historicalPeople
        .filter(
          (person) =>
            (selectedSector === "All" || person.sector === selectedSector) &&
            (searchTerm === "" ||
              person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
          if (sortOption === "name") {
            return (a.name || "").localeCompare(b.name || "");
          } else if (sortOption === "sector") {
            return (a.sector || "").localeCompare(b.sector || "");
          } else if (sortOption === "deseasedTime") {
            if (!a.deseasedTime) return 1;
            if (!b.deseasedTime) return -1;
            return a.deseasedTime.localeCompare(b.deseasedTime);
          }
          return 0;
        })
    : [];

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredPeople.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const totalPages = Math.ceil(filteredPeople.length / resultsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const person = historicalPeople.find((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (person) {
      setSelectedPerson(person);
    } else {
      alert("No matching person found.");
    }
  };

  useEffect(() => {
    dispatch(fetchAllHistoricalPeople());
  }, [dispatch]);

  const truncateText = (html, maxLength = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Handle sector filtering
  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const sectors = [
    "All",
    "Politics",
    "Literature",
    "Women's Rights",
    "Music",
    "Religion",
    "Science",
    "Education",
    "Art",
    "Sports",
    "Activism",
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 font-Montserra">
        Historical People of Nigeria
      </h1>
      <p className="text-lg mb-4">
        Discover the lives and achievements of some of the most influential
        figures in Nigerian history. Learn about their contributions to various
        sectors.
      </p>

      <div className="mb-6 flex space-x-4 my-5">
        {/* Filter by Sector */}
        <div className="w-1/2 flex flex-col">
          <label htmlFor="sector" className="block text-lg font-medium mb-2">
            Filter by Sector
          </label>
          <select
            id="sector"
            value={selectedSector}
            onChange={handleSectorChange}
            className="p-2 border rounded lg:w-1/2" // Adjust width here
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by Option */}
        <div className="w-1/2 flex flex-col items-end">
          <label htmlFor="sort" className="block text-lg font-medium mb-2">
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border rounded lg:w-1/2" // Adjust width here
          >
            <option value="name">Name</option>
            <option value="sector">Sector</option>
            <option value="deseasedTime">Year of Passing</option>
          </select>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-5 pb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a name"
          className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-[26rem] focus:outline-none focus:ring-2 focus:ring-green text-black bg-NavClr rounded-xl rounded-bl-xl"
        />
        <button
          onClick={handleSearch}
          className="text-white flex items-center justify-center bg-green-500 px-4 py-2 bg-green hover:bg-green-600 rounded-xl rounded-br-xl  sm:w-auto"
        >
          <span className="mr-2">Search</span>
          <DirectionButton2 className="ml-2" />
        </button>
      </div>
      {/* search */}

      {/* Historical People Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentResults.map((person) => (
          <div
            key={person._id} // use _id instead of id since MongoDB uses _id
            className="bg-white shadow-md rounded-lg p-3 w-full max-w-sm flex flex-col items-start"
          >
            {/* Rounded Image */}
            <div className="mb-4">
              <img
                className="rounded-full w-24 h-24 object-cover"
                src={`${backendURL}/insertImage/${person.image}`}
                alt={person.name}
              />
            </div>
            <div className="flex justify-between w-full mb-2">
              <h2 className="text-2xl font-semibold">{person.name}</h2>
              <h3 className="text-sm font-normal mt-3">
                {person.deseasedTime}
              </h3>
            </div>
            <p className="text-sm mb-2">
              <strong>Sector:</strong> {person.sector}
            </p>
            <p className="text-sm mb-2">
              <strong>Biography:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: truncateText(person?.biography, 150),
                }}
              />
            </p>
            <p className="text-sm mb-4">
              <strong>Achievements:</strong>{" "}
              {truncateText(person.achievements[0]?.writeUp)}
            </p>
            <button
              className="bg-green text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedPerson(person)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`mt-4 border-gray-800 border text-gray-800 py-1 px-4 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105 ${
            currentPage === 1 && "text-gray-100"
          } `}
        >
          <GrChapterPrevious size={24} />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`mt-4 border-gray-800 border text-gray-800 py-1 px-4 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105 ${
            currentPage === totalPages && "text-gray-100"
          } `}
        >
          <GrChapterNext size={24} />
        </button>
      </div>

      {/* Modal for showing detailed information */}
      {selectedPerson && (
        <HistoricalModal
          open={Boolean(selectedPerson)}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson}
        />
      )}
    </div>
  );
};

export default HistoricalPeople;
