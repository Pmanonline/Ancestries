import React, { useState } from "react";
import { DirectionButton1 } from "../components/d-button";
import { FaTwitter } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    setEmail("");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <footer className="bg-gradient-to-t from-[#0c6c1b] to-[#01c420]  text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 mb-10 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Icons and Website Logo */}
        <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
          <img
            src="/path/to/logo.png"
            alt="Website Logo"
            className="w-24 h-auto mr-4"
          />
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="blank" aria-label="twitter">
              <FaTwitter className="w-6 h-auto" />
            </a>
            <a
              href="https://wa.me/+2347062916027"
              target="blank"
              aria-label="whatsapp"
            >
              <BsWhatsapp className="w-6 h-auto" />
            </a>
            <a href="https://facebook.com" target="blank" aria-label="facebook">
              <FaFacebookF className="w-6 h-auto" />
            </a>
            <a
              href="https://instagram.com"
              target="blank"
              aria-label="instagram"
            >
              <FaInstagram className="w-6 h-auto" />
            </a>
          </div>
        </div>

        {/* Newsletter Sign-Up Form */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-2xl font-light mb-3">
            Sign Up for Our Newsletter
          </h4>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="px-9 py-2  focus:outline-none focus:ring-2 focus:ring-green text-black"
            />
            <button className="bg-green-500 bg-white px-4 py-2  hover:bg-green-600 relative z-0">
              <DirectionButton1 />
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* First Column */}
        <div>
          <ul className="pl-5 list-disc list-inside">
            <li>Corporate Info</li>
            <li>Accessibility</li>
            <li>Jobs</li>
            <li>Ad Choices</li>
            <li>Privacy Policy</li>
            <li>CA Notice</li>
            <li>Terms of Service - NEW</li>
          </ul>
        </div>

        {/* Second Column */}
        <div>
          <ul className="list-disc pl-5">
            <li>NBC App</li>
            <li>Peacock</li>
            <li>Advertise</li>
            <li>Closed Captioning</li>
          </ul>
        </div>

        {/* Third Column */}
        <div>
          <h4 className="font-bold mb-3">PON Quick Links</h4>
          <ul className="list-disc pl-5">
            <li>Advertise</li>
            <li>Link TV Provider</li>
            <li>FAQ</li>
            <li>Casting</li>
            <li>Contact Us</li>
            <li>Local Schedule</li>
            <li>Tickets and NBC Studio Tour</li>
          </ul>
        </div>

        {/* Fourth Column */}
        <div>
          <ul className="list-disc pl-5">
            <li>Parental Guidelines and TV Ratings</li>
            <li>Video Viewing Policy</li>
            <li>Viewer Panel</li>
            <li>Shop</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
