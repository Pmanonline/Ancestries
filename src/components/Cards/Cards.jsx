import React from "react";
import CardImage1 from "../../assets/images/CardImage1.png";
import CardImage2 from "../../assets/images/CardImage2.png";
import CardImage3 from "../../assets/images/CardImage3.png";
import CardImage4 from "../../assets/images/CardImage4.png";
import TestimonialImage from "../../assets/images/testimonialImage.png";
import ExploreImage from "../../assets/images/exploreImage.png";
import CardsData from "../../assets/json-datas/CardDatas.json";
import ExploreCardsData from "../../assets/json-datas/ExploreCards.json";
// import { DirectionButton1 } from "../components/d-button";
import { DirectionButton2 } from "../d-button";
import { MdOutlineImageSearch } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { PiBinocularsBold } from "react-icons/pi";
import { GrNotes } from "react-icons/gr";
import { Link } from "react-router-dom";
import "../../App.css";

const HomeCard1 = () => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden bg-transparent shadow-none bg-clip-border">
        <img src={CardImage4} alt="image" className="w-full h-auto" />
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-xl mod:text-lg font-bold font-Montserrat underline text-center">
            Add What You <br /> Know
          </h2>
        </div>
      </div>
      {/* Description */}
      <div className="p-6">
        <span className="flex justify-center text-4xl text-green-600">
          <GrNotes />
        </span>
        <p className="block mt-3 font-sans text-lg mod:text-sm font-normal leading-relaxed text-gray-700">
          Your knowledge of family stories and traditions adds depth to your
          ancestors' history, filling gaps left by historical records. Sharing
          these details creates a fuller, more meaningful picture of your
          family's story.
        </p>
      </div>
    </div>
  );
};

const HomeCard3 = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden bg-transparent shadow-none bg-clip-border">
        <img src={CardImage3} alt="image" className="w-full h-auto" />
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-xl mod:text-lg font-bold uppercase font-Montserrat text-center">
            Explore the <br /> Records
          </h2>
        </div>
      </div>
      {/* Description */}
      <div className="p-6">
        <span className="flex justify-center text-4xl text-green-600">
          <MdTravelExplore />
        </span>
        <p className="block mt-3 font-sans text-lg mod:text-sm font-normal leading-relaxed text-gray-700">
          We provide concrete details and reveal the stories of your ancestors’
          lives. Our platform gives you access to a vast array of historical
          documents, allowing you to delve into the past and uncover essential
          information about your family’s history.
        </p>
      </div>
    </div>
  );
};

const HomeCard2 = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg ">
      {/* Image */}
      <div className="relative overflow-hidden bg-transparent shadow-none bg-clip-border">
        <img src={CardImage2} alt="image" className="w-full h-auto" />
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-xl mod:text-lg font-bold uppercase font-Montserrat text-center">
            Find Out More
          </h2>
        </div>
      </div>
      {/* Description */}
      <div className="p-6">
        <span className="flex justify-center text-4xl text-green-600">
          <PiBinocularsBold />
        </span>
        <p className="block mt-3 font-sans text-lg mod:text-sm font-normal leading-relaxed text-gray-700">
          Ready to explore further into your family’s past? Our "Find Out More"
          feature is designed to help you dig deeper, uncover hidden stories,
          and discover new connections that enrich your understanding of your
          family’s history.
        </p>
      </div>
    </div>
  );
};

const HomeCard4 = () => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden bg-transparent shadow-none bg-clip-border">
        <img src={CardImage1} alt="image" className="w-full h-auto" />
        {/* Overlay Text */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-xl mod:text-lg font-bold uppercase font-Montserrat">
            Find with Ease
          </h2>
        </div>
      </div>
      {/* Description */}
      <div className="p-6">
        <span className="flex justify-center text-4xl text-green-600">
          <MdOutlineImageSearch />
        </span>
        <p className="block mt-3 font-sans text-lg mod:text-sm font-normal leading-relaxed text-gray-700">
          Your last name is a historical link to your family's legacy. Our
          platform helps you explore its origins, significance, and evolution,
          offering insights into the geographical, linguistic, or cultural roots
          of your surname
        </p>
      </div>
    </div>
  );
};

// Rounded Card mapping starts
const RoundedCard = ({ card }) => {
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex items-center bg-white rounded-full shadow-xl border  border-gray-100  h-[16rem]">
        <div className="sm:w-[16rem] h-[16rem] flex-shrink-0">
          <img
            src={card.image}
            alt="Card Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="ml-4 flex flex-col justify-center">
          <h4 className="text-lg font-semibold  font-Montserrat mb-3 expcard mr-10">
            Know your
            <span className="break-expcard">heroes</span>
          </h4>
          <p className="max-w-[16rem]  text-xs px-2">{card.description}</p>
          <Link to="/historicalPeople">
            <button className="bg-green text-white py-2  mt-3 rounded-2xl w-[8rem] whitespace-nowrap flex items-center justify-center transition ease-in-out duration-200 transform hover:scale-105">
              {card.buttonText}
              <DirectionButton2 className="" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const RoundedCardsList = () => {
  return (
    <div className="lg:flex justify-between">
      {CardsData.map((card) => (
        <RoundedCard key={card.id} card={card} />
      ))}
    </div>
  );
};

// Rounded Card mapping ends

// TestimonialCards starts

const TestimonialCard1 = () => {
  return (
    <div className="max-w-xl mx-auto ">
      <div className="flex  bg-white rounded-3xl shadow-xl border border-gray-100 h-[10rem] lg:w-[30rem]">
        <div className="w-[10rem] h-[10rem] flex-shrink-0">
          <img
            src={TestimonialImage}
            alt="Card Image"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="mt-5">
          <h4 className="text-md mb-2 text-green px-2 font-semibold font-Montserrat">
            JOHN GAMES1
          </h4>
          <p className="text-xs px-2">
            Every hero has a story and behind that story is the birthing of what
            made them who and what they are.
          </p>
        </div>
      </div>
    </div>
  );
};
const TestimonialCard2 = () => {
  return (
    <div className="max-w-xl mx-auto ">
      <div className="flex  bg-white rounded-3xl shadow-xl border border-gray-100 h-[10rem] lg:w-[30rem]">
        <div className="w-[10rem] h-[10rem] flex-shrink-0">
          <img
            src={TestimonialImage}
            alt="Card Image"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="mt-5">
          <h4 className="text-md mb-2 text-green px-2 font-semibold font-Montserrat">
            JOHN GAMES2
          </h4>
          <p className="text-xs px-2">
            Every hero has a story and behind that story is the birthing of what
            made them who and what they are.
          </p>
        </div>
      </div>
    </div>
  );
};
const TestimonialCard3 = () => {
  return (
    <div className="max-w-xl mx-auto ">
      <div className="flex  bg-white rounded-3xl shadow-xl border border-gray-100 h-[10rem] lg:w-[30rem]">
        <div className="w-[10rem] h-[10rem] flex-shrink-0">
          <img
            src={TestimonialImage}
            alt="Card Image"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="mt-5">
          <h4 className="text-md mb-2 text-green px-2 font-semibold font-Montserrat">
            JOHN GAMES3
          </h4>
          <p className="text-xs px-2">
            Every hero has a story and behind that story is the birthing of what
            made them who and what they are.
          </p>
        </div>
      </div>
    </div>
  );
};
// TestimonialCards ends

// function ExploreCard({ card }) {
//   return (
//     <div className="relative  flex  overflow-hidden rounded-xl bg-clip-border shadow-lg lg:max-w-[35rem] h-[22rem] Nlg:max-w-[35rem]">
//       <div className="relative w-full h-full bg-transparent shadow-none bg-clip-border mx-auto items-center">
//         <img
//           src={card.image}
//           alt="background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute top-0 left-0 p-4">
//           <span className="text-lg italic text-black font-bold">
//             {card.logo}
//           </span>
//         </div>
//         <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center bg-opacity-50">
//           <div className="p-6 text-center text-white">
//             <p className="mt-3 text-xs font-normal leading-relaxed">
//               {card.description}
//             </p>
//             <div className="mt-3">
//               <button className="bg-green text-white py-2 mt-5 rounded-2xl w-[15rem] whitespace-nowrap flex items-center justify-center px-5 mx-auto">
//                 {card.buttonText}
//                 <span className="mx-2">
//                   {/* Assuming DButton2 is an imported or defined component */}
//                   <DirectionButton2 />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ExploreCards() {
//   // Slice the array to separate the cards as required
//   const firstTwoCards = ExploreCardsData.slice(3);
//   const middleCards = ExploreCardsData.slice(0, -2);

//   return (
//     <div className="max-w-screen-xl mx-auto justify-center">
//       {/* First block with the first two cards */}
//       <div className="max-w-screen-xl  mx-auto bg-black ">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-7  justify-center items-center  mx-auto">
//           {firstTwoCards.map((card) => (
//             <ExploreCard key={card.id} card={card} />
//           ))}
//         </div>
//       </div>

// {/* Second block with the remaining middle cards */}
// {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto justify-center">
//   {middleCards.map((card) => (
//     <ExploreCard key={card.id} card={card} />
//   ))}
// </div> */}
//     </div>
//   );
// }

// export default ExploreCards;

// function ExploreCard({ card }) {
//   return (
//     <div className="relative flex overflow-hidden rounded-xl shadow-lg h-[22rem] w-full sm:w-3/4 md:w-2/3 lg:w-[35rem] mx-auto">
//       <div className="relative w-full h-full bg-transparent shadow-none mx-auto items-center">
//         <img
//           src={card.image}
//           alt="background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute top-0 left-0 p-4">
//           <span className="text-lg italic text-black font-bold">
//             {card.logo}
//           </span>
//         </div>
//         <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center bg-opacity-50">
//           <div className="p-6 text-center text-white">
//             <p className="mt-3 text-xs font-normal leading-relaxed">
//               {card.description}
//             </p>
//             <div className="mt-3">
//               <button className="bg-green text-white py-2 mt-5 rounded-2xl w-[15rem] flex items-center justify-center px-5 mx-auto">
//                 {card.buttonText}
//                 <span className="mx-2">
//                   <DirectionButton2 />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ExploreCards() {
//   // Slice the array to separate the cards as required
//   const firstTwoCards = ExploreCardsData.slice(0, 2);
//   const middleCards = ExploreCardsData.slice(2, 5); // Update slice as per the required cards

//   return (
//     <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
//       {/* First block with the first two cards */}
//       <div className="w-full flex flex-wrap justify-center gap-4 mb-7">
//         {firstTwoCards.map((card) => (
//           <ExploreCard key={card.id} card={card} />
//         ))}
//       </div>

//       {/* Second block with the remaining 3 middle cards */}
//       <div className="lg:w-[33%] lg:flex flex-wrap justify-center gap-4 mb-7">
//         {middleCards.map((card) => (
//           <ExploreCard key={card.id} card={card} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExploreCards;

function ExploreCard({ card }) {
  return (
    <div className="relative flex overflow-hidden rounded-xl shadow-lg h-[22rem] w-full sm:w-3/4 md:w-2/3 lg:w-[35rem] mx-auto">
      <div className="relative w-full h-full bg-transparent shadow-none mx-auto items-center">
        <img
          src={card.image}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 p-4">
          <span className="text-lg italic text-black font-bold">
            {card.logo}
          </span>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-end justify-center bg-opacity-50">
          <div className="p-6 text-center text-white">
            <p className="mt-3 text-xs font-normal leading-relaxed">
              {card.description}
            </p>
            <div className="mt-3">
              <button className="bg-green text-white py-2 mt-5 rounded-2xl w-[15rem] flex items-center justify-center px-5 mx-auto transition ease-in-out duration-200 transform hover:scale-105">
                {card.buttonText}
                <span className="mx-2">
                  <DirectionButton2 />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreCards() {
  // Slice the array to separate the cards as required
  const firstTwoCards = ExploreCardsData.slice(0, 2);
  const middleCards = ExploreCardsData.slice(2, 5); // Update slice as per the required cards

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
      {/* First block with the first two cards */}
      <div className="w-full flex flex-wrap justify-center gap-4 mb-7">
        {firstTwoCards.map((card) => (
          <ExploreCard key={card.id} card={card} />
        ))}
      </div>

      {/* Second block with the remaining 3 middle cards */}
      <div className="w-full flex flex-wrap justify-center gap-4 mb-7">
        {middleCards.map((card) => (
          <div className="w-full lg:w-[30%] flex justify-center" key={card.id}>
            <ExploreCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreCards;

export {
  HomeCard1,
  HomeCard2,
  HomeCard3,
  HomeCard4,
  TestimonialCard1,
  TestimonialCard2,
  TestimonialCard3,
  RoundedCardsList,
  ExploreCards,
};
