// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Spinner from "../../components/tools/Spinner";
// import { resetEditState } from "../../features/UserFeature/EditSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { resetDeleteState } from "../../features/UserFeature/deleteUserSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { RiImageAddFill } from "react-icons/ri";
// import { IoClose } from "react-icons/io5";
// import { AiTwotoneDelete } from "react-icons/ai";
// import { FaUserCircle } from "react-icons/fa";
// import { GrTreeOption } from "react-icons/gr";
// import {
//   fetchAllDetails,
//   deletePerson,
// } from "../../features/UserFeature/UserAction";
// import MaternalGrandmotherForm from "../../components/Forms/MaternalGrandmotherForm";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:8080";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxHeight: "90vh",
//   overflowY: "auto",
//   bgcolor: "white",
//   padding: "10",
//   borderRadius: "4px",
// };

// function ChildModal({ initialState, onSubmit, userId }) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.person);
//   const MGMData = useSelector((state) => state.person.MGM);
//   const { Eloading, Eerror, Esuccess } = useSelector(
//     (state) => state.edit.person
//   );
//   console.log(MGMData);

//   const handleSubmit = (formDataToSubmit) => {
//     onSubmit(formDataToSubmit);
//     handleClose();
//   };

//   useEffect(() => {
//     if (Esuccess) {
//       toast.success("Saved!!");
//       dispatch(resetEditState());
//       dispatch(fetchAllDetails(userId));
//     }
//   }, [Esuccess, dispatch, userId]);

//   return (
//     <React.Fragment>
//       <button
//         onClick={handleOpen}
//         className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white "
//       >
//         Edit
//       </button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 400 }}>
//           <Button onClick={handleClose}>
//             <IoClose size={24} className="text-red-500" />
//           </Button>
//           {loading ? (
//             <Spinner />
//           ) : (
//             <MaternalGrandmotherForm
//               initialState={MGMData}
//               isEdit={true}
//               onSubmit={handleSubmit}
//             />
//           )}
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

// export default ChildModal;

// export const MGMModal = React.forwardRef(({ userId }, ref3) => {
//   const [open, setOpen] = React.useState(false);
//   const dispatch = useDispatch();
//   const MGMData = useSelector((state) => state.person.MGM);
//   const userInfo = useSelector((state) => state.auth.user);
//   const { Dloading, Derror, Dsuccess } = useSelector(
//     (state) => state.delete.person
//   );
//   const LoggedId = userInfo?.id;

//   console.log(MGMData);
//   const [Deleteopen, setDeleteOpen] = React.useState(false);

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchAllDetails(userId));
//     }
//   }, [dispatch, userId]);

//   useEffect(() => {
//     console.log("MGMData", MGMData);
//   }, [MGMData]);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const DeleteOpen = () => {
//     setDeleteOpen(true);
//   };
//   const DeleteClose = () => {
//     setDeleteOpen(false);
//   };

//   useEffect(() => {
//     if (Dsuccess) {
//       // toast.success("Deleted!!");
//       dispatch(fetchAllDetails(userId));
//       dispatch(resetDeleteState());
//     }
//   }, [Dsuccess, dispatch, userId]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);

//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setImagePreview(fileURL);
//     }
//   };

//   const handleDelete = () => {
//     if (MGMData._id) {
//       dispatch(deletePerson(MGMData._id));
//       setOpen(false);
//     } else {
//       console.error("Invalid person ID");
//     }
//   };
//   const yearOfBirth = MGMData?.DOB ? MGMData.DOB.split("-")[0] : "Unknown";

//   const yearOfDeath = MGMData?.yearDeceased
//     ? MGMData.yearDeceased.split("-")[0]
//     : "Unknown";

//   React.useImperativeHandle(ref3, () => ({
//     openModal: handleOpen,
//   }));

//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };
//   return (
//     <div className="hidden">
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box sx={{ ...style, width: 400 }}>
//           {MGMData && Object.keys(MGMData).length > 0 ? (
//             <div className="w-full max-w-sm bg-white  rounded-lg shadow   relative">
//               {LoggedId === userId ? (
//                 <div className="flex justify-end px-4 pt-4">
//                   <button
//                     id="dropdownButton"
//                     onClick={toggleDropdown}
//                     className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-200 rounded-lg text-sm p-1.5"
//                     type="button"
//                   >
//                     <span className="sr-only">Open dropdown</span>
//                     <svg
//                       className="w-5 h-5 text-black hover:text-white"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 16 3"
//                     >
//                       <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                     </svg>
//                   </button>
//                   {/* Dropdown menu */}
//                   {isDropdownOpen && (
//                     <div
//                       id="dropdown"
//                       className="absolute top-12 right-0 z-10 text-base list-none divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-500"
//                     >
//                       <ul className="py-2">
//                         <li>
//                           <ChildModal
//                             initialState={MGMData}
//                             onSubmit={(data) => {
//                               dispatch(fetchAllDetails(userId));
//                             }}
//                             userId={userId}
//                           />
//                         </li>

//                         {/* DELETING MODAL STARTS HERE */}
//                         <Button>
//                           <React.Fragment>
//                             <a
//                               onClick={DeleteOpen}
//                               href="#"
//                               className="block px-2 lowercase py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                             >
//                               Delete
//                             </a>
//                             {/* </Button> */}
//                             <Dialog
//                               open={Deleteopen}
//                               onClose={DeleteClose}
//                               aria-labelledby="alert-dialog-title"
//                               aria-describedby="alert-dialog-description"
//                             >
//                               <DialogTitle id="alert-dialog-title">
//                                 Are you sure you want to delete this item?
//                               </DialogTitle>
//                               <DialogContent>
//                                 <DialogContentText id="alert-dialog-description">
//                                   Confirm delete or cancel
//                                 </DialogContentText>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={DeleteClose}>
//                                   <IoClose size={24} className="text-red-500" />
//                                 </Button>
//                                 <Button onClick={handleDelete}>
//                                   <AiTwotoneDelete
//                                     size={24}
//                                     className="text-red-300"
//                                   />
//                                 </Button>
//                               </DialogActions>
//                             </Dialog>
//                           </React.Fragment>
//                         </Button>
//                         {/* // DELETING MODAL ENDS HERE */}
//                         <li>
//                           <a
//                             onClick={toggleDropdown}
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
//                           >
//                             Close
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="my-5 flex justify-end text-end mx-3">
//                   <GrTreeOption size={24} className="text-green" />
//                 </div>
//               )}
//               <div className="flex flex-col items-center pb-10">
//                 {MGMData.image ? (
//                   <img
//                     src={`${backendURL}/${
//                       MGMData.image
//                     }?${new Date().getTime()}`}
//                     alt={MGMData.firstName}
//                     className="w-[10rem] h-[10rem] rounded-full"
//                   />
//                 ) : (
//                   <FaUserCircle className="w-[10rem] h-[10rem] text-gray-400" />
//                 )}
//                 <h5 className="mb-1 text-xl font-medium text-gray-500 ">
//                   {MGMData.firstName} {MGMData.lastName}
//                 </h5>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {MGMData.Lstatus !== "Deceased" ? (
//                     <>
//                       Born on:
//                       <span className="mx-2 font-medium">{yearOfBirth}</span>
//                     </>
//                   ) : null}
//                 </span>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {MGMData.placesLived ? (
//                     <>
//                       Place lived:
//                       <span className="mx-2 font-medium">
//                         {MGMData.placesLived}
//                       </span>
//                     </>
//                   ) : null}
//                 </span>

//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {MGMData.Lstatus}
//                 </span>
//                 <span className="text-sm mt-1 text-gray-500 dark:text-gray-400">
//                   {MGMData.Lstatus === "Deceased" ? (
//                     <>
//                       {yearOfBirth} to {yearOfDeath}
//                     </>
//                   ) : null}
//                 </span>

//                 <div className="flex mt-4 md:mt-6 gap-5">
//                   <a
//                     href="#"
//                     className="inline-flex items-center px-4 py-1 text-sm font-medium text-center bg-white text-green border border-green focus:ring-2 rounded-xl focus:outline-none focus:ring-green "
//                   >
//                     Search
//                   </a>
//                   <a
//                     href="#"
//                     className="inline-flex items-center px-4 py-1 text-sm font-medium text-center bg-white text-green border border-green focus:ring-2 rounded-xl focus:outline-none focus:ring-green "
//                   >
//                     Profile
//                   </a>
//                 </div>
//               </div>
//               ;
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full">
//               <div className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <h2 className="text-lg font-bold mb-2">
//                   No Info for this Card
//                 </h2>
//                 <p className="mb-4">Please add information to this card.</p>
//                 <Button
//                   href={`/layout/maternalGrandmother-form/${userId}`}
//                   className="!bg-green !text-white"
//                 >
//                   Add Info
//                 </Button>
//               </div>
//             </div>
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// });

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Spinner from "../../components/tools/Spinner";
import { resetEditState } from "../../features/UserFeature/EditSlice";
import { toast } from "react-toastify";
import { resetDeleteState } from "../../features/UserFeature/deleteUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiImageAddFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { GrTreeOption } from "react-icons/gr";
import {
  fetchAllDetails,
  deletePerson,
  editPerson,
} from "../../features/UserFeature/UserAction";
import MaternalGrandmotherForm from "../../components/Forms/MaternalGrandmotherForm";
import { invalidateCache } from "../../features/UserFeature/UserSlice";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8080";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "white",
  padding: "10",
  borderRadius: "4px",
};

function ChildModal({ initialState, onSubmit, userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.person);
  const { Eloading, Eerror, Esuccess } = useSelector(
    (state) => state.edit.person
  );

  const personState = useSelector((state) => state.form);

  const {
    fetchDetails: {
      data: { mGMother: MGMData = {} },
    },
  } = personState;

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSubmit = useCallback(
    (formDataToSubmit) => {
      onSubmit(formDataToSubmit);
      handleClose();
    },
    [onSubmit, handleClose]
  );

  useEffect(() => {
    if (Esuccess) {
      toast.success("Saved!!");
      dispatch(invalidateCache());
      dispatch(fetchAllDetails(userId));
      dispatch(resetEditState());
      handleClose();
    }
  }, [Esuccess, dispatch, userId]);

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        className="w-full text-left hover:bg-gray-100"
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ ...style, width: 400 }}>
          <Button
            onClick={handleClose}
            sx={{ position: "", top: "8px", right: "8px" }}
          >
            <IoClose size={24} className="text-red-500" />
          </Button>
          {loading ? (
            <Spinner />
          ) : (
            <MaternalGrandmotherForm
              initialState={MGMData}
              isEdit={true}
              onSubmit={handleSubmit}
            />
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ChildModal;

export const MGMModal = React.forwardRef(({ userId }, ref3) => {
  const CACHE_TIME = 30 * 60 * 1000; // 30 minutes
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { Dloading, Derror, Dsuccess } = useSelector(
    (state) => state.delete.person
  );
  const {
    data: allData,
    lastFetched,
    loading,
  } = useSelector((state) => state.form.fetchDetails);
  const userInfo = useSelector((state) => state.auth.user);
  const LoggedId = userInfo?.id;

  const MGMData = allData?.mGMother;

  const shouldFetchData = useCallback(() => {
    if (!lastFetched) return true;
    return Date.now() - lastFetched > CACHE_TIME;
  }, [lastFetched]);

  useEffect(() => {
    if (open && userId && shouldFetchData()) {
      dispatch(fetchAllDetails(userId));
    }
  }, [dispatch, userId, shouldFetchData, open]);

  useEffect(() => {
    if (Dsuccess) {
      toast.success("Deleted!");
      dispatch(resetDeleteState());
      dispatch(invalidateCache());
      dispatch(fetchAllDetails(userId));
    }
  }, [Dsuccess, dispatch, userId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleDelete = () => {
    if (MGMData?._id) {
      dispatch(deletePerson(MGMData._id));
      setDeleteOpen(false);
      setOpen(false);
    } else {
      console.error("Invalid person ID");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !MGMData?._id) return;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("personId", MGMData._id);

    try {
      await dispatch(editPerson(formData));
      toast.success("Image uploaded successfully!");
      setImagePreview(null);
      setSelectedFile(null);
      dispatch(invalidateCache());
      dispatch(fetchAllDetails(userId));
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  React.useImperativeHandle(ref3, () => ({
    openModal: handleOpen,
  }));

  const yearOfBirth = MGMData?.DOB ? MGMData.DOB.split("-")[0] : "Unknown";
  const yearOfDeath = MGMData?.yearDeceased
    ? MGMData.yearDeceased.split("-")[0]
    : "Unknown";

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="father-modal-title"
        aria-describedby="father-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {MGMData ? (
            <div className="w-full max-w-sm bg-white  rounded-lg    relative">
              {LoggedId === userId ? (
                <div className="absolute top-0 right-0">
                  <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-200 rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                      className="w-5 h-5 text-black hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <ChildModal
                        initialState={MGMData}
                        onSubmit={() => {
                          dispatch(invalidateCache());
                          dispatch(fetchAllDetails(userId));
                        }}
                        userId={userId}
                      />
                      <Button
                        onClick={() => setDeleteOpen(true)}
                        className="w-full text-left text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={toggleDropdown}
                        className="w-full text-left hover:bg-gray-100"
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="my-5 flex justify-end text-end mx-3">
                  <GrTreeOption size={24} className="text-green" />
                </div>
              )}

              <div className="flex flex-col items-center">
                {MGMData.image ? (
                  <img
                    src={`${backendURL}/${MGMData.image}?${Date.now()}`}
                    alt={MGMData.firstName}
                    className="w-40 h-40 rounded-full mb-4"
                  />
                ) : (
                  <FaUserCircle className="w-40 h-40 text-gray-400 mb-4" />
                )}
                <h2 className="text-xl font-medium text-gray-800 mb-2">
                  {MGMData.firstName} {MGMData.lastName}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  {MGMData.Lstatus !== "Deceased"
                    ? `Born: ${yearOfBirth}`
                    : `${yearOfBirth} - ${yearOfDeath}`}
                </p>
                {MGMData.placesLived && (
                  <p className="text-sm text-gray-500 mb-1">
                    Place lived: {MGMData.placesLived}
                  </p>
                )}
                <p className="text-sm text-gray-500 mb-4">{MGMData.Lstatus}</p>
                <div className="flex gap-4">
                  <Button variant="outlined" color="primary">
                    Search
                  </Button>
                  <Button variant="outlined" color="primary">
                    Profile
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-lg font-bold mb-2">No Info for this Card</h2>
              <p className="mb-4">Please add information to this card.</p>
              <Button
                href={`/layout/maternalGrandfather-form/${userId}`}
                variant="contained"
                color="primary"
              >
                Add Info
              </Button>
            </div>
          )}
        </Box>
      </Modal>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm delete or cancel</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteOpen(false)}
            startIcon={<IoClose />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            startIcon={<AiTwotoneDelete />}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
