import React, { useState, useEffect, useRef } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import backgroundImage from "../../assets/images/backgroundImage.png";
import LayoutNAv from "../../components/layoutNAv";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createFamilyMember,
  editPerson,
  fetchAllDetails,
} from "../../features/UserFeature/UserAction";
import { resetSuccess, resetError } from "../../features/UserFeature/UserSlice";
import { resetEditState } from "../../features/UserFeature/EditSlice";
import { resetDeleteState } from "../../features/UserFeature/deleteUserSlice";
import { DirectionButton1 } from "../d-button";
import Error from "../../components/tools/Error";
import Spinner from "../../components/tools/Spinner";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAddAPhoto } from "react-icons/md";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

const PaternalGGMform = ({ initialState = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    firstName: initialState.firstName || "",
    lastName: initialState.lastName || "",
    Lstatus: initialState.Lstatus || "",
    DOB: initialState.DOB || "",
    yearDeceased: initialState.yearDeceased || "",
    placesLived: initialState.placesLived || "",
    image: null,
    imagePreview: initialState.image
      ? `${backendURL}/${initialState.image}`
      : null,
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { loading, error, success } = useSelector((state) => state.form.person);
  const { Eloading, Eerror, Esuccess } = useSelector(
    (state) => state.edit.person
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.DOB ||
      !formData.Lstatus
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formDataToSubmit = new FormData();
    if (isEdit && initialState._id) {
      formDataToSubmit.append("_id", initialState._id);
    }
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("Lstatus", formData.Lstatus);
    formDataToSubmit.append("DOB", formData.DOB);
    formDataToSubmit.append("yearDeceased", formData.yearDeceased);
    formDataToSubmit.append("placesLived", formData.placesLived);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    if (isEdit && initialState._id) {
      dispatch(
        editPerson({
          _id: initialState._id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          Lstatus: formData.Lstatus,
          DOB: formData.DOB,
          image: formData.image,
          yearDeceased: formData.yearDeceased,
          placesLived: formData.placesLived,
        })
      );

      dispatch(fetchAllDetails());
      dispatch(resetEditState());
    } else {
      dispatch(
        createFamilyMember({
          memberType: "paternalGrtGrandMother",
          formData: formDataToSubmit,
        })
      );
      dispatch(fetchAllDetails());
    }
  };

  const handleModalConfirm = () => {
    setFormData({
      ...formData,
      yearDeceased: formData.yearDeceased, // Ensure the yearDeceased is captured in formData
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLstatusChange = (status) => {
    setFormData({ ...formData, Lstatus: status });
    if (status === "Deceased") {
      setShowModal(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Created!!");
      dispatch(fetchAllDetails(userId));
      dispatch(resetSuccess());
      setTimeout(
        () => navigate(`/layout/maternalGGFather-form/${userId}`),
        2000
      );
    }

    if (error) {
      toast.error(error);
      dispatch(resetError());
      dispatch(fetchAllDetails(userId));
    }
  }, [success, error, dispatch, navigate, userId]);

  const formRef = useRef(); // Create a ref for the form
  const fileInputRef = useRef();

  return (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat h-full w-full Nlg:max-w-[40rem] Nlg:mx-auto"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-opacity-50 pointer-events-none"></div>
        <span className="w-full flex justify-center">
          <LayoutNAv />
        </span>
        <div className="relative p-8 flex flex-col items-center lg:items-start lg:flex-row">
          <form
            onSubmit={handleSubmit}
            ref={formRef} // Attach ref to form
            className="space-y-4 flex flex-col items-center lg:items-start w-full"
          >
            <div className="mb-5">
              <h3 className="text-2xl text-black mb-2">
                {isEdit
                  ? "Edit here"
                  : "Add Paternal Great Grand Mothers details"}
              </h3>
              <p className="text-sm">
                Provide details about your paternal great-grandmother. By adding
                this information, you’ll contribute to a more complete family
                tree, capturing the history of your father’s grandmother.
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-3 w-full justify-center lg:justify-start">
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleInputChange}
                value={formData.firstName}
                className="py-2 mt-1 block w-full lg:w-[66%] border-b-2 border-gray-500 focus:ring-green focus:border-green placeholder:text-gray-400 bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
                placeholder="Great Grand Mothers name"
              />
              <IoPersonCircleOutline size={28} className="mt-6" />
            </div>
            <div className="w-full flex justify-center lg:justify-start">
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleInputChange}
                value={formData.lastName}
                className="py-2 mt-1 block w-full lg:w-[70%] border-b-2 border-gray-500 focus:ring-green focus:border-green  placeholder:text-gray-400 bg-opacity-90 text-black placeholder-black sm:text-md focus:outline-none bg-transparent"
                placeholder="Great Grand Mothers last name"
              />
            </div>
            <div className="w-full flex justify-center lg:justify-start">
              <input
                type="text"
                id="placesLived"
                name="placesLived"
                onChange={handleInputChange}
                value={formData.placesLived}
                className="py-2 mt-1 block w-full lg:w-[70%] border-b-2 border-gray-500 focus:ring-green focus:border-green bg-opacity-90 text-black placeholder-gray-400 sm:text-md focus:outline-none bg-transparent"
                placeholder="Place lived e.g Ijebu"
              />
            </div>

            <div className="w-full flex flex-col items-center lg:items-start">
              <label
                htmlFor="gender"
                className="block text-sm font-bold text-black"
              >
                Gender
              </label>
              <div className="flex space-x-4 mt-1">
                <button
                  className="py-2 px-4 border-2 rounded-lg bg-transparent text-gray-400 border-gray-400 cursor-not-allowed"
                  type="button"
                  disabled
                >
                  Male
                </button>
                <button
                  type="button"
                  className="py-2 px-4 border-2 rounded-lg focus:outline-none bg-green text-white"
                >
                  Female
                </button>
              </div>
            </div>
            <div className="flex-col pt-3 pb-7 w-full flex justify-center lg:justify-start">
              <label
                htmlFor="DOB"
                className="block text-sm font-bold text-black"
              >
                DOB
              </label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                onChange={handleInputChange}
                value={formData.DOB}
                className="shadow px-3 mt-1 block w-full lg:w-[50%] py-3 rounded-xl focus:ring-green focus:border-green bg-opacity-90 bg-[#e7fae7] text-black placeholder-black sm:text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center w-full lg:w-[50%]">
              <input
                type="radio"
                id="Still-Living"
                name="Lstatus"
                value="Still-Living"
                checked={formData.Lstatus === "Still-Living"}
                onChange={() => handleLstatusChange("Still-Living")}
                className="h-4 w-4 text-green-600 focus:ring-green border-gray-300 rounded mr-2"
              />
              <label
                htmlFor="Still-Living"
                className="block text-sm text-black"
              >
                Still Living
              </label>
              <input
                type="radio"
                id="Deceased"
                name="Lstatus"
                value="Deceased"
                checked={formData.Lstatus === "Deceased"}
                onChange={() => handleLstatusChange("Deceased")}
                className="h-4 w-4 text-red-600 focus:ring-green border-gray-300 rounded ml-8 mr-2"
              />
              <label htmlFor="Deceased" className="block text-sm text-black">
                Deceased
              </label>
            </div>
            {isEdit ? (
              <div className="w-full flex justify-center lg:justify-start">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <MdOutlineAddAPhoto
                  size={28}
                  className="cursor-pointer"
                  onClick={() => fileInputRef.current.click()} // Trigger file input click
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>
            ) : (
              ""
            )}
            <div className="w-full flex justify-center lg:justify-start">
              <button
                type="submit"
                className="border border-green w-full lg:w-[70%] flex items-center bg-green-500 bg-white px-4 py-2 transition ease-in-out duration-200 transform hover:scale-105 rounded-3xl"
              >
                {loading || Eloading ? (
                  <Spinner />
                ) : (
                  <span className="mx-auto text-green">
                    {isEdit ? (
                      "Update"
                    ) : (
                      <>
                        <span className="flex items-center justify-center space-x-2">
                          <span>Click here to continue </span>
                          <DirectionButton1 />
                        </span>
                      </>
                    )}
                  </span>
                )}
              </button>
            </div>
            <div className="w-full items-center flex justify-start">
              {error && <Error>{error}</Error>}
              {Eerror && <Error>{Eerror}</Error>}
            </div>
            {/* Next button */}
            {isEdit ? (
              ""
            ) : (
              <div className="w-full text-end items-end flex justify-end">
                <Link
                  to={`/layout/maternalGGFather-form/${userId}`}
                  className="w-full flex justify-start font-medium"
                >
                  <button className="underline w-full flex items-center bg-green-500 px-4 py-2 transition ease-in-out duration-200 transform hover:scale-105 rounded-3xl">
                    Next form
                  </button>
                </Link>
              </div>
            )}
          </form>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">
                Please enter the year of death:
              </h3>
              <input
                id="yearDeceased"
                name="yearDeceased"
                type="number"
                placeholder="Year of Death"
                value={formData.yearDeceased}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalConfirm}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PaternalGGMform;
