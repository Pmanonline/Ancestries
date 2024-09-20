import React from "react";
import { TreeProfile } from "./d-button";
import { useLocation } from "react-router-dom";

export const MobileFamilyTreeStructure = () => {
  const location = useLocation();
  const activeRoutes = [
    "/layout/personal-form",
    "/layout/mothers-form",
    "/layout/fathers-form",
    "/layout/paternalGrandmother-form",
    "/layout/paternalGrandfather-form",
    "/layout/maternalGrandmother-form",
    "/layout/maternalGrandfather-form",
  ];
  const isActive = (route) => location.pathname === route;

  return (
    <>
      {/* Small and Medium screen structure */}
      <div className="lg:hidden flex flex-col items-center w-full max-w-md mx-auto overflow-hidden">
        {/* Me */}
        <div className="relative flex flex-col items-center space-y-4">
          <div
            className={`card mb-4 ${
              isActive("/layout/personal-form")
                ? "bg-[#A9A8A8]"
                : "bg-[#E8F3E7]"
            } border border-gray-300 p-6 rounded-lg shadow-md text-center w-full`}
          >
            <p className="flex justify-center mb-5">
              <TreeProfile />
            </p>
            <p className="text-xs whitespace-nowrap">My info</p>
          </div>
          <div className="line absolute w-0.5 h-[5.2rem] top-[6rem] bg-gray-300"></div>
        </div>

        {/* Parents */}
        <div className="relative flex flex-col items-center mb-8 w-full">
          <div className="flex justify-between w-full mb-4 relative">
            <div
              className={`card mb-4 ${
                isActive("/layout/fathers-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } border border-gray-300 p-6 rounded-lg shadow-md text-center w-[6rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs whitespace-nowrap">Father</p>
            </div>
            <div
              className={`card mb-4 ${
                isActive("/layout/mothers-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } relative z-20 border border-gray-300 p-6 rounded-lg shadow-md text-center w-[6rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs whitespace-nowrap">Mother</p>
            </div>
            <div className="line w-[59%] h-0.5 z-10 bg-gray-300 absolute top-1/2 left-[6rem]"></div>
          </div>
          <div className="right-[3rem] top-[7rem] absolute line w-0.5 h-[8.5rem] bg-gray-300"></div>
          <div className="left-[3rem] top-[7rem] absolute line w-0.5 h-[8.5rem] bg-gray-300"></div>
        </div>

        {/* Grandparents */}
        <div className="relative flex justify-between w-full flex-wrap">
          <div className="relative flex flex-col items-center">
            <div
              className={`card mb-4 relative z-20 ${
                isActive("/layout/paternalGrandfather-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs text-center flex justify-center">
                Grandfather <br />
                (Paternal)
              </p>
            </div>
            <div className="line-horizontal w-16 h-0.5 z-10 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
          </div>
          <div className="relative flex flex-col items-center">
            <div
              className={`card mb-4 ${
                isActive("/layout/paternalGrandmother-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } border border-gray-300 relative z-50 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs text-center flex justify-center">
                Grandmother <br />
                (Paternal)
              </p>
            </div>
            <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
          </div>
          <div className="relative flex flex-col items-center">
            <div
              className={`card mb-4 ${
                isActive("/layout/maternalGrandfather-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } border border-gray-300 relative z-50 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs text-center flex justify-center">
                Grandfather <br />
                (Maternal)
              </p>
            </div>
            <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
          </div>
          <div className="relative flex flex-col items-center">
            <div
              className={`card mb-4 ${
                isActive("/layout/maternalGrandmother-form")
                  ? "bg-[#A9A8A8]"
                  : "bg-[#E8F3E7]"
              } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
            >
              <p className="flex justify-center mb-5">
                <TreeProfile />
              </p>
              <p className="text-xs text-center flex justify-center">
                Grandmother <br />
                (Maternal)
              </p>
            </div>
            <div className="line-horizontal w-16 h-0.5 z-20 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
