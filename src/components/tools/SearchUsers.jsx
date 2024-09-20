import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../features/UserFeature/UserAction";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { DirectionButton2 } from "../../components/d-button";
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";
import { RiFilter2Line } from "react-icons/ri";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import NoResult from "../../assets/images/noResult.png";
import Search from "../../assets/images/Search.gif";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://your-backend-url";

export default function SearchUsers() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [placesLived, setPlacesLived] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMore, setviewMore] = useState(false);
  const [category, setCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  const toggleViewMore = () => {
    setviewMore(!viewMore);
  };

  const resultsPerPage = 9;

  const {
    users = [], // Updated to default to an empty array
    loading,
    error,
  } = useSelector((state) => state.userSearch);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = users.length
    ? users.slice(indexOfFirstResult, indexOfLastResult)
    : [];
  console.log("Current Results:", currentResults);

  const totalPages = Math.ceil(users.length / resultsPerPage);

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

  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleView = () => setViewMore(!viewMore);
  const toggleCategory = () => setCategory(!category);
  const closeModal = () => {
    setModalType(null); // Reset modalType to close any open modals
  };

  useEffect(() => {
    let spinnerTimer;

    if (loading) {
      setShowOverlay(true);
      spinnerTimer = setTimeout(() => {
        setSpinnerVisible(true);
      }, 1000);
    } else {
      setSpinnerVisible(false);
      setShowOverlay(false);
      clearTimeout(spinnerTimer);
    }

    return () => clearTimeout(spinnerTimer);
  }, [loading]);

  useEffect(() => {
    if (loading && submitted) {
      setSpinnerVisible(true);
      setModalType(null); // Hide modals while loading
    } else if (!loading && submitted) {
      setSpinnerVisible(false);
      if (users.length > 0) {
        setModalType("results");
        setFirstName("");
        setLastName("");
        setPlacesLived("");
        setDob("");
      } else {
        setModalType("noResults");
      }
    }
  }, [loading, submitted, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() || lastName.trim() || placesLived.trim() || dob) {
      const searchParams = {
        firstName,
        lastName,
        placesLived,
        dob,
      };

      dispatch(fetchUsers(searchParams));
      console.log("Submitted Search with:", searchParams); // Log the search params
      setSubmitted(true);
      // Add to recent searches
      addRecentSearch(`${firstName} ${lastName}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") setFirstName(value);
    if (name === "lastName") setLastName(value);
    if (name === "placesLived") setPlacesLived(value);
    if (name === "dob") setDob(value);
    setSubmitted(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleResultClick = (userId) => {
    navigate(`/FamilyTree-feeds/${userId}`);
  };

  const hasResults = users.length > 0;
  const noResults = submitted && !hasResults;

  useEffect(() => {
    if (submitted) {
      if (hasResults) {
        setModalType("results");
      } else if (noResults) {
        setModalType("noResults");
      }
    }
  }, [hasResults, noResults, submitted]);

  useEffect(() => {
    console.log("Fetched Users:", users);
  }, [users]);

  const addRecentSearch = (search) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [search, ...prevSearches].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  return (
    <section className="my-[3rem]">
      <div className="">
        <div className="">
          <div className="flex justify-center my-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center w-full sm:w-auto"
            >
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Customize your search more"
                value={firstName}
                onChange={handleChange}
                className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-[26rem] focus:outline-none focus:ring-2 focus:ring-green text-black bg-NavClr rounded-xl rounded-bl-xl"
              />
              <button className="text-white flex items-center justify-center bg-green-500 px-4 py-2 bg-green hover:bg-green-600 rounded-xl rounded-br-xl  sm:w-auto">
                <span className="mr-2">Search</span>
                <DirectionButton2 className="ml-2" />
              </button>
            </form>
          </div>
        </div>

        {/*  */}

        {!spinnerVisible && modalType === "results" && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-full max-h-full overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg text-center mb-3 font-bold">
                Search Results
              </h2>
              <div className="flex justify-end mr-2">
                <button
                  onClick={closeModal}
                  className="mt-4 border-red-500 border text-red-500 py-1 px-4 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105"
                >
                  <IoMdClose size={24} />
                </button>
              </div>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentResults.map((result) => (
                  <li
                    key={result._id}
                    className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700 flex flex-col"
                    style={{ flex: "1 1 30%" }}
                  >
                    <a href="#">
                      <img
                        className="rounded-t-lg w-full h-[10rem] object-cover rounded-xl mb-4"
                        src={`${backendURL}/${result.image}`}
                        alt="images"
                      />
                    </a>
                    <div className="p-3 flex flex-col space-y-2">
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Full name:
                        <span className="text-white ml-2">
                          {result.firstName} {result.lastName}
                        </span>
                      </p>
                      {result.gender && (
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          Gender:
                          <span className="text-white ml-2">
                            {result.gender}
                          </span>
                        </p>
                      )}
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Date of Birth:
                        <span className="text-white ml-2">
                          {new Date(result.DOB).toLocaleDateString()}
                        </span>
                      </p>

                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {result.role === "main" ? (
                          <span className="text-white ">
                            Family Tree Creator
                          </span>
                        ) : (
                          <span className="text-white ">{result.role}</span>
                        )}
                      </p>

                      {result.Lstatus === "Deceased" && (
                        <span className="text-white">
                          <span className="block mb-2">{result.Lstatus}</span>
                          {new Date(result.DOB).getFullYear()} to{" "}
                          {result.yearDeceased
                            ? new Date(result.yearDeceased).getFullYear()
                            : "Unknown year"}
                        </span>
                      )}

                      {result.role !== "main" && (
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          <span className="italic">Related to:</span>
                          <span className="text-white ml-2">
                            {result.userName}
                          </span>
                        </p>
                      )}

                      <a
                        onClick={() => handleResultClick(result.userId)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white border-2 border-green  bg-green rounded-lg focus:ring-4 focus:outline-none cursor-pointer transition ease-in-out duration-200 transform hover:scale-105"
                      >
                        Go to
                        {result.role !== "main" ? (
                          <>
                            <span className="font-medium mx-1">
                              {result.userName}
                            </span>
                            's Profile
                          </>
                        ) : (
                          " Profile"
                        )}
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="mt-4 border-gray-800 border text-gray-800 py-1 px-4 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105"
                >
                  <GrChapterPrevious size={24} />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="mt-4 border-gray-800 border text-gray-800 py-1 px-4 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105"
                >
                  <GrChapterNext size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Results and No Results Modals ends*/}
        {!spinnerVisible && modalType === "noResults" && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-3 mx-3"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up to parent
            >
              <h2 className="text-lg font-bold">No Results Found</h2>
              <img
                src={NoResult}
                alt="No Results"
                className="w-24 mx-auto my-4"
              />
              <p className="text-center">
                No results found for "{firstName}
                {lastName} {placesLived}". Please try again with a different
                name or criteria.
              </p>
              <button
                onClick={closeModal}
                className="mt-4 border-red-500 border text-red-500 py-2 px-3 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105"
              >
                <IoMdClose size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Spinner */}
        {spinnerVisible && showOverlay && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <img
              src={Search}
              alt="Searching..."
              className="w-32 h-32 relative z-20"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  // Clear a recent search item
  const removeRecentSearch = (searchToRemove) => {
    const updatedSearches = recentSearches.filter(
      (search) => search !== searchToRemove
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Use effect to listen for updates in recentSearches and sync with localStorage
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4 text-start">Recently Searched</h2>
      {recentSearches.length > 0 ? (
        <ul className="list-none space-y-1">
          {recentSearches.slice(0, 3).map((search, index) => (
            <li key={index} className="mx-2 p-2 rounded-lg">
              {search}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No recent searches found.</p>
      )}
    </div>
  );
}
