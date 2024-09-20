import React, { useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "../../../src/App.css";

const HistoricalModal = ({ open, onClose, person }) => {
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null; // Return null if modal is not open

  const backendURL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8080"
      : "https://gekoda-api.onrender.com";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mod:mx-3 px-3 ">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full h-screen  max-w-5xl p-6  overflow-y-auto"
      >
        {/* Modal Header */}
        <div className=" flex justify-between items-center border-b pb-3">
          <h2 className="text-lg mod:text-sm font-bold  font-Montserrat">
            Know more about great people and the wave they made in Nigeria
          </h2>
          <button
            onClick={onClose}
            className="mt-4 border-red-500 border text-red-500 py-2 px-3 rounded-lg  transition ease-in-out duration-200 transform hover:scale-105"
          >
            <IoMdClose size={16} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="">
          {/* Rounded Image */}

          {/* <div className="flex flex-col md:flex-row  justify-center mb-6">
         
            <div className="w-full md:w-1/2 p-4 h-[10rem]">
              <img
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                src={`${backendURL}/insertImage/${person?.image}`}
                alt={person?.name}
              />
            </div>

         
            <div className="w-full md:w-1/2 p-4 flex flex-col  ">
              <h2 className="text-3xl font-bold mb-2">{person?.name}</h2>
              <h3 className="text-lg font-semibold mb-2">
                Sector: {person?.sector}
              </h3>
              <h4 className="text-lg font-medium text-gray-600">
                {person?.deseasedTime}
              </h4>
            </div>
          </div> */}
          <div className="flex flex-col md:flex-row justify-center items-start mb-6">
            {/* Image Section */}
            <div className="w-full md:w-1/2 p-4">
              <img
                className="w-full lg:h-[25rem] rounded-lg shadow-lg object-cover"
                src={`${backendURL}/insertImage/${person?.image}`}
                alt={person?.name}
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">{person?.name}</h2>
              <h4 className="text-lg font-medium ">
                <span className="text-gray-600"> Sector:</span> {person?.sector}
              </h4>
              {person?.stateOfOrigin && (
                <h4 className="text-lg font-medium">
                  <span className="text-gray-600">State of Origin:</span>{" "}
                  {person.stateOfOrigin}
                </h4>
              )}

              {person?.tribe && (
                <h4 className="text-lg font-medium">
                  <span className="text-gray-600">Tribe:</span> {person.tribe}
                </h4>
              )}

              {person?.born && (
                <h4 className="text-lg font-medium">
                  <span className="text-gray-600">Born:</span> {person.born}
                </h4>
              )}

              {person?.died && (
                <h4 className="text-lg font-medium">
                  <span className="text-gray-600">Died:</span> {person.died}
                </h4>
              )}

              {person?.title && (
                <h4 className="text-lg font-medium">
                  <span className="text-gray-600">Title:</span> {person.title}
                </h4>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-1">Biography</h4>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: person?.biography }}
            />
          </div>

          <div className="mb-4">
            <strong>Achievements:</strong>
            {person?.achievements?.map((achievement, index) => (
              <div key={index} className="mb-2">
                <p className="mb-2">{achievement.writeUp}</p>
                <ul className="list-none pl-4">
                  {achievement.list?.map((item, idx) => (
                    <li
                      className="relative mb-4 pl-6 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-green before:rounded-full"
                      key={idx}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalModal;
