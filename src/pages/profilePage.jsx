// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Error from "../components/tools/Error";
// import Spinner from "../components/tools/Spinner";
// import { resetSuccess } from "../features/UserFeature/UserSlice";
// import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import { BsPersonBoundingBox } from "react-icons/bs";
// import { statesAndLGAs } from "../assets/json-datas/State/LGAs.json";
// import { FaTwitter } from "react-icons/fa6";
// import { FaFacebookF } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { MdOutlineAddAPhoto } from "react-icons/md";
// import {
//   createFamilyMember,
//   getProfile,
// } from "../features/UserFeature/UserAction";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:8080";

// const initialFormData = {
//   background: "",
//   firstName: "",
//   lastName: "",
//   // email: "",
//   DOB: "",
//   phoneNumber: "",
//   streetAddress: "",
//   lga: "",
//   state: "",
//   kindred: "",
//   village: "",
//   autonomous: "",
//   tribe: "",
//   religion: "",
//   profession: "",
//   facebook: "",
//   twitter: "",
//   instagram: "",
//   about: "",
//   image: "",
//   images: [],
//   captions: [],
// };

// export default function Profile() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { profile, loading, error } = useSelector((state) => state.person);
//   const [formData, setFormData] = useState(() => {
//     const savedFormData = JSON.parse(localStorage.getItem("formData"));
//     return savedFormData || initialFormData;
//   });
//   const [hasToastBeenShown, setHasToastBeenShown] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imagePreviews2, setImagePreviews2] = useState([]);

//   const fileInputRef = useRef(null);
//   const fileInputRef2 = useRef(null);

//   const userId = userInfo?.user._id || id;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (userId) {
//         try {
//           await dispatch(getProfile(userId)).unwrap();
//         } catch (error) {
//           console.error("Failed to fetch profile data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (profile) {
//       // Set the form data with profile information
//       setFormData((prevState) => ({
//         ...prevState,
//         ...profile,
//         image: profile.image || prevState.image,
//         images: Array.isArray(profile.images)
//           ? profile.images
//           : prevState.images,
//         captions: profile.images
//           ? profile.images.map((img) => img.caption || "")
//           : prevState.captions,
//       }));

//       // Set the preview for the single image
//       setImagePreview(profile.image ? `${backendURL}/${profile.image}` : null);

//       // Set the previews for multiple images
//       setImagePreviews2(
//         Array.isArray(profile.images)
//           ? profile.images.map((img) => `${backendURL}/${img.path}`)
//           : []
//       );
//     }
//   }, [profile]);
//   // console.log(profile?.images, "profile images");

//   useEffect(() => {
//     if (!profile) {
//       localStorage.removeItem("formData", JSON.stringify(formData));
//     }
//   }, [formData, profile]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevState) => ({
//       ...prevState,
//       image: file,
//     }));
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleFileChange2 = (e) => {
//     const files = Array.from(e.target.files);
//     const newImagePreviews = files.map((file) => URL.createObjectURL(file));
//     setFormData((prevState) => ({
//       ...prevState,
//       images: files,
//       captions: new Array(files.length).fill(""), // Initialize captions for new files
//     }));
//     setImagePreviews2(newImagePreviews);
//   };

//   const handleCaptionChange = (index, value) => {
//     setFormData((prevState) => {
//       const newCaptions = [...prevState.captions];
//       newCaptions[index] = value;
//       return { ...prevState, captions: newCaptions };
//     });
//   };

// const handleStateChange = (e) => {
//   const { value } = e.target;
//   setFormData((prevState) => ({
//     ...prevState,
//     state: value,
//     lga: "",
//   }));
// };

// const handleLGAChange = (e) => {
//   const { value } = e.target;
//   setFormData((prevState) => ({
//     ...prevState,
//     lga: value,
//   }));
// };

//   const checkProfileCompletion = () => {
//     const {
//       firstName,
//       lastName,
//       // email,
//       DOB,
//       phoneNumber,
//       streetAddress,
//       lga,
//       state,
//       kindred,
//       village,
//       autonomous,
//       tribe,
//       religion,
//       profession,
//       facebook,
//       twitter,
//       instagram,
//       about,
//       image,
//       image2,
//     } = formData;

//     return (
//       firstName &&
//       lastName &&
//       // email &&
//       DOB &&
//       phoneNumber &&
//       streetAddress &&
//       lga &&
//       state &&
//       kindred &&
//       village &&
//       autonomous &&
//       tribe &&
//       religion &&
//       profession &&
//       facebook &&
//       twitter &&
//       instagram &&
//       about &&
//       image &&
//       image2
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "images") {
//         formData.images.forEach((file) => data.append("images", file));
//       } else if (key === "captions") {
//         formData.captions.forEach((caption, index) =>
//           data.append(`captions[${index}]`, caption)
//         );
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       await dispatch(
//         createFamilyMember({
//           memberType: "profile",
//           formData: data,
//         })
//       ).unwrap();
//       toast.success("Updated! 👍");
//       dispatch(resetSuccess());
//       dispatch(getProfile(userId)).unwrap();
//     } catch (error) {
//       toast.error("Failed to create profile. Please try again.");
//     }
//   };

// const states = statesAndLGAs.map((state) => (
//   <option key={state.id} value={state.id}>
//     {state.name}
//   </option>
// ));

//   const selectedState = statesAndLGAs.find(
//     (state) => state.id === formData.state
//   );

//   const lgas = selectedState
//     ? selectedState.local_governments.map((lga) => (
//         <option key={lga.id} value={lga.id}>
//           {lga.name}
//         </option>
//       ))
//     : [];

//   const handleQuillChange = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       about: value,
//     }));
//   };

//   useEffect(() => {
//     if (!checkProfileCompletion() && !hasToastBeenShown) {
//       toast.warning(
//         "Incomplete profile! Please fill out all fields and upload images."
//       );
//       setHasToastBeenShown(true);
//     }
//   }, [formData, hasToastBeenShown]);

//   useEffect(() => {
//     if (checkProfileCompletion()) {
//       setHasToastBeenShown(false);
//     }
//   }, [formData]);

//   return (
//     <>
//       <section className="px-12">
//         <form onSubmit={handleSubmit} className="mb-36">
//           <div className="">
//             <div className="border-b border-gray-900/10 pb-12">
//               <h2 className="text-base font-semibold leading-7 text-gray-900">
//                 Personal Information
//               </h2>
//               <p className="mt-1 text-sm leading-6 text-gray-600">
//                 Please fiil all field as accurately as possible
//               </p>
//             </div>
//             <div className="md:grid grid-cols-10">
//               <div className=" col-span-3 md:pr-5">
//                 <div className="border-gray-900/10 pb-12">
//                   <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                     <div
//                       className="col-span-full
//                    mx-auto  text-center  items-center align-middle"
//                     >
//                       <label
//                         htmlFor="cover-photo"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         Cover photo
//                       </label>
//                       <div className="mt-1 flex justify-center rounded-lg px-6 py-10">
//                         <div className="relative text-center">
//                           {imagePreview ? (
//                             <>
//                               <img
//                                 src={imagePreview}
//                                 alt="Image preview"
//                                 className="h-[15rem] w-[15rem] rounded-full object-cover"
//                               />
//                               <div
//                                 onClick={() =>
//                                   document.getElementById("file-upload").click()
//                                 }
//                                 className="absolute bottom-0 right-4 cursor-pointer h-12 w-12 bg-white rounded-full flex justify-center items-center border-2 border-white"
//                               >
//                                 <MdOutlineAddAPhoto
//                                   aria-hidden="true"
//                                   className="h-8 w-8 text-gray-500"
//                                 />
//                               </div>
//                             </>
//                           ) : (
//                             <div
//                               onClick={() =>
//                                 document.getElementById("file-upload").click()
//                               }
//                               className="cursor-pointer h-40 w-40 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-full"
//                             >
//                               <BsPersonBoundingBox
//                                 aria-hidden="true"
//                                 className="h-12 w-12 text-gray-300"
//                               />
//                               <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                                 <label
//                                   htmlFor="file-upload"
//                                   className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                                 >
//                                   <span className="hidden">Upload a file</span>
//                                   <input
//                                     ref={fileInputRef}
//                                     id="file-upload"
//                                     name="image"
//                                     type="file"
//                                     className="sr-only"
//                                     onChange={handleFileChange}
//                                   />
//                                 </label>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <label
//                         htmlFor="file-upload"
//                         className=" hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
//                       >
//                         Change
//                         <input
//                           id="file-upload"
//                           name="image"
//                           type="file"
//                           className="sr-only"
//                           onChange={handleFileChange}
//                         />
//                       </label>
//                     </div>
//                     {/* Multiple Images and Captions Upload */}
//                     <div className="col-span-full text-center">
//                       <label
//                         htmlFor="file-upload2"
//                         className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
//                       >
//                         <div className="px-6 py-10">
//                           {imagePreviews2.length > 0 ? (
//                             <div className="grid grid-cols-2 gap-4">
//                               {imagePreviews2.map((preview, index) => (
//                                 <div key={index} className="relative">
//                                   <img
//                                     src={preview}
//                                     alt={`Preview ${index + 1}`}
//                                     className="h-[10rem] w-[15rem] rounded-sm object-cover"
//                                   />
//                                   <input
//                                     type="text"
//                                     placeholder={`Caption for image ${
//                                       index + 1
//                                     }`}
//                                     value={formData.captions[index] || ""}
//                                     onChange={(e) =>
//                                       handleCaptionChange(index, e.target.value)
//                                     }
//                                     className="mt-2 w-full px-2 py-1 border border-gray-300 rounded"
//                                   />
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="h-40 w-40 flex items-center border-2 border-dashed border-gray-300 rounded-full">
//                               <MdOutlineAddAPhoto className="h-12 w-12 text-gray-300" />
//                               <span>Upload Images</span>
//                             </div>
//                           )}
//                         </div>
//                       </label>
//                       <input
//                         id="file-upload2"
//                         name="images"
//                         type="file"
//                         multiple
//                         ref={fileInputRef2}
//                         onChange={handleFileChange2}
//                         className="sr-only"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className=" col-span-7">
//                 <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="first-name"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       First name
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your first name"
//                         id="firstName"
//                         name="firstName"
//                         type="text"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black text-sm rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="last-name"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Last name
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your last name"
//                         id="lastName"
//                         name="lastName"
//                         type="text"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         className="px-3 py-2 text-sm  mb-4 sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Middle name
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your middlename"
//                         id="middlename"
//                         name="middlename"
//                         type="text"
//                         value={formData.middlename}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="email"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Phone Number
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="phone number eg: +23480123456790"
//                         id="phoneNumber"
//                         name="phoneNumber"
//                         type="text"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="state"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       State Of Origin
//                     </label>
//                     <div className="mt-1">
//                       <select
//                         id="state"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleStateChange}
//                         className="px-3 py-2 mb-4 text-sm  sm:mb-0 sm:mr-4 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
//                       >
//                         <option value="">Select a state</option>
//                         {states}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="state"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Local governmental Area.
//                     </label>
//                     <div className="mt-1">
//                       <select
//                         id="lga"
//                         name="lga"
//                         value={formData.lga}
//                         onChange={handleLGAChange}
//                         className="px-3 py-2 text-sm  mb-4 sm:mb-0 sm:mr-4 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
//                       >
//                         <option value="">Select an LGA</option>
//                         {lgas}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="street-address"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Date of birth
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your date of birth"
//                         id="DOB"
//                         name="DOB"
//                         type="date"
//                         value={formData.DOB}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="street-address"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Street address
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your current house address"
//                         id="streetAddress"
//                         name="streetAddress"
//                         type="text"
//                         value={formData.streetAddress}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="postal-code"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Vilage
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your village"
//                         id="village"
//                         name="village"
//                         type="text"
//                         value={formData.village}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="postal-code"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Autonomous Community
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your Autonomous Community"
//                         id="autonomous"
//                         name="autonomous"
//                         type="text"
//                         value={formData.autonomous}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="postal-code"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Kindred
//                     </label>
//                     <div className="mt-1">
//                       <input
//                         placeholder="Enter your kindred"
//                         id="kindred"
//                         name="kindred"
//                         type="text"
//                         value={formData.kindred}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0 text-sm  sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       />
//                     </div>
//                   </div>{" "}
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="religion"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Religion
//                     </label>
//                     <div className="mt-1">
//                       <select
//                         id="religion"
//                         name="religion"
//                         value={formData.religion}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4  text-sm  sm:mb-0 w-full focus:outline-none focus:ring-2 focus:ring-green text-black rounded-sm ring-1 ring-gray-200"
//                       >
//                         <option value="">Select a religion</option>
//                         <option value="Christianity">Christianity</option>
//                         <option value="Islam">Islam</option>
//                         <option value="Judaism">Judaism</option>
//                         <option value="Other">Tradition</option>
//                       </select>
//                     </div>
//                   </div>
//                   {/* Tribe */}
//                   <div className="sm:col-span-3">
//                     <label
//                       htmlFor="religion"
//                       className="block text-sm  leading-6 text-gray-900"
//                     >
//                       Tribe
//                     </label>
//                     <div className="mt-1">
//                       <select
//                         id="tribe"
//                         name="tribe"
//                         value={formData.tribe}
//                         onChange={handleChange}
//                         className="px-3 py-2 mb-4 sm:mb-0  text-sm sm:mr-4 w-full  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                       >
//                         <option value="">Select a tribe</option>
//                         <option value="Igbo">Igbo</option>
//                         <option value="Yoruba">Yoruba</option>
//                         <option value="Hausa-Fulani">Hausa-Fulani</option>
//                         <option value="Ijaw">Ijaw</option>
//                         <option value="Kanuri">Kanuri</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Additional information */}
//             <div className="sm:col-span-3 mb-3">
//               <label
//                 htmlFor="email"
//                 className="block text-sm  leading-6 text-gray-900"
//               >
//                 Profession
//               </label>
//               <div className="mt-1">
//                 <input
//                   placeholder="Enter your profession"
//                   id="profession"
//                   name="profession"
//                   type="text"
//                   value={formData.profession}
//                   onChange={handleChange}
//                   className="px-3 py-2 mb-4 sm:mb-0 sm:mr-4 text-sm   md:min-w-[35%]  focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <label
//                 htmlFor="facebook"
//                 className="block text-sm  leading-6 text-gray-900"
//               >
//                 Facebook
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type="text"
//                   name="facebook"
//                   id="facebook"
//                   placeholder="e.g https://www.facebook.com/username"
//                   value={formData.facebook}
//                   onChange={handleChange}
//                   className="pl-9   md:min-w-[35%] text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaFacebookF className="w-3 h-auto" />
//                 </div>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label
//                 htmlFor="twitter"
//                 className="block text-sm  leading-6 text-gray-900"
//               >
//                 Twitter
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type="text"
//                   name="twitter"
//                   id="twitter"
//                   placeholder="e.g https://www.x.com/username"
//                   value={formData.twitter}
//                   onChange={handleChange}
//                   className="pl-9  md:min-w-[35%]  text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaTwitter className="w-3 h-auto" />
//                 </div>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label
//                 htmlFor="instagram"
//                 className="block text-sm  leading-6 text-gray-900"
//               >
//                 Instagram
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type="text"
//                   name="instagram"
//                   id="instagram"
//                   placeholder="e.g https://www.instagram.com/username"
//                   value={formData.instagram}
//                   onChange={handleChange}
//                   className="pl-9  md:min-w-[35%] text-sm  mod:w-full py-2 mb-4 sm:mb-0 sm:mr-4   focus:outline-none focus:ring-2 focus:ring-green text-black  rounded-sm  ring-1 ring-gray-200 "
//                 />
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaInstagram className="w-3 h-auto" />
//                 </div>
//               </div>
//             </div>
//             {/* Background */}
//             <div className="col-span-full  mt-9">
//               <label
//                 htmlFor="about"
//                 className="block text-sm  leading-6 text-gray-900"
//               >
//                 Background
//               </label>
//               <div
//                 className="mt-1
//             "
//               >
//                 <ReactQuill
//                   type="text"
//                   name="about"
//                   id="about"
//                   value={formData.about}
//                   onChange={handleQuillChange}
//                   rows={5}
//                   placeholder="Write a few sentences about your bbackground."
//                   className="w-full h-36  mod:w-full py-2 mb-4 sm:mb-0  text-black  rounded-sm  placeholder-NavClr "
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mt-[5rem] flex justify-end gap-x-6">
//             <button
//               type="submit"
//               className="bg-green text-white py-2 px-12 rounded-2xl transition ease-in-out duration-200 transform hover:scale-105"
//               disabled={loading}
//             >
//               {loading ? <Spinner /> : <>save</>}
//             </button>
//           </div>
//           <div className="flex justify-end">
//             {error && <Error>{error}</Error>}
//           </div>
//         </form>
//       </section>
//     </>
//   );
//   }

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useDispatch, useSelector } from "react-redux";
// import { resetSuccess } from "../features/UserFeature/UserSlice";
// import { statesAndLGAs } from "../assets/json-datas/State/LGAs.json";
// import {
//   createFamilyMember,
//   getProfile,
// } from "../features/UserFeature/UserAction";
// import Spinner from "../components/tools/Spinner";

// // MUI imports
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Box,
//   Avatar,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Snackbar,
//   Alert,
//   Paper,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
// } from "@mui/material";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import DeleteIcon from "@mui/icons-material/Delete";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:8080";
// const initialFormData = {
//   background: "",
//   firstName: "",
//   lastName: "",
//   DOB: "",
//   phoneNumber: "",
//   streetAddress: "",
//   lga: "",
//   state: "",
//   kindred: "",
//   village: "",
//   autonomous: "",
//   tribe: "",
//   religion: "",
//   profession: "",
//   facebook: "",
//   twitter: "",
//   instagram: "",
//   about: "",
//   image: "",
//   images: [],
//   captions: [],
// };

// export default function Profile() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { userInfo } = useSelector((state) => state.auth);
//   const { profile, loading, error } = useSelector((state) => state.person);
//   const [formData, setFormData] = useState(() => {
//     const savedFormData = JSON.parse(localStorage.getItem("formData"));
//     return savedFormData || initialFormData;
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imagePreviews2, setImagePreviews2] = useState([]);
//   const [lgaOptions, setLgaOptions] = useState([]);

//   const fileInputRef = useRef(null);
//   const fileInputRef2 = useRef(null);

//   const userId = userInfo?.user._id || id;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (userId) {
//         try {
//           await dispatch(getProfile(userId)).unwrap();
//         } catch (error) {
//           console.error("Failed to fetch profile data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [dispatch, userId]);

//   useEffect(() => {
//     if (profile) {
//       setFormData((prevState) => ({
//         ...prevState,
//         ...profile,
//         image: profile.image || prevState.image,
//         images: Array.isArray(profile.images)
//           ? profile.images
//           : prevState.images,
//         captions: profile.images
//           ? profile.images.map((img) => img.caption || "")
//           : prevState.captions,
//       }));

//       setImagePreview(profile.image ? `${backendURL}/${profile.image}` : null);

//       setImagePreviews2(
//         Array.isArray(profile.images)
//           ? profile.images.map((img) => `${backendURL}/${img.path}`)
//           : []
//       );
//     }
//   }, [profile]);

//   useEffect(() => {
//     if (!profile) {
//       localStorage.removeItem("formData", JSON.stringify(formData));
//     }
//   }, [formData, profile]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevState) => ({
//       ...prevState,
//       image: file,
//     }));
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleDeleteImage = async (index) => {
//     const token = localStorage.getItem("userToken");
//     try {
//       const response = await fetch(`${backendURL}/api/family-image/${index}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`, // Ensure you're sending the auth token
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete image");
//       }

//       // If deletion was successful, update local state
//       setFormData((prevState) => {
//         const newImages = [...prevState.images];
//         const newCaptions = [...prevState.captions];
//         newImages.splice(index, 1);
//         newCaptions.splice(index, 1);
//         return { ...prevState, images: newImages, captions: newCaptions };
//       });
//       setImagePreviews2((prevPreviews) => {
//         const newPreviews = [...prevPreviews];
//         newPreviews.splice(index, 1);
//         return newPreviews;
//       });
//     } catch (error) {
//       console.error("Error deleting image:", error);
//       // Handle error (e.g., show an error message to the user)
//     }
//   };
//   const handleFileChange2 = (e) => {
//     const files = Array.from(e.target.files);
//     const newImagePreviews = files.map((file) => URL.createObjectURL(file));
//     setFormData((prevState) => ({
//       ...prevState,
//       images: files,
//       captions: new Array(files.length).fill(""),
//     }));
//     setImagePreviews2(newImagePreviews);
//   };

//   const handleCaptionChange = (index, value) => {
//     setFormData((prevState) => {
//       const newCaptions = [...prevState.captions];
//       newCaptions[index] = value;
//       return { ...prevState, captions: newCaptions };
//     });
//   };

//   const handleStateChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       state: value,
//       lga: "",
//     }));
//     // Update LGA options when state changes
//     const selectedState = statesAndLGAs.find((state) => state.name === value);
//     setLgaOptions(selectedState ? selectedState.local_governments : []);
//   };

//   const handleLGAChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       lga: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "images") {
//         formData.images.forEach((file) => data.append("images", file));
//       } else if (key === "captions") {
//         formData.captions.forEach((caption, index) =>
//           data.append(`captions[${index}]`, caption)
//         );
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       await dispatch(
//         createFamilyMember({
//           memberType: "profile",
//           formData: data,
//         })
//       ).unwrap();
//       setSnackbar({
//         open: true,
//         message: "Profile updated successfully!",
//         severity: "success",
//       });
//       dispatch(resetSuccess());
//       dispatch(getProfile(userId)).unwrap();
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: "Failed to update profile. Please try again.",
//         severity: "error",
//       });
//     }
//   };

//   const handleQuillChange = (value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       about: value,
//     }));
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={1} sx={{ p: 4 }}>
//         <Box sx={{ marginBottom: 5 }} className="mb-5">
//           <Typography variant="h4" gutterBottom>
//             Personal Information
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Please fill all fields as accurately as possible
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           {/* <Grid container spacing={4}> */}
//           {/* ... (keep other form fields) */}
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Box display="flex" flexDirection="column" alignItems="center">
//                 <Avatar
//                   src={imagePreview}
//                   sx={{ width: 150, height: 150, mb: 2 }}
//                 />
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   hidden
//                   onChange={handleFileChange}
//                 />
//                 <Button
//                   variant="contained"
//                   startIcon={<AddAPhotoIcon />}
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   Change Photo
//                 </Button>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={8}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="First Name"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Last Name"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Middle Name"
//                     name="middlename"
//                     value={formData.middlename}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>State of Origin</InputLabel>
//                     <Select
//                       name="state"
//                       value={formData.state}
//                       onChange={handleStateChange}
//                     >
//                       <MenuItem value="">Select a state</MenuItem>
//                       {statesAndLGAs.map((state) => (
//                         <MenuItem key={state.id} value={state.name}>
//                           {state.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Local Government Area</InputLabel>
//                     <Select
//                       name="lga"
//                       value={formData.lga}
//                       onChange={handleLGAChange}
//                     >
//                       <MenuItem value="">Select an LGA</MenuItem>
//                       {lgaOptions.map((lga) => (
//                         <MenuItem key={lga.id} value={lga.name}>
//                           {lga.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Date of Birth"
//                     name="DOB"
//                     type="date"
//                     value={formData.DOB}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Street Address"
//                     name="streetAddress"
//                     value={formData.streetAddress}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Village"
//                     name="village"
//                     value={formData.village}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Autonomous Community"
//                     name="autonomous"
//                     value={formData.autonomous}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Kindred"
//                     name="kindred"
//                     value={formData.kindred}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Religion</InputLabel>
//                     <Select
//                       name="religion"
//                       value={formData.religion}
//                       onChange={handleChange}
//                     >
//                       <MenuItem value="">Select a religion</MenuItem>
//                       <MenuItem value="Christianity">Christianity</MenuItem>
//                       <MenuItem value="Islam">Islam</MenuItem>
//                       <MenuItem value="Judaism">Judaism</MenuItem>
//                       <MenuItem value="Other">Tradition</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Tribe</InputLabel>
//                     <Select
//                       name="tribe"
//                       value={formData.tribe}
//                       onChange={handleChange}
//                     >
//                       <MenuItem value="">Select a tribe</MenuItem>
//                       <MenuItem value="Igbo">Igbo</MenuItem>
//                       <MenuItem value="Yoruba">Yoruba</MenuItem>
//                       <MenuItem value="Hausa-Fulani">Hausa-Fulani</MenuItem>
//                       <MenuItem value="Ijaw">Ijaw</MenuItem>
//                       <MenuItem value="Kanuri">Kanuri</MenuItem>
//                       <MenuItem value="Other">Other</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Profession"
//                     name="profession"
//                     value={formData.profession}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Social Media
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     label="Facebook"
//                     name="facebook"
//                     value={formData.facebook}
//                     onChange={handleChange}
//                     InputProps={{
//                       startAdornment: <FacebookIcon />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     label="Twitter"
//                     name="twitter"
//                     value={formData.twitter}
//                     onChange={handleChange}
//                     InputProps={{
//                       startAdornment: <TwitterIcon />,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     fullWidth
//                     label="Instagram"
//                     name="instagram"
//                     value={formData.instagram}
//                     onChange={handleChange}
//                     InputProps={{
//                       startAdornment: <InstagramIcon />,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Background
//               </Typography>
//               <ReactQuill
//                 value={formData.about}
//                 onChange={handleQuillChange}
//                 style={{ height: "200px", marginBottom: "50px" }}
//               />
//             </Grid>
//           </Grid>

//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Family Pictures
//             </Typography>
//             <input
//               ref={fileInputRef2}
//               type="file"
//               hidden
//               multiple
//               onChange={handleFileChange2}
//             />
//             <Button
//               variant="contained"
//               startIcon={<AddAPhotoIcon />}
//               onClick={() => fileInputRef2.current.click()}
//             >
//               Add Family Pictures
//             </Button>
//             <ImageList sx={{ width: "100%", mt: 2 }} cols={3} rowHeight={200}>
//               {imagePreviews2.map((item, index) => (
//                 <ImageListItem key={index} sx={{ height: 280 }}>
//                   <img
//                     src={item}
//                     alt={`Family picture ${index + 1}`}
//                     loading="lazy"
//                     style={{ height: 200, objectFit: "cover" }}
//                   />
//                   <Box sx={{ p: 1 }}>
//                     <TextField
//                       fullWidth
//                       size="small"
//                       placeholder="Add caption"
//                       value={formData.captions[index] || ""}
//                       onChange={(e) =>
//                         handleCaptionChange(index, e.target.value)
//                       }
//                     />
//                     <IconButton
//                       sx={{ mt: 1, fontSize: 5 }}
//                       aria-label={`delete image ${index + 1}`}
//                       onClick={() => handleDeleteImage(index)}
//                     >
//                       <DeleteIcon size={12} />
//                     </IconButton>
//                   </Box>
//                 </ImageListItem>
//               ))}
//             </ImageList>
//           </Box>

//           <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </Box>
//         </form>
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccess } from "../features/UserFeature/UserSlice";
import { statesAndLGAs } from "../assets/json-datas/State/LGAs.json";
import {
  createFamilyMember,
  getProfile,
} from "../features/UserFeature/UserAction";
import Spinner from "../components/tools/Spinner";

// MUI imports
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import DeleteIcon from "@mui/icons-material/Delete";
import backendURL from "../config";

const initialFormData = {
  background: "",
  firstName: "",
  lastName: "",
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
  gender: "", // Added gender field
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews2, setImagePreviews2] = useState([]);
  const [lgaOptions, setLgaOptions] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

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
        gender: profile.gender || prevState.gender, // Added gender
      }));

      setImagePreview(profile.image ? `${backendURL}/${profile.image}` : null);

      setImagePreviews2(
        Array.isArray(profile.images)
          ? profile.images.map((img) => `${backendURL}/${img.path}`)
          : []
      );
    }
  }, [profile]);

  useEffect(() => {
    if (!profile) {
      localStorage.setItem("formData", JSON.stringify(formData));
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

  const handleDeleteImage = async (index) => {
    setImageToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteImage = async () => {
    const index = imageToDelete;
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch(`${backendURL}/api/family-image/${index}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      setFormData((prevState) => {
        const newImages = [...prevState.images];
        const newCaptions = [...prevState.captions];
        newImages.splice(index, 1);
        newCaptions.splice(index, 1);
        return { ...prevState, images: newImages, captions: newCaptions };
      });
      setImagePreviews2((prevPreviews) => {
        const newPreviews = [...prevPreviews];
        newPreviews.splice(index, 1);
        return newPreviews;
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete image. Please try again.",
        severity: "error",
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleFileChange2 = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
      captions: [...prevState.captions, ...new Array(files.length).fill("")],
    }));
    setImagePreviews2([...imagePreviews2, ...newImagePreviews]);
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
    const selectedState = statesAndLGAs.find((state) => state.name === value);
    setLgaOptions(selectedState ? selectedState.local_governments : []);
  };

  const handleLGAChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      lga: value,
    }));
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
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
      dispatch(resetSuccess());
      dispatch(getProfile(userId)).unwrap();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    }
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      about: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <Box sx={{ marginBottom: 5 }} className="mb-5">
          <Typography variant="h4" gutterBottom>
            Personal Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please fill all fields as accurately as possible
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  src={imagePreview}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  startIcon={<AddAPhotoIcon />}
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Photo
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middlename"
                    value={formData.middlename}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>State of Origin</InputLabel>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                    >
                      <MenuItem value="">Select a state</MenuItem>
                      {statesAndLGAs.map((state) => (
                        <MenuItem key={state.id} value={state.name}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Local Government Area</InputLabel>
                    <Select
                      name="lga"
                      value={formData.lga}
                      onChange={handleLGAChange}
                    >
                      <MenuItem value="">Select an LGA</MenuItem>
                      {lgaOptions.map((lga) => (
                        <MenuItem key={lga.id} value={lga.name}>
                          {lga.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="DOB"
                    type="date"
                    value={formData.DOB}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Village"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Autonomous Community"
                    name="autonomous"
                    value={formData.autonomous}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kindred"
                    name="kindred"
                    value={formData.kindred}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Religion</InputLabel>
                    <Select
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select a religion</MenuItem>
                      <MenuItem value="Christianity">Christianity</MenuItem>
                      <MenuItem value="Islam">Islam</MenuItem>
                      <MenuItem value="Judaism">Judaism</MenuItem>
                      <MenuItem value="Other">Tradition</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tribe</InputLabel>
                    <Select
                      name="tribe"
                      value={formData.tribe}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select a tribe</MenuItem>
                      <MenuItem value="Igbo">Igbo</MenuItem>
                      <MenuItem value="Yoruba">Yoruba</MenuItem>
                      <MenuItem value="Hausa-Fulani">Hausa-Fulani</MenuItem>
                      <MenuItem value="Ijaw">Ijaw</MenuItem>
                      <MenuItem value="Kanuri">Kanuri</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <FacebookIcon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <TwitterIcon />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InstagramIcon />,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Background
              </Typography>
              <ReactQuill
                value={formData.about}
                onChange={handleQuillChange}
                style={{ height: "200px", marginBottom: "50px" }}
              />
            </Grid>
          </Grid>

          {/* ... (keep other sections) */}

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Family Pictures
            </Typography>
            <input
              ref={fileInputRef2}
              type="file"
              hidden
              multiple
              onChange={handleFileChange2}
            />
            <Button
              variant="contained"
              startIcon={<AddAPhotoIcon />}
              onClick={() => fileInputRef2.current.click()}
              sx={{ mb: 2 }}
            >
              Add Family Pictures
            </Button>
            <Grid container spacing={2}>
              {imagePreviews2.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item}
                      alt={`Family picture ${index + 1}`}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add caption"
                        value={formData.captions[index] || ""}
                        onChange={(e) =>
                          handleCaptionChange(index, e.target.value)
                        }
                        variant="standard"
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteImage} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
