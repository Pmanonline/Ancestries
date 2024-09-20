import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { MobileFamilyTreeStructure } from "../../components/FamilyTreeStructure";
import { MobileFamilyTreeStructure } from "../../components/MobileFamilyTreeStructure";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const active = true;
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="lg:flex lg:flex-col lg:w-[20rem] lg:min-w-[15rem] lg:bg-NavClr lg:p-3 lg:text-black lg:text-xs lg:font-bold lg:uppercase h-screen">
      <div onClick={handleNav} className="sm:hidden m-3 flex">
        <MdOutlineDashboard
          size={25}
          className="cursor-pointer hover:scale-125"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${nav ? "fixe left-0 top-0 w-full h-screen " : "hidden"}`}
      >
        <div
          className={`${
            nav
              ? "fixed left-0 top-0 w-[80%] sm:w-[80%] h-screen bg-[#ecf0f3] p-10 overflow-y-auto"
              : "hidden"
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div
              onClick={handleNav}
              className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
            >
              <IoClose className="text-xl text-red-500" />
            </div>
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          {/* Your mobile menu items */}

          <MobileFamilyTreeStructure />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
