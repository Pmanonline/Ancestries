import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  createFamilyMember,
  getProfile,
} from "../features/UserFeature/UserAction";
import NotificationBar from "../components/chats/Notifications";
import { AuthContext } from "../components/context/AuthContext";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isFamilyTreeOpen, setIsFamilyTreeOpen] = useState(false);

  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const familyTreeDropdownRef = useRef(null);
  // const userInfo = useSelector((state) => state.auth);
  // const { user, token } = useSelector((state) => state.auth);
  // const userId = userInfo?.user?.id;

  // console.log(userInfo, "userinfo from navbar");
  // console.log(userId, "userId from navbar");

  const { user, token } = useSelector((state) => state.auth);
  const userId = user?.id;
  useEffect(() => {
    console.log("Component user:", user);
    console.log("Component token:", token);
    console.log("Component userId:", userId);
  }, [user, token]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId)); // Call thunk with userId
    }
  }, [userId, dispatch]);

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
      !userDropdownRef.current.contains(event.target) &&
      !familyTreeDropdownRef.current.contains(event.target)
    ) {
      closeMenu();
      setUserOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout button clicked");
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl flex-wrap items-center justify-around mx-auto p-4">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Toggle navigation</span>
          {isOpen ? (
            <IoClose className="w-6 h-6" />
          ) : (
            <GiHamburgerMenu className="w-6 h-6" />
          )}
        </button>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
          ref={menuRef}
        >
          <div className="mid:hidden">
            <Link to="/" className="flex w-[10vh]" onClick={closeMenu}>
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Website-Logo"
              />
            </Link>
          </div>

          <ul className="text-black flex flex-wrap font-medium p-4 mt-4 rounded-lg gap-5 rtl:space-x-reverse mid:flex-col md:mt-0 bg-NavClr md:rounded-xl md:p-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/partners"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                Our Partners
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/name-meanings"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                Name Meanings
              </NavLink>
            </li>

            <li className="relative group" ref={familyTreeDropdownRef}>
              <button
                type="button"
                onClick={toggleFamilyTreeMenu}
                className="flex items-center py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent"
              >
                Family Tree <FaChevronDown className="ml-2" />
              </button>

              {isFamilyTreeOpen && (
                <ul className="absolute  z-50 bg-NavClr border rounded-lg mt-2 py-2 px-6">
                  <li>
                    <NavLink
                      to="/my-family-tree"
                      className={({ isActive }) =>
                        `block px-4 py-2 text-black hover:text-green whitespace-nowrap  ${
                          isActive ? "text-green   " : "text-black"
                        }`
                      }
                      onClick={closeMenu}
                    >
                      My Family Tree
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={closeMenu}
                      to="/search-a-tree"
                      className={({ isActive }) =>
                        ` block px-4 py-2 text-black hover:text-green whitespace-nowrap" ${
                          isActive ? "text-green   " : "text-black"
                        }`
                      }
                      end
                    >
                      Search a Tree
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink
                to="/genealogy"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                Genealogy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/historicalPeople"
                className={({ isActive }) =>
                  ` block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent ${
                    isActive ? "text-green   " : "text-black"
                  }`
                }
                end
              >
                Historical People
              </NavLink>
            </li>
            <li>
              <Link
                to="/historicalPeople"
                className="block py-2 px-3 md:p-0 text-black rounded hover:text-green md:dark:hover:bg-transparent"
              >
                <Link className=" text-black rounded  md:dark:hover:bg-transparent font-semibold">
                  <NotificationBar />
                </Link>
              </Link>
            </li>
          </ul>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="text-center flex">
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-black rounded hover:text-green md:dark:hover:bg-transparent text-lg"
                  >
                    Logout
                  </button>

                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={toggleUserFile}
                      className=" focus:ring- focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                      type="button"
                    >
                      <IoPersonCircleOutline size={25} />
                      <svg
                        className={`w-2.5 h-2.5 ms-3  hover:text-green ${
                          userOpen ? "transform rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>

                    {userOpen && (
                      <div
                        id="dropdownInformation"
                        className="absolute z-10 right-1 text-black divide-y divide-black rounded-lg shadow w-44 mt-1 bg-NavClr"
                      >
                        <div className="px-4 py-3 text-sm text-black">
                          <div className="font-medium truncate">
                            {user && user?.email
                              ? user?.email
                              : "User email not available"}
                          </div>
                        </div>
                        <ul className="py-2 text-start text-sm text-gray-700">
                          <li>
                            <Link
                              to={`/profile/${userId}`}
                              className="block px-4 py-2 text-black rounded hover:text-green md:dark:hover:bg-transparent font-semibold"
                              onClick={() => setUserOpen(false)}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/view-tree/${userId}`}
                              className="block px-4 py-2 text-black rounded hover:text-green md:dark:hover:bg-transparent font-semibold"
                              onClick={() => setUserOpen(false)}
                            >
                              View Tree
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/chatPage`}
                              className="block px-4 py-2 text-black rounded hover:text-green md:dark:hover:bg-transparent font-semibold"
                              onClick={() => setUserOpen(false)}
                            >
                              Chat
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/MyConnections`}
                              className="block px-4 py-2 text-black rounded hover:text-green md:dark:hover:bg-transparent font-semibold"
                              onClick={() => setUserOpen(false)}
                            >
                              Connections
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
