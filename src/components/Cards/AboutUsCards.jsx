import React from "react";
import AboutUsData from "../../assets/json-datas/AboutUsCardData.json";

const AboutUsCard = () => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-center w-full">
      {AboutUsData.map((About) => (
        <div
          key={About.id}
          className="overflow-hidden  bg-white bg-clip-border text-gray-700 shadow-lg max-w-[19.5rem] w-full lg:m-1 m-4 p-0"
        >
          {/* Image */}
          <div className="overflow-hidden bg-transparent shadow-none bg-clip-border">
            <img src={About.image} alt="profile" className="w-full h-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default AboutUsCard;
