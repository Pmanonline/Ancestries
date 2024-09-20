import React from "react";
import ExploreImage from "../../assets/images/exploreImage.png";

export const NameMeaningCard1 = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="flex items-center bg-white rounded-full shadow-xl border border-gray-100 h-[4rem]">
        <div className="w-[4rem] h-[4rem] flex-shrink-0">
          <img
            src={ExploreImage}
            alt="Card Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <p className="max-w-[16rem] text-xs px-2">
            Make quick family history discoveries with Ancestry Hints
          </p>
        </div>
      </div>
    </div>
  );
};
export const NameMeaningCard2 = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="flex items-center bg-white rounded-full shadow-xl border border-gray-100 h-[4rem]">
        <div className="w-[4rem] h-[4rem] flex-shrink-0">
          <img
            src={ExploreImage}
            alt="Card Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <p className="max-w-[16rem] text-xs px-2">
            Make quick family history discoveries with Ancestry Hints
          </p>
        </div>
      </div>
    </div>
  );
};
