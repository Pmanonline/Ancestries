import React from "react";
import profiles from "../../assets/json-datas/CardProfiles.json";

export const NameProfileCard = () => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg max-w-[15rem] w-full m-4"
        >
          {/* Image */}
          <div className="overflow-hidden bg-transparent shadow-none bg-clip-border">
            <img src={profile.image} alt="profile" className="w-full h-auto" />
          </div>
          {/* Name */}
          <div className="px-4 mb-3">
            <h3 className="font-sans text-lg font-bold mod:text-sm py-2">
              {profile.name}
            </h3>
          </div>
          {/* Gender and Position */}
          <div className="flex justify-between px-4 pb-3">
            <h3 className="font-sans text-base mod:text-sm font-normal">
              {profile.position}
            </h3>
            <h3 className="font-sans text-base mod:text-sm font-normal bg-NavClr py-">
              {profile.gender}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};
