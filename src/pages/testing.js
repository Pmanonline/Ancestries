import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { getProfile } from "../features/UserFeature/UserAction";
import NotificationBar from "../components/chats/Notifications";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isFamilyTreeOpen, setIsFamilyTreeOpen] = useState(false);

  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const familyTreeDropdownRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setIsFamilyTreeOpen(false);
  };

  const toggleFamilyTreeMenu = () => setIsFamilyTreeOpen(!isFamilyTreeOpen);
  const toggleUserFile = () => setUserOpen(!userOpen);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !userDropdownRef.current?.contains(event.target) &&
      !familyTreeDropdownRef.current?.contains(event.target)
    ) {
      closeMenu();
      setUserOpen(false);
      setIsFamilyTreeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://flowbite.com/docs/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NavLinks
              isFamilyTreeOpen={isFamilyTreeOpen}
              toggleFamilyTreeMenu={toggleFamilyTreeMenu}
              familyTreeDropdownRef={familyTreeDropdownRef}
            />
          </div>
          <div className="flex items-center">
            <UserMenu user={user} handleLogout={handleLogout} userId={userId} />
            <div className="md:hidden ml-2">
              <motion.button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                aria-expanded="false"
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLinks
                mobile
                isFamilyTreeOpen={isFamilyTreeOpen}
                toggleFamilyTreeMenu={toggleFamilyTreeMenu}
                familyTreeDropdownRef={familyTreeDropdownRef}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLinks({
  mobile = false,
  isFamilyTreeOpen,
  toggleFamilyTreeMenu,
  familyTreeDropdownRef,
}) {
  const linkClass = `${
    mobile ? "block" : ""
  } px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-500 hover:bg-gray-50 transition duration-150 ease-in-out`;

  return (
    <>
      <NavLink to="/" className={linkClass} end>
        Home
      </NavLink>
      <NavLink to="/About" className={linkClass}>
        About
      </NavLink>
      <NavLink to="/partners" className={linkClass}>
        Our Partners
      </NavLink>
      <NavLink to="/name-meanings" className={linkClass}>
        Name Meanings
      </NavLink>
      <div className="relative" ref={familyTreeDropdownRef}>
        <button
          onClick={toggleFamilyTreeMenu}
          className={`${linkClass} flex items-center`}
        >
          Family Tree
          <FaChevronDown className="ml-1" />
        </button>
        {isFamilyTreeOpen && (
          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <Link
              to="/my-family-tree"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              My Family Tree
            </Link>
            <Link
              to="/search-a-tree"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Search a Tree
            </Link>
          </div>
        )}
      </div>
      <NavLink to="/genealogy" className={linkClass}>
        Genealogy
      </NavLink>
      <NavLink to="/historicalPeople" className={linkClass}>
        Historical People
      </NavLink>
      {mobile && <NotificationBar />}
    </>
  );
}

function UserMenu({ user, handleLogout, userId }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex space-x-2">
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="ml-3 relative" ref={menuRef}>
      <div>
        <button
          onClick={toggleMenu}
          className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          id="user-menu"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <IoPersonCircleOutline className="h-8 w-8 rounded-full" />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={`/profile/${userId}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Your Profile
            </Link>
            <Link
              to={`/view-tree/${userId}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              View Tree
            </Link>
            <Link
              to="/chatPage"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Chat
            </Link>
            <Link
              to="/MyConnections"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Connections
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
