import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetstartedCard1 } from "../components/Cards/GetstartedCard";
import { GetstartedCard2 } from "../components/Cards/GetstartedCard";
import { Number3 } from "../components/d-button";
import { HomeCard4 } from "../components/Cards/Cards";
import { HomeCard1 } from "../components/Cards/Cards";
import { HomeCard2 } from "../components/Cards/Cards";
import { HomeCard3 } from "../components/Cards/Cards";
import FamilyImage from "../assets/images/familyTree2.png";

function GetStartedWithFamilyTree() {
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo?.id;

  return (
    <>
      <section>
        {/* image */}
        <div className="relative flex overflow-hidden   h-[31rem] w-full  mx-auto">
          <div className="relative w-full h-full bg-transparent shadow-none mx-auto items-center">
            <img
              src={FamilyImage}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-[12rem]  w-full h-full flex items-end justify-center bg-opacity-50">
              <div className="p-6 text-center text-white">
                <h1 className="text-3xl mod:text-lg font-bold mb-6  font-Montserrat">
                  Start your family tree for free.
                </h1>
                <p className="text-xs font-normal leading-relaxed text-center">
                  Connect with your family story on Ancestry® and discover the
                  what, where, and who of how it all leads to you.
                </p>
              </div>
            </div>

            <div className="absolute bottom-[9rem]  w-full h-full flex items-end justify-center bg-opacity-50">
              <Link
                to={`/layout/personal-form/${userId}`}
                className="bg-green text-white font-bold  py-2 px-3 rounded-2xl mt-5 transition ease-in-out duration-200 transform hover:scale-105"
              >
                Build your tree
              </Link>
            </div>
          </div>
        </div>
        {/* image */}

        <div className="lg:flex mod:mx-4 my-5">
          <GetstartedCard2 />
          <GetstartedCard1 />
        </div>
        <div className="bg-[#1b7228] my-16 py-2 w-[80%] mx-auto">
          <div className="flex justify-center">
            <p className="mt-3 text-white text-center text-lg font-semibold leading-relaxed">
              Billions of records. Millions of fellow family history seekers.
            </p>
            <p className="ml-3  relative top-[-0.5rem] ">
              <Number3 />
            </p>
          </div>
          <h4 className="mt-3 text-xs font-normal leading-relaxed px-4 lg:max-w-[50rem] mx-auto text-white text-center">
            Very soon, leaves will begin to appear as you build your family
            tree—these are Ancestry Hints®. And each one is a potential
            discovery. Follow the leaves and watch your family tree grow.
          </h4>
        </div>
        {/* Cards */}
        {/* section5 starts */}
        <section className="pt-[7rem] pb-[7rem]  bg-NavClr">
          <h1 className="text-3xl mod:text-lg font-bold mb-12 text-center">
            Starting your tree couldn’t be easier..
          </h1>
          <div className="px-4 mod:px-12  mt-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <HomeCard1 />
            <HomeCard2 />
            <HomeCard3 />
            <HomeCard4 />
          </div>
        </section>

        {/* section5 ends*/}
        {/* Cards */}
      </section>
    </>
  );
}

export default GetStartedWithFamilyTree;
