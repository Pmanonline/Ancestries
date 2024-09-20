import React from "react";

import getSyartedImage1 from "../../assets/images/getstartedImage1.png";
import getSyartedImage2 from "../../assets/images/getstartedImage2.png";

import { Number2 } from "../d-button";
import { Number1 } from "../d-button";

export const GetstartedCard1 = () => {
  return (
    <div className="relative flex overflow-hidden rounded-xl  h-[22rem] w-full sm:w-3/4 md:w-2/3 lg:w-[35rem] mx-auto">
      <div className="relative w-full h-full bg-transparent shadow-none mx-auto items-center">
        <img
          src={getSyartedImage1}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 lg:left-[3rem] w-full h-full flex items-end justify-center bg-opacity-50">
          <div className="p-6 text-center text-white">
            <p className="mt-3 text-lg font-semibold leading-relaxed text-end flex justify-end ">
              <Number2 />
            </p>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-end">
              Trace a family member down <br></br>the line.
            </p>
            <h4 className="mt-3 text-xs font-normal leading-relaxed text-end max-w-[20rem]">
              Very soon, leaves will begin to appear as you build your family
              tree—these are Ancestry Hints®. And each one is a potential
              discovery. Follow the leaves and watch your family tree grow.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GetstartedCard2 = () => {
  return (
    <div className="relative flex overflow-hidden rounded-xl  h-[22rem] w-full sm:w-3/4 md:w-2/3 lg:w-[35rem] mx-auto Nlg:mb-9">
      <div className="relative w-full h-full bg-transparent shadow-none mx-auto items-center">
        <img
          src={getSyartedImage2}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-[-5rem] left-0 w-full h-full flex items-end justify-center bg-opacity-50">
          <div className="p-6 text-center text-white">
            <p className="mt-3 text-lg font-semibold leading-relaxed text-end flex justify-start ">
              <Number1 />
            </p>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-start">
              Trace a family member down <br></br>the line.......
            </p>
            <h4 className="mt-3 text-xs font-normal leading-relaxed text-start max-w-[20rem]">
              Very soon, leaves will begin to appear as you build your family
              tree—these are Ancestry Hints®. And each one is a potential
              discovery. Follow the leaves and watch your family tree grow.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
