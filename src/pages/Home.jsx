import React from "react";
import { Link } from "react-router-dom";
import heroImage2 from "../assets/images/heroImage3.png";
import section7backgroundImage from "../assets/images/s7backgroundImage.png";
import s4Image from "../assets/images/s4Image.png";
import hero2 from "../assets/images/hero2.jpg";
import { DirectionButton1 } from "../components/d-button";
import { HomeCard4 } from "../components/Cards/Cards";
import { HomeCard1 } from "../components/Cards/Cards";
import { HomeCard2 } from "../components/Cards/Cards";
import { HomeCard3 } from "../components/Cards/Cards";
import { RoundedCardsList } from "../components/Cards/Cards";
import { TestimonialCard1 } from "../components/Cards/Cards";
import { TestimonialCard2 } from "../components/Cards/Cards";
import { TestimonialCard3 } from "../components/Cards/Cards";
import { ExploreCards } from "../components/Cards/Cards";
import { FamilyHistoryCard1 } from "../components/Cards/FamilyHistoryCards";
import { FamilyHistoryCard2 } from "../components/Cards/FamilyHistoryCards";
import ourpartnersImage1 from "../assets/images/ourpartnersImage.png";
import "../App.css";
const partnersImages = [
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
  ourpartnersImage1,
];
function Home() {
  return (
    <>
      {/* section1 Hero starts */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-4">
        {/* LARGE_SCREEN */}
        <div className="relative rounded-3xl bg-green h-[80%] lg:flex items-center justify-center lg:order-2 hidden ">
          <img
            src={heroImage2}
            alt="Family Tree"
            sizes="50"
            className="w-[35vw] relative  top-[-3rem] left-[3rem]"
          />
          <h4 className="absolute top-4 left-4 text-black text-xl z-20 bg-green bg-opacity-50 px-4 py-2 rounded-md">
            Know the truth about <br /> your heritage and <br />
            <span className="text-white font-black text-2xl">History</span>
          </h4>
        </div>

        <div className="relative rounded-3xl  h-full Nlg:flex items-center justify-center lg:order-2 bg-green hidden">
          <h4 className="absolute top-4 left-4 text-black text-xl z-20  px-4 py-2 rounded-md">
            Know the truth about <br /> your heritage and <br />
            <span className="text-white font-black text-2xl">History</span>
          </h4>
          <span className="">
            <img
              src={heroImage2}
              alt="Family Tree"
              // sizes="50"
              className="sm:w-[35rem]"
            />
          </span>
        </div>
        {/* SMALL_SCREEN */}

        <div className="lg:order-1 lg:pr-10 mx-auto">
          <h1 className="text-3xl mod:text-lg font-bold mb-6  font-Montserrat">
            Trace your Family
            <span className="text-green "> Tree</span>
            <br />
            and identify your
            <br />
            <span className="text-green font-Montserrat"> Heritage</span>
          </h1>
          <p className="sm:max-w-[100%] text-base mb-4  mod:text-sm">
            Are you curious about your family’s history? With our comprehensive
            ancestry tracing service, you can embark on a fascinating journey to
            discover the stories, cultures, and individuals that make up your
            unique heritage. Whether you're a seasoned genealogist or just
            starting out, we provide the tools and expertise to help you trace
            your family tree and connect with your past. Begin by creating a
            personalized account on our platform. This will be your hub for all
            things genealogy, where you can store documents, track your
            progress, and collaborate with others.
          </p>
          <Link to="/LoginGetStarted">
            <div className="mt-3">
              <button className="bg-green text-white py-2 px-3 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105">
                Start free trial
              </button>
            </div>
          </Link>
        </div>
      </section>
      {/* section1 Hero ends */}

      {/* section2 starts */}
      <section className="bg-green mt-[14rem] Nlg:mb-[6rem]">
        <div className="relative flex items-center justify-center">
          <div className="bg-white lg:max-w-[90%] mx-auto gap-20 sm:flex justify-around rounded-lg px-4 md:px-36 py-8 md:py-5 shadow-inner shadow-gray-200 absolute top-[1%] mod:top-[-12%] mod:px-12 transform -translate-y-1/2 z-20 ">
            <div className="text-black text-center">
              <span className="text-3xl mod:text-lg font-black"> 1000+</span>
              <br /> <span className="text-lg mod:text-sm">Names</span>
            </div>
            <div className="text-black text-center">
              <span className="text-3xl mod:text-lg font-black"> 1000+</span>
              <br /> <span className="text-lg mod:text-sm">Users</span>
            </div>
            <div className="text-black text-center">
              <span className="text-3xl mod:text-lg font-black"> 1000+</span>
              <br /> <span className="text-lg mod:text-sm">History</span>
            </div>
          </div>
          <img
            src={hero2}
            alt="Family Tree"
            className="w-full h-full pt-[2rem] object-cover Nlg:hidden"
          />

          <img
            src={hero2}
            alt="Family Tree"
            className="w-full h-[25rem] sm:h-[25rem] md:h-[30rem] lg:h-full pt-[2rem] object-cover lg:hidden"
          />

          <div className="lg:top-[30%] absolute top-[2rem] text-white text-xl z-20 px-4 py-2 rounded-md text-center md:max-w-[70%] md:left-[15%]">
            <h1 className="text-3xl mod:text-lg font-bold mb-6 mt-12 font-Montserrat uppercase">
              A family tree ties your history together <br /> over time.
            </h1>
            <p className="text-base mod:text-sm mb-4 ">
              A family tree is more than just a chart of names—it’s a living map
              that connects your heritage across generations. It bridges the
              past and present, revealing how your ancestors’ stories are
              intertwined with your own. With each branch, you discover a legacy
              of relationships, traditions, and milestones that define who you
              are today.
            </p>
            <div className="mt-4">
              <Link to={"/genealogy/Abia-State"}>
                <button className="bg-green text-white py-2 px-3 rounded-2xl mod:text-sm transition ease-in-out duration-200 transform hover:scale-105">
                  Explore your ethnicity
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* section2 ends */}

      {/* section3 starts */}
      <section className="mt-[4rem] grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 items-center pb-[9rem] bg-green pt-[9rem] overflow-hidden ">
        <div className="lg:relative rounded-3xl lg:flex items-center justify-center lg:order-2 ">
          <FamilyHistoryCard1 />
          <FamilyHistoryCard2 />
        </div>
        <div className="lg:order-1  mx-auto text-white ml-3">
          <h1 className="text-4xl mod:text-3xl font-bold mb-6 uppercase font-Montserrat Nlg:mx-12">
            Bring Your Backstory to Life
          </h1>
          <p className="Nlg:mx-12">
            Our Family Listing Membership offers you a unique opportunity to
            connect with relatives, share discoveries, and collaboratively
            preserve your family’s history. Whether you’re actively tracing your
            family tree or simply looking to maintain family connections, our
            membership provides the tools and resources you need to keep your
            family legacy alive. You can also build a private network where you
            and your relatives can collaborate on your family history. Share
            stories, documents, photos, and more, all in one secure, centralized
            location. Work together with family members to build and expand your
            family tree. Each member can contribute information, ensuring that
            your tree is as complete and accurate as possible.
          </p>
        </div>
      </section>
      {/* section3 ends */}

      {/* section4 starts */}
      <section className=" mx-4 mt-24 grid grid-cols-1 lg:grid-cols-[50%_50%] gap-6 items-center  overflow-hidden">
        <div className="rounded-3xl flex items-center justify-center lg:order-1">
          <img
            src={s4Image}
            alt="Descriptive Alt Text"
            className="lg:w-[80rem] lg:h-[50rem]  lg:object-contain rounded-3xl"
          />
        </div>
        <div className="lg:order-1 lg:pr-10 mx-auto Nlg:mx-6">
          <h3 className="text-2xl mb-6 text-black text-end">
            Bothered about why they do this and that? <br />
            <span className="text-green text-4xl mod:text-3xl">
              find out here
            </span>
          </h3>
          <p className="text-end">
            Understanding the motivations behind their actions can offer deep
            insights into your family’s history and help you connect with your
            heritage on a more personal level. Dive into the personal beliefs
            and values that may have guided your ancestors’ choices. Religion,
            family loyalty, and personal convictions often played a key role in
            determining how they lived their lives.
          </p>
          <div className="flex justify-end mt-5 ">
            <DirectionButton1 />
          </div>
        </div>
      </section>
      {/* section4 ends */}

      {/* section5 starts */}
      <section className="px-4 mod:px-12  mt-3 bg-NavClr pt-[10rem] pb-[10rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <HomeCard1 />
        <HomeCard2 />
        <HomeCard3 />
        <HomeCard4 />
      </section>
      {/* section5 ends*/}

      {/* section6 starts*/}
      <section className="py-[5rem]">
        <div className="text-center py-[3rem]">
          <h2 className=" font-medium mb-4">Explore more with essential</h2>
          <p>Promotions, deals and special offers for you</p>
        </div>
        <div className="">
          <RoundedCardsList />
        </div>
      </section>
      {/* section6 ends*/}

      {/* section7 starts*/}
      <section
        className="my-[4rem] bg-cover bg-center mod:px-6"
        style={{ backgroundImage: `url(${section7backgroundImage})` }}
      >
        <h3 className="text-xl font-bold uppercase text-green text-center lg:mb-[10rem] font-Montserrat">
          Testimonial
        </h3>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <div className="lg:relative  top-[-3rem] right-[-2.5rem]">
            <TestimonialCard1 />
          </div>
          <div className=" lg:relative right-[-3rem] top-[3.5rem]">
            <TestimonialCard2 />
          </div>
          <div className=" lg:relative right-[3rem] lg:mb-[5rem]">
            <TestimonialCard3 />
          </div>
        </div>
      </section>

      {/* section7 ends*/}

      {/* section8 our-partners starts*/}
      <section className="my-[3rem] mx-4">
        <h3 className="text-xl font-bold uppercase text-green text-center mb-[4rem] font-Montserrat">
          our partners
        </h3>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {partnersImages.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={image}
                alt={`Partner ${index + 1}`}
                className="partner-image"
              />
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold uppercase text-green text-center my-[4rem] font-Montserrat">
          How would you like to get started?
        </h3>

        <p className="lg:w-[55rem] mx-auto text-center">
          Every hero has a story and behind that story is the birthing of what
          There are many paths to finding your family story. Whichever way you
          choose—tracing your family generations back with a family tree or
          uncovering your ethnicity with jeruu hre—we'll be here to help you.
        </p>

        <div className="my-[4rem]">
          <div className="mt-3  sm:flex justify-around lg:w-[55rem] mx-auto mod:text-center">
            <Link to={"/genealogy/Abia-State"}>
              <button className="bg-green text-white py-2 px-3 mx-3 mod:mb-5 mod:text-sm rounded-2xl font-bold transition ease-in-out duration-200 transform hover:scale-105">
                Explore your ethnicity
              </button>
            </Link>
            <Link to={"/names/ayo"}>
              <button className="bg-purple text-white py-2 px-3 rounded-2xl font-bold mod:text-sm transition ease-in-out duration-200 transform hover:scale-105">
                know more through surname
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* section8 our-partners ends*/}

      {/* section9 explore starts*/}
      <section className="my-[4rem] mx-4">
        <h3 className="text-2xl font-bold uppercase text- text-start mt-[4rem] font-Montserrat">
          Explore more with essential
        </h3>
        <p className="text-start my-[1rem]">
          Promotions, deals and special offers for you
        </p>
        <span className="">
          <ExploreCards />
        </span>
      </section>

      {/* section9 explore ends*/}
    </>
  );
}

export default Home;
