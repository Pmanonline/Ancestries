import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";
import Iilustration1 from "../../assets/images/ilustration.png";
import Iilustration2 from "../../assets/images/ilustration2.png";

export const Popup = ({ onClose, onLearnMore }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="relative   inset-0 bg-gray-800 bg-opacity-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        data-aos="slide-up"
        className="bg-gray-800 text-white rounded-2xl shadow-lg max-w-[25rem] w-full p-6 relative transform transition-transform duration-300 ease-in-out"
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors duration-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-green-500">
            How to Create a Family Tree?
          </h2>
          <p className="mt-2 text-gray-300 text-sm font-medium underline">
            Start with yourself (as the tree creator)
          </p>
        </div>
        <div className="space-y-4 text-gray-300 text-left">
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Add your first and
            last name.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Add your gender, date
            of birth, and upload your image.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Click save and
            continue.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> If already added,
            click the Next button.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-blue-500 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            👍 Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func,
};

export const RelativePopup = ({ onClose }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <div className="relative inset-0 bg-gray-800 bg-opacity-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        data-aos="slide-down"
        className="bg-gray-800 text-white rounded-2xl shadow-lg max-w-[25rem] w-full p-6 relative transform transition-transform duration-300 ease-in-out"
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors duration-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-green-500">
            How to Create a Family Tree?
          </h2>
          <p className="mt-2 text-gray-300 text-sm font-medium underline">
            Add your parents, grandparents, great-grandparents, and relatives'
            information
          </p>
        </div>
        <div className="space-y-4 text-gray-300 text-left">
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Their first name and
            last name.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Add their gender,
            date of birth, place lived/living, and upload their image.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> Click save and
            continue.
          </p>
          <p className="flex items-center">
            <span className="text-green-500 mr-2">•</span> If already added,
            click the Next button.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-blue-500 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            👍 Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

RelativePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export const IllustrationPopup = ({ onClose }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div
        data-aos="slide-right"
        className="bg-gray-900 text-white rounded-2xl shadow-lg max-w-[25rem] w-full p-6 relative transform transition-transform duration-300 ease-in-out"
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors duration-300"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-green-500">
            How to Create a Family Tree
          </h2>
          <p className="mt-2 text-gray-300 text-sm font-medium underline">
            Understanding the Indicators
          </p>
        </div>
        <div className="flex flex-col gap-4 text-gray-300">
          <div className="flex items-center space-x-4">
            <img
              src={Iilustration1}
              alt="Illustration of a gray background card"
              className="rounded-lg max-w-[10rem] flex-shrink-0"
            />
            <p>
              Cards with a gray background represent the ones currently being
              filled out or edited.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={Iilustration2}
              alt="Illustration of a green border card"
              className="rounded-lg max-w-[10rem] flex-shrink-0"
            />
            <p>
              Cards with a green border indicate that the information has been
              successfully added.
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            👍 Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

IllustrationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
