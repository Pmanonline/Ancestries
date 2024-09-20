import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Error from "../components/tools/Error";
import Spinner from "../components/tools/Spinner";
import { resetSuccess } from "../features/UserFeature/UserSlice";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { BsPersonBoundingBox } from "react-icons/bs";
import { statesAndLGAs } from "../assets/json-datas/State/LGAs.json";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import {
  createFamilyMember,
  getProfile,
} from "../features/UserFeature/UserAction";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

const initialFormData = {
  background: "",
  firstName: "",
  lastName: "",
  // email: "",
  DOB: "",
  phoneNumber: "",
  streetAddress: "",
  lga: "",
  state: "",
  kindred: "",
  village: "",
  autonomous: "",
  tribe: "",
  religion: "",
  profession: "",
  facebook: "",
  twitter: "",
  instagram: "",
  about: "",
  image: "",
  images: [],
  captions: [],
};

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { profile, loading, error } = useSelector((state) => state.person);
  const [formData, setFormData] = useState(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    return savedFormData || initialFormData;
  });
  const [hasToastBeenShown, setHasToastBeenShown] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews2, setImagePreviews2] = useState([]);

  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const userId = userInfo?.user._id || id;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          await dispatch(getProfile(userId)).unwrap();
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      // Set the form data with profile information
      setFormData((prevState) => ({
        ...prevState,
        ...profile,
        image: profile.image || prevState.image,
        images: Array.isArray(profile.images)
          ? profile.images
          : prevState.images,
        captions: profile.images
          ? profile.images.map((img) => img.caption || "")
          : prevState.captions,
      }));

      // Set the preview for the single image
      setImagePreview(profile.image ? `${backendURL}/${profile.image}` : null);

      // Set the previews for multiple images
      setImagePreviews2(
        Array.isArray(profile.images)
          ? profile.images.map((img) => `${backendURL}/${img.path}`)
          : []
      );
    }
  }, [profile]);
  // console.log(profile?.images, "profile images");

  useEffect(() => {
    if (!profile) {
      localStorage.removeItem("formData", JSON.stringify(formData));
    }
  }, [formData, profile]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange2 = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prevState) => ({
      ...prevState,
      images: files,
      captions: new Array(files.length).fill(""), // Initialize captions for new files
    }));
    setImagePreviews2(newImagePreviews);
  };

  const handleCaptionChange = (index, value) => {
    setFormData((prevState) => {
      const newCaptions = [...prevState.captions];
      newCaptions[index] = value;
      return { ...prevState, captions: newCaptions };
    });
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      state: value,
      lga: "",
    }));
  };

  const handleLGAChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      lga: value,
    }));
  };

  const checkProfileCompletion = () => {
    const {
      firstName,
      lastName,
      // email,
      DOB,
      phoneNumber,
      streetAddress,
      lga,
      state,
      kindred,
      village,
      autonomous,
      tribe,
      religion,
      profession,
      facebook,
      twitter,
      instagram,
      about,
      image,
      image2,
    } = formData;

    return (
      firstName &&
      lastName &&
      // email &&
      DOB &&
      phoneNumber &&
      streetAddress &&
      lga &&
      state &&
      kindred &&
      village &&
      autonomous &&
      tribe &&
      religion &&
      profession &&
      facebook &&
      twitter &&
      instagram &&
      about &&
      image &&
      image2
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => data.append("images", file));
      } else if (key === "captions") {
        formData.captions.forEach((caption, index) =>
          data.append(`captions[${index}]`, caption)
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await dispatch(
        createFamilyMember({
          memberType: "profile",
          formData: data,
        })
      ).unwrap();
      toast.success("Updated! 👍");
      dispatch(resetSuccess());
      dispatch(getProfile(userId)).unwrap();
    } catch (error) {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  const states = statesAndLGAs.map((state) => (
    <option key={state.id} value={state.id}>
      {state.name}
    </option>
  ));

  const selectedState = statesAndLGAs.find(
    (state) => state.id === formData.state
  );

  const lgas = selectedState
    ? selectedState.local_governments.map((lga) => (
        <option key={lga.id} value={lga.id}>
          {lga.name}
        </option>
      ))
    : [];

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      about: value,
    }));
  };

  useEffect(() => {
    if (!checkProfileCompletion() && !hasToastBeenShown) {
      toast.warning(
        "Incomplete profile! Please fill out all fields and upload images."
      );
      setHasToastBeenShown(true);
    }
  }, [formData, hasToastBeenShown]);

  useEffect(() => {
    if (checkProfileCompletion()) {
      setHasToastBeenShown(false);
    }
  }, [formData]);

  return (
    <>
      <section className="px-12">
        <form onSubmit={handleSubmit} className="mb-36">
          <div className="">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Please fiil all field as accurately as possible
              </p>
            </div>
            <div className="md:grid grid-cols-10">
              <div className=" col-span-3 md:pr-5">
                <div className="border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div
                      className="col-span-full 
                   mx-auto  text-center  items-center align-middle"
                    >
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center rounded-lg px-6 py-10">
                        <div className="relative text-center">
                          {imagePreview ? (
                            <>
                              <img
                                src={imagePreview}
                                alt="Image preview"
                                className="h-[15rem] w-[15rem] rounded-full object-cover"
                              />
                              <div
                                onClick={() =>
                                  document.getElementById("file-upload").click()
                                }
                                className="absolute bottom-0 right-4 cursor-pointer h-12 w-12 bg-white rounded-full flex justify-center items-center border-2 border-white"
                              >
                                <MdOutlineAddAPhoto
                                  aria-hidden="true"
                                  className="h-8 w-8 text-gray-500"
                                />
                              </div>
                            </>
                          ) : (
                            <div
                              onClick={() =>
                                document.getElementById("file-upload").click()
                              }
                              className="cursor-pointer h-40 w-40 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-full"
                            >
                              <BsPersonBoundingBox
                                aria-hidden="true"
                                className="h-12 w-12 text-gray-300"
                              />
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span className="hidden">Upload a file</span>
                                  <input
                                    ref={fileInputRef}
                                    id="file-upload"
                                    name="image"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <label
                        htmlFor="file-upload"
                        className=" hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                      >
                        Change
                        <input
                          id="file-upload"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {/* Multiple Images and Captions Upload */}
                    <div className="col-span-full text-center">
                      <label
                        htmlFor="file-upload2"
                        className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                      >
                        <div className="px-6 py-10">
                          {imagePreviews2.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                              {imagePreviews2.map((preview, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="h-[10rem] w-[15rem] rounded-sm object-cover"
                                  />
                                  <input
                                    type="text"
                                    placeholder={`Caption for image ${
                                      index + 1
                                    }`}
                                    value={formData.captions[index] || ""}
                                    onChange={(e) =>
                                      handleCaptionChange(index, e.target.value)
                                    }
                                    className="mt-2 w-full px-2 py-1 border border-gray-300 rounded"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-40 w-40 flex items-center border-2 border-dashed border-gray-300 rounded-full">
                              <MdOutlineAddAPhoto className="h-12 w-12 text-gray-300" />
                              <span>Upload Images</span>
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        id="file-upload2"
                        name="images"
                        type="file"
                        multiple
                        ref={fileInputRef2}
                        onChange={handleFileChange2}
                        className="sr-only"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-7">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your first name"
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black text-sm rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your last name"
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="px-3 py-2 text-sm  mb-4 sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Middle name
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your middlename"
                        id="middlename"
                        name="middlename"
                        type="text"
                        value={formData.middlename}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="phone number eg: +23480123456790"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="state"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      State Of Origin
                    </label>
                    <div className="mt-1">
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
                      >
                        <option value="">Select a state</option>
                        {states}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="state"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Local governmental Area.
                    </label>
                    <div className="mt-1">
                      <select
                        id="lga"
                        name="lga"
                        value={formData.lga}
                        onChange={handleLGAChange}
                        className="px-3 py-2 text-sm  mb-4 sm:mb-0 sm:mr-4 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
                      >
                        <option value="">Select an LGA</option>
                        {lgas}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="street-address"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Date of birth
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your date of birth"
                        id="DOB"
                        name="DOB"
                        type="date"
                        value={formData.DOB}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="street-address"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your current house address"
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Vilage
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your village"
                        id="village"
                        name="village"
                        type="text"
                        value={formData.village}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Autonomous Community
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your Autonomous Community"
                        id="autonomous"
                        name="autonomous"
                        type="text"
                        value={formData.autonomous}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Kindred
                    </label>
                    <div className="mt-1">
                      <input
                        placeholder="Enter your kindred"
                        id="kindred"
                        name="kindred"
                        type="text"
                        value={formData.kindred}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      />
                    </div>
                  </div>{" "}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="religion"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Religion
                    </label>
                    <div className="mt-1">
                      <select
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4  text-sm  sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
                      >
                        <option value="">Select a religion</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Islam">Islam</option>
                        <option value="Judaism">Judaism</option>
                        <option value="Other">Tradition</option>
                      </select>
                    </div>
                  </div>
                  {/* Tribe */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="religion"
                      className="block text-sm  leading-6 text-gray-900"
                    >
                      Tribe
                    </label>
                    <div className="mt-1">
                      <select
                        id="tribe"
                        name="tribe"
                        value={formData.tribe}
                        onChange={handleChange}
                        className="px-3 py-2 mb-4 sm:mb-0  text-sm sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                      >
                        <option value="">Select a tribe</option>
                        <option value="Igbo">Igbo</option>
                        <option value="Yoruba">Yoruba</option>
                        <option value="Hausa-Fulani">Hausa-Fulani</option>
                        <option value="Ijaw">Ijaw</option>
                        <option value="Kanuri">Kanuri</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional information */}
            <div className="sm:col-span-3 mb-3">
              <label
                htmlFor="email"
                className="block text-sm  leading-6 text-gray-900"
              >
                Profession
              </label>
              <div className="mt-1">
                <input
                  placeholder="Enter your profession"
                  id="profession"
                  name="profession"
                  type="text"
                  value={formData.profession}
                  onChange={handleChange}
                  className="px-3 py-2 mb-4 sm:mb-0 sm:mr-4 text-sm   md:min-w-[35%]  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="facebook"
                className="block text-sm  leading-6 text-gray-900"
              >
                Facebook
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="e.g https://www.facebook.com/username"
                  value={formData.facebook}
                  onChange={handleChange}
                  className="pl-9   md:min-w-[35%] text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFacebookF className="w-3 h-auto" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="twitter"
                className="block text-sm  leading-6 text-gray-900"
              >
                Twitter
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  placeholder="e.g https://www.x.com/username"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="pl-9  md:min-w-[35%]  text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaTwitter className="w-3 h-auto" />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="instagram"
                className="block text-sm  leading-6 text-gray-900"
              >
                Instagram
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="e.g https://www.instagram.com/username"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="pl-9  md:min-w-[35%] text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaInstagram className="w-3 h-auto" />
                </div>
              </div>
            </div>
            {/* Background */}
            <div className="col-span-full  mt-9">
              <label
                htmlFor="about"
                className="block text-sm  leading-6 text-gray-900"
              >
                Background
              </label>
              <div
                className="mt-1
            "
              >
                <ReactQuill
                  type="text"
                  name="about"
                  id="about"
                  value={formData.about}
                  onChange={handleQuillChange}
                  rows={5}
                  placeholder="Write a few sentences about your bbackground."
                  className="w-full h-36  mod:w-full py-2 mb-4 sm:mb-0  text-black  rounded-sm  placeholder-NavClr "
                />
              </div>
            </div>
          </div>

          <div className="mt-[5rem] flex justify-end gap-x-6">
            <button
              type="submit"
              className="bg-green text-white py-2 px-12 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? <Spinner /> : <>save</>}
            </button>
          </div>
          <div className="flex justify-end">
            {error && <Error>{error}</Error>}
          </div>
        </form>
      </section>
    </>
  );
}
