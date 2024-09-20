import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../LAYOUTS/Sidebar";
import LayoutNAv from "../../../components/layoutNAv";
import { FamilyTreeStructure } from "../../../components/FamilyTreeStructure";
import backgroundImage from "../../../assets/images/backgroundImage.png";

const FamilyTreeSelf = () => {
  return (
    <>
      <div
        className="flex flex-col lg:flex-row w-full h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Form Section */}
        <div className="lg:w-[45%] relative">
          <div className="mt-12">
            <Outlet />
          </div>
          <div className="fixed top-0 left-0 bottom-0 z-50 overflow-y-visible"></div>
        </div>

        {/* Family Tree Structure */}
        <div className="lg:w-[55%] bg-white">
          <div className="px-8 overflow-hidden">
            {/* Nav */}
            <span className="lg:hidden">{/* <LayoutNAv /> */}</span>
            {/* Family Tree Container */}
            <div className="relative w-full h-full min-w-[50rem] max-w-full mx-auto overflow-x-auto overflow-y-auto">
              <FamilyTreeStructure />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FamilyTreeSelf;
