import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStateDetails } from "../features/Statefeature/stateAction";
import Spinner from "../components/tools/Spinner";
import { DirectionButton2 } from "../components/d-button";
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

function Genealogy() {
  const { stateName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allStates, specificState, religions, error } = useSelector(
    (state) => state.state
  );
  console.log(religions);
  console.log(allStates);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState(stateName || "");
  const [selectedLocalGovernment, setSelectedLocalGovernment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    if (
      specificState?.localGovernments &&
      specificState.localGovernments.length > 0
    ) {
      setSelectedLocalGovernment(specificState.localGovernments[0]);
    }
  }, [specificState?.localGovernments]);

  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    const selectedArea = specificState.localGovernments.find(
      (area) => area.name === selectedName
    );
    setSelectedLocalGovernment(selectedArea);
  };

  useEffect(() => {
    dispatch(fetchStateDetails()) // Fetch all states
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      dispatch(fetchStateDetails(selectedState))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, selectedState]);

  useEffect(() => {
    if (stateName !== selectedState) {
      setSelectedState(stateName || "");
    }
  }, [stateName]);

  useEffect(() => {
    if (selectedState) {
      navigate(
        `/genealogy/${encodeURIComponent(selectedState.replace(/ /g, "-"))}`
      );
    }
  }, [selectedState, navigate]);

  useEffect(() => {
    if (!stateName) {
      navigate(`/genealogy/Abia State`);
    }
  }, [stateName, navigate]);

  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSearch = () => {
    const stateFound = filteredStates.length > 0 ? filteredStates[0] : null;
    if (stateFound) {
      setSelectedState(stateFound.name);
      setSearchTerm(""); // Clear search input
    } else {
      alert("State not found");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = allStates.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates(allStates);
    }
  }, [searchTerm, allStates]);
  const handleScroll = () => {
    const element = document.getElementById("localGovernment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading)
    return (
      <>
        <Spinner />
      </>
    );
  if (error) return <p>Error: {error}</p>;
  if (!specificState) return <p>No details available for {selectedState}</p>;
  return (
    <>
      <div className="flex justify-start">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a state"
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

      <div className="h-8 bg-green text-center   align-middle items-center flex justify-center my-8 !px-0">
        <select
          id="state-dropdown"
          value={selectedState}
          onChange={handleChange}
          className=" text-black bg-green rounded cursor-pointer px-4 focus:outline-none   "
        >
          <option value="" disabled>
            Select a state...
          </option>
          {allStates && allStates.length > 0 ? (
            allStates.map((state) => (
              <option
                key={state.name}
                value={state.name}
                className="py-5 bg-white my-5 gap-5"
              >
                {state.name}
              </option>
            ))
          ) : (
            <option value="">No states available</option>
          )}
        </select>
      </div>

      <section className="px-5">
        <div class="lg:grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Text section */}
          <div class="col-span-3 flex flex-col justify-start space-y-4">
            <div>
              <span>Language:</span>
              <span className="font-medium"> {specificState.language}</span>
            </div>
            <div>
              <span>Location:</span>
              <span className="font-medium">{specificState.location}</span>
            </div>
            <div>
              <span>Tribe:</span>
              <span className="font-medium"> {specificState.tribe}</span>
            </div>
            {/* know more about localGovernments and citiess */}
            <span
              onClick={handleScroll}
              className="font-medium underline cursor-pointer transition ease-in-out duration-200 transform hover:scale-105"
            >
              Know more on localGovernments and Cities in {specificState.name}?
            </span>

            {/* Origin */}
            <div className="mt-5">
              <h3 className="text-black text-sm font-bold uppercase text-start mb-4">
                Origin of {specificState.name}
              </h3>
              <div className="">
                <p
                  dangerouslySetInnerHTML={{ __html: specificState?.origin }}
                  className="text-black text-sm font-normal"
                ></p>
              </div>
            </div>
          </div>

          {/* Image section */}
          <div class="col-span-2 flex items-start lg:items-end justify-center">
            <img
              className="rounded-md Nlg:hidden w-[40rem] "
              src={`${backendURL}/insertImage/${specificState?.image}`}
              alt={specificState?.name}
            />
          </div>
        </div>
        <h3 className="text-black  text-sm font-bold uppercase  text-start mb-4 mt-12">
          History of {specificState.name}
        </h3>

        {Array.isArray(specificState.history) &&
        specificState.history.length > 0 ? (
          specificState.history.map((history, index) => (
            <div key={index} className="mb-6">
              <div className="">
                <p
                  dangerouslySetInnerHTML={{ __html: history?.writeUp }}
                  className="text-black text-sm font-normal mb-3"
                ></p>
              </div>

              <ol className=" list-decimal ml-6 text-black text-sm font-normal">
                {Array.isArray(history.list) &&
                  history.list.map((item, idx) => (
                    <li
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                      key={idx}
                      className="mb-3"
                    ></li>
                  ))}
              </ol>
            </div>
          ))
        ) : (
          <p className="text-black text-sm font-normal">
            No History information available.
          </p>
        )}

        {/* Next */}

        <div>
          <h3 className="text-black  text-sm font-bold uppercase  text-start mb-4 mt-12">
            Culture of {specificState.name}
          </h3>

          {Array.isArray(specificState.cultures) &&
          specificState.cultures.length > 0 ? (
            specificState.cultures.map((culture, index) => (
              <div key={index} className="mb-6">
                <div className="">
                  <p
                    dangerouslySetInnerHTML={{ __html: culture?.writeUp }}
                    className="text-black text-sm font-normal"
                  ></p>
                </div>

                <ol className=" list-decimal ml-6 text-black text-sm font-normal">
                  {Array.isArray(culture.list) &&
                    culture.list.map((item, idx) => (
                      <li
                        dangerouslySetInnerHTML={{
                          __html: item,
                        }}
                        key={idx}
                        className="mb-3"
                      ></li>
                    ))}
                </ol>
              </div>
            ))
          ) : (
            <p className="text-black text-sm font-normal">
              No cultural information available.
            </p>
          )}
        </div>

        {/* Image */}
        <div className="h-[13rem] my-5 bg-gray-300"></div>
        {/* Image */}

        {/* KINGSHIP IN ABIA STATE */}
        <div className="tex-sm">
          <div className="">
            {/* Other content */}
            <div className="mt-10">
              <h3 className="text-black  text-sm font-bold uppercase  text-start mb-4 mt-12">
                Kingship in {specificState.name}
              </h3>

              {Array.isArray(specificState.kingship) &&
              specificState.kingship.length > 0 ? (
                specificState.kingship.map((kingship, index) => (
                  <div key={index} className="mb-6">
                    <div className="">
                      <p
                        dangerouslySetInnerHTML={{ __html: kingship?.writeUp }}
                        className="text-black text-sm font-normal mb-3"
                      ></p>
                    </div>
                    <ol className=" list-decimal ml-6 text-black text-sm font-normal">
                      {Array.isArray(kingship.list) &&
                        kingship.list.map((item, idx) => (
                          <li
                            dangerouslySetInnerHTML={{
                              __html: item,
                            }}
                            key={idx}
                            className="mb-3"
                          >
                            {/* {item} */}
                          </li>
                        ))}
                    </ol>
                  </div>
                ))
              ) : (
                <p className="text-black text-sm font-normal">
                  No kingship information available.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="h-[13rem] my-5 bg-gray-300"></div>
        {/* Image */}
        <h3 className="text-black  text-sm font-medium uppercase  text-start mb-3 mt-3">
          Indigenous foods in {specificState.name}
        </h3>
        {Array.isArray(specificState.foods) &&
        specificState.foods.length > 0 ? (
          specificState.foods.map((food, index) => (
            <div key={index} className="mb-6">
              <div className="">
                <p className="text-black text-sm font-normal mb-3">
                  {food.writeUp}
                </p>
              </div>
              <ol className=" list-decimal ml-6 text-black text-sm font-normal">
                {Array.isArray(food.list) &&
                  food.list.map((item, idx) => (
                    <li
                      dangerouslySetInnerHTML={{
                        __html: item,
                      }}
                      key={idx}
                      className="mb-3"
                    ></li>
                  ))}
              </ol>
            </div>
          ))
        ) : (
          <p className="text-black text-sm font-normal">
            No food information available.
          </p>
        )}

        {/* LOCAL GOVERNMENTS */}
        <div id="localGovernment" class="lg:grid grid-cols-10 gap-4">
          <div className="col-span-4">
            <h3 className="text-black text-sm font-medium uppercase text-start mb-3 mt-3">
              Local government/ cities in {specificState.name}
            </h3>
            <ol className="list-decimal ml-6 text-black text-sm font-normal">
              {specificState.localGovernmentsList.map((area, index) => (
                <li key={index} className="mb-2">
                  <div className="font-bold">{area}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className=" col-span-6 flex justify-center align-middle items-center">
            <img
              className="rounded-md Nlg:hidden w-[40rem] "
              src={`${backendURL}/insertImage/${specificState?.image}`}
              alt={specificState?.name}
            />
          </div>
        </div>
        {/* LOCAL GOVERNMENTS */}
        {/* LIST AND DETAILS OF LGA */}
        <div className="my-8">
          <label
            htmlFor="state-dropdown"
            className="block mb-2 text-lg font-medium text-black"
          >
            Select Local Government:
          </label>
          <select
            id="state-dropdown"
            value={selectedLocalGovernment ? selectedLocalGovernment.name : ""}
            onChange={handleSelectChange}
            className="bg-green text-white rounded py-2 px-3 focus:outline-none"
          >
            {Array.isArray(specificState.localGovernments) &&
              specificState.localGovernments.map((area) => (
                <option
                  key={area._id}
                  value={area.name}
                  style={{
                    padding: "16px 16px",
                    color: "black",
                    margin: "15px",
                  }}
                >
                  {area.name}
                </option>
              ))}
          </select>
        </div>
        <div className="my-8">
          {selectedLocalGovernment ? (
            <>
              <h3 className="text-black  text-sm font-medium uppercase  text-start mb-4 mt-12 underline">
                {selectedLocalGovernment.name}
              </h3>

              {Array.isArray(selectedLocalGovernment?.origin) &&
                selectedLocalGovernment.origin.length > 0 && (
                  <>
                    <h3 className="text-black text-sm font-semibold uppercase mt-3 text-start mb-1">
                      ORIGIN OF {selectedLocalGovernment.name}
                    </h3>
                    {selectedLocalGovernment.origin.map((origin, index) => (
                      <div key={index} className="mb-6">
                        <div className="">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: origin?.writeUp,
                            }}
                            className="text-black text-sm font-normal mb-3"
                          ></p>
                        </div>
                        {Array.isArray(origin.list) &&
                          origin.list.length > 0 && (
                            <ol className="list-decimal ml-6 text-black text-sm font-normal">
                              {origin.list.map((item, idx) => (
                                <li
                                  dangerouslySetInnerHTML={{
                                    __html: item,
                                  }}
                                  key={idx}
                                  className="mb-3"
                                ></li>
                              ))}
                            </ol>
                          )}
                      </div>
                    ))}
                  </>
                )}

              {/* HISTORY`` */}

              {Array.isArray(selectedLocalGovernment?.history) &&
                selectedLocalGovernment.history.length > 0 && (
                  <>
                    <h3 className="text-black text-sm font-semibold uppercase mt-3 text-start mb-1">
                      History of {selectedLocalGovernment.name}
                    </h3>
                    {selectedLocalGovernment.history.map((history, index) => (
                      <div key={index} className="mb-6">
                        <div className="">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: history?.writeUp,
                            }}
                            className="text-black text-sm font-normal mb-3"
                          ></p>
                        </div>
                        {Array.isArray(history.list) &&
                          history.list.length > 0 && (
                            <ol className="list-decimal ml-6 text-black text-sm font-normal">
                              {history.list.map((item, idx) => (
                                <li
                                  dangerouslySetInnerHTML={{
                                    __html: item,
                                  }}
                                  key={idx}
                                  className="mb-3"
                                ></li>
                              ))}
                            </ol>
                          )}
                      </div>
                    ))}
                  </>
                )}

              {/* CULTURES AND TRADITION */}
              {Array.isArray(selectedLocalGovernment?.cultureTradition) &&
                selectedLocalGovernment.cultureTradition.length > 0 && (
                  <>
                    <h3 className="text-black text-sm font-semibold uppercase mt-3 text-start mb-1">
                      CULTURES AND TRADITION OF {selectedLocalGovernment.name}
                    </h3>
                    {selectedLocalGovernment.cultureTradition.map(
                      (culture, index) => (
                        <div key={index} className="mb-6">
                          <div className="">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: culture?.writeUp,
                              }}
                              className="text-black text-sm font-normal mb-3"
                            ></p>
                          </div>
                          {Array.isArray(culture.list) &&
                            culture.list.length > 0 && (
                              <ol className="list-decimal ml-6 text-black text-sm font-normal">
                                {culture.list.map((item, idx) => (
                                  <li
                                    dangerouslySetInnerHTML={{
                                      __html: item,
                                    }}
                                    key={idx}
                                    className="mb-3"
                                  ></li>
                                ))}
                              </ol>
                            )}
                        </div>
                      )
                    )}
                  </>
                )}

              {/* KINGSHIP AND TRADITION */}
              {Array.isArray(selectedLocalGovernment?.kingship) &&
                selectedLocalGovernment.kingship.length > 0 && (
                  <>
                    <h3 className="text-black text-sm font-semibold uppercase mt-3 text-start mb-1">
                      KINGSHIP IN {selectedLocalGovernment.name}
                    </h3>
                    {selectedLocalGovernment.kingship.map((kingship, index) => (
                      <div key={index} className="mb-6">
                        <div className="">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: kingship.writeUp,
                            }}
                            className="text-black text-sm font-normal mb-3"
                          ></p>
                        </div>
                        {Array.isArray(kingship.list) &&
                          kingship.list.length > 0 && (
                            <ol className="list-decimal ml-6 text-black text-sm font-normal">
                              {kingship.list.map((item, idx) => (
                                <li
                                  dangerouslySetInnerHTML={{
                                    __html: item,
                                  }}
                                  key={idx}
                                  className="mb-3"
                                ></li>
                              ))}
                            </ol>
                          )}
                      </div>
                    ))}
                  </>
                )}
            </>
          ) : (
            <p>No local government selected.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Genealogy;
