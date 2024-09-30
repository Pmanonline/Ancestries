// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../components/context/AuthContext";
// import { useParams } from "react-router-dom";
// import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
// import { BsWhatsapp } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import FeedImage from "../../assets/images/feedImage.png";
// import { toast } from "react-toastify";
// import BirtdayFrame from "../../assets/images/birthdayFrame.png";
// import birthdayframeM1 from "../../assets/images/birthdayframeM1.png";
// import birthdayframeM2 from "../../assets/images/birthdayframeM2.png";
// import FamilyImage from "../../assets/images/FamilyImage.png";
// import { IoMdClose } from "react-icons/io";
// import noProfile from "../../assets/images/noProfile.png";
// import { DirectionButton2 } from "../../components/d-button";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProfile,
//   getAllProfiles,
// } from "../../features/UserFeature/UserAction";
// import { fetchConnections } from "../../features/connectionFeature/connectionAction";
// import { fetchStateDetails } from "../../features/Statefeature/stateAction";
// import moment from "moment";
// import Spinner from "../../components/tools/Spinner";
// import { calculateBirthdayCountdown } from "../../components/tools/birthdayCountdown";
// import { NameProfileCard } from "../../components/Cards/NameProfileCard";
// import SearchUsers from "../../components/tools/SearchUsers";
// import { RecentSearches } from "../../components/tools/SearchUsers";
// import { BsChatDots } from "react-icons/bs";
// import { IoIosLink } from "react-icons/io";
// import { IoIosClose } from "react-icons/io";
// import { ChatContext } from "../../components/context/chatContext";
// import { sendConnectionRequest } from "../../features/connectionFeature/connectionAction";

// const backendURL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:8080";

// function ChildFeed(chat) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [surname, setSurname] = useState("");
//   const [Loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReligionDescription, setSelectedReligionDescription] =
//     useState("");
//   const { potentialChats, CreateChat, onlineUsers } = useContext(ChatContext);
//   const { user } = useContext(AuthContext);
//   const chatuserId = user?.id;

//   const { profile, profiles, loading, error } = useSelector(
//     (state) => state.person
//   );
//   // Debugging output
//   const { userId } = useParams();

//   const { userChats, isUserChatsLoading, isUserChatsError, updateCurrentChat } =
//     useContext(ChatContext);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getProfile(userId));
//     }
//   }, [dispatch, userId]);

//   // Fetch all profiles
//   useEffect(() => {
//     dispatch(getAllProfiles());
//   }, [dispatch]);

//   // // If profile data is available, use its name for filtering profiles

// const relatedProfiles = profiles.filter(
//   (p) =>
//     (p.firstName === profile?.firstName ||
//       p.lastName === profile?.lastName) &&
//     p._id !== userId // Exclude the user whose id matches the id from params
// );

//   const { allStates, religions, tribes } = useSelector((state) => state.state);

//   if (error) {
//     console.error("Error fetching data:", error);
//   }

//   // Find the state based on the user's selected state
// const stateName = profile?.state;
// const ReligionNam = profile?.religion;
// const TribeName = profile?.tribe;
// console.log("Profile State:", stateName, ReligionNam, TribeName);

// // Format the state name to match the names in allStates
// const formattedStateName = stateName ? `${stateName} State` : "";
// console.log("Formatted State Name:", formattedStateName);

// // Find the state based on the formatted state name
// const userStateOfOrigin = allStates?.find(
//   (state) => state.name === formattedStateName
// );
// console.log("User State of Origin:", userStateOfOrigin);
// // Create the complete state name if needed

// // check and display religions details
// const ReligionDetails = religions?.find(
//   (state) => state.religionName === ReligionNam
// );

// // check and display tribes details
// const TribesDetails = tribes?.find((tribe) => tribe?.tribeName === TribeName);

//   useEffect(() => {
//     dispatch(fetchStateDetails()) // Fetch all states
//       .unwrap()
//       .then(() => setLoading(false))
//       .catch(() => setLoading(false));
//   }, [dispatch]);

//   const handleModalOpen = () => {
//     console.log("Opening modal...");
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     console.log("Closing modal...");
//     setIsModalOpen(false);
//   };
//   if (loading) {
//     return <Spinner />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!profile) {
//     return <div>No profile data available.</div>;
//   }

// const formattedDate = profile.DOB
//   ? moment(profile.DOB).format("DD MMMM YYYY")
//   : "Date not available";
//   const daysUntilBirthday = calculateBirthdayCountdown(formattedDate);

// const imageSrc = profile?.image
//   ? `${backendURL}/${profile.image}`
//   : noProfile;
//   const imageSrc2 = profile?.image2
//     ? `${backendURL}/${profile.image2}`
//     : noProfile; // Same logic for image2
// const getText = (html) => {
//   const doc = new DOMParser().parseFromString(html, "text/html");
//   return doc.body.textContent;
// };

//   const handleStartChat = async () => {
//     try {
//       if (user && profile._id) {
//         const chat = await CreateChat(userId, chatuserId); // Get chat object

//         if (chat) {
//           // Update current chat with the returned chat object
//           updateCurrentChat(chat, user, userChats);

//           navigate("/chatPage");
//         } else {
//           console.error("Chat creation failed, no chat object returned");
//         }
//       } else {
//         console.error("User or profile ID missing");
//       }
//     } catch (error) {
//       console.error("Error creating chat:", error);
//     }
//   };

//   return (
//     <section className="mx-auto px-4 py-8">
//       <h2 className="text-black mb-9 text-2xl md:text-xl font-bold uppercase font-Montserrat text-center ">
//         ABOUT {profile.lastName} {profile.firstName} {profile.middlename}
//       </h2>
//       <div className="lg:flex flex-row Nlg:mx-auto Nlg:flex-col Nlg:justify-center">
//         <div className="mb-6 lg:mr-6 lg:mb-0 lg:w-[45rem] mx-auto flex justify-center">
//           <img
//             src={imageSrc}
//             alt="Profile"
//             className="rounded-lg shadow-md w-[25rem] h-[25rem] object-cover"
//           />
//         </div>
//         <div className="w-full">
//           <div className="text-start text-black">
//             <h2 className="text-lg mb-2 px-6 first-letter:uppercase">
//               {profile.lastName} {profile.firstName} {profile.middlename}
//             </h2>
//           </div>
//           <div className="flex mb-2 px-6">
//             <div className="space-x-3">
//               <button className="bg-[#d9f8de] text-xs px-5 py-2  rounded-sm transition ease-in-out duration-200 transform hover:scale-105 ">
//                 <ConnectionButton onClick={handleModalOpen} />
//               </button>

//               <button className="bg-[#d9f8de] text-xs px-5 py-2  rounded-sm transition ease-in-out duration-200 transform hover:scale-105">
//                 <SendRequestButton />
//               </button>
//               <button className="bg-[#d9f8de] text-xs px-5 py-2 rounded-sm   transition ease-in-out duration-200 transform hover:scale-105">
//                 <StartChatButton
//                   chat={chat}
//                   user={user}
//                   onClick={handleStartChat}
//                 />
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row items-start mb-6 md:mb-0 mx-3 ml-7">
//             <div className="flex space-x-4 mt-2">
//               <a
//                 href={profile.twitter}
//                 target="_blank"
//                 aria-label="twitter"
//                 rel="noopener noreferrer"
//               >
//                 <FaTwitter className="w-4 h-auto text-[#A60505]" />
//               </a>
//               <a
//                 href={`https://wa.me/${profile.phoneNumber}`}
//                 target="_blank"
//                 aria-label="whatsapp"
//                 rel="noopener noreferrer"
//               >
//                 <BsWhatsapp className="w-4 h-auto text-[#A60505]" />
//               </a>
//               <a
//                 href={profile.facebook}
//                 target="_blank"
//                 aria-label="facebook"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebookF className="w-4 h-auto text-[#A60505]" />
//               </a>
//               <a
//                 href={profile.instagram}
//                 target="_blank"
//                 aria-label="instagram"
//                 rel="noopener noreferrer"
//               >
//                 <FaInstagram className="w-4 h-auto text-[#A60505]" />
//               </a>
//             </div>
//           </div>

//           <div className="lg:flex lg:flex-row items-center">
//             <div className="p-6 rounded-lg max-w-md w-full">
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Home Address:</h3>
//                 <p className="text-gray-700 text-sm whitespace-normal text-end">
//                   {profile.streetAddress || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Phone No:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.phoneNumber || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Email:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.email || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">DOB:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {formattedDate || "Unavailable"}
//                 </p>
//               </div>
//             </div>

//             <div className="p-6 rounded-lg max-w-md w-full">
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">State of Origin:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.state || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Local Government:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.lga || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Autonomous Community:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.autonomous || "Unavailable"}
//                 </p>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <h3 className="text-sm font-bold">Kindred:</h3>
//                 <p className="text-gray-700 text-sm">
//                   {profile.kindred || "Unavailable"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="ml-2">
// <Link to={`/view-tree/${userId}`}>
//   <button className="bg-green text-white rounded-2xl w-[9rem] py-2 flex items-center justify-center transition ease-in-out duration-200 transform hover:scale-105">
//     Go to Tree
//     <span className="ml-2">
//       <DirectionButton2 />
//     </span>
//   </button>
// </Link>
//         </div>
//       </div>
//       {profile.about && (
//         <div className="mt-20">
//           <h3 className="text-black text-lg mod:text-sm font-bold uppercase text-start mb-2">
//             Background
//           </h3>
//           <div>
//             <p className="text-black text-sm font-normal">
//               {getText(profile.about)}
//             </p>
//           </div>
//         </div>
//       )}
//       {userStateOfOrigin?.origin && (
//         <div className="mt-10">
//           <h3 className="text-black text-lg font-bold uppercase text-start mb-2">
//             State of origin
//           </h3>
//           <div>
//             <p className="text-black text-sm font-normal">
//               {/* {userStateOfOrigin?.origin || "State description not available"} */}
//               {getText(userStateOfOrigin?.origin)}
//             </p>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-center my-7">
//         <Link to={`/genealogy/${formattedStateName}`}>
//           <button className="bg-green text-white rounded-2xl w-auto py-2 px-3 flex items-center justify-center transition ease-in-out duration-200 transform hover:scale-105">
//             view more on state & culture
//             <span className="ml-2">
//               <DirectionButton2 />
//             </span>
//           </button>
//         </Link>
//       </div>
//       {/* birthdayFrame
//        largescreen  */}
//       <div className="relative Nlg:hidden">
//         <img src={BirtdayFrame} alt="birthdayframe" className="h-[15rem]" />
//         <p className="absolute top-0 left-0 w-full h-full flex items-start mt-[3.5rem] justify-center text-black text-lg font-bold">
//           {profile.lastName} {profile.firstName} {profile.middlename}'s birthday
//           is in {daysUntilBirthday} {daysUntilBirthday === 1 ? "day" : "days"}
//         </p>
//         <p className="absolute top-[2rem] lg:px-24 left-0 w-full h-full flex items-start mt-[3.5rem] justify-center text-black text-sm font-normal">
//           On days like this Essential Groups advices visitors like yourself to
//           find a way to wish this personnel a happy birthday. You can maximize
//           our social media handle keys we provided, and if this personnel is
//           deceased you can still get through to any of the family member through
//           our platform here
//         </p>
//       </div>
//       {/* mobile screen */}
//       <div className="bg-[#F8D9D9] lg:hidden py-2">
//         <div className="p-3">
//           <img src={birthdayframeM1} alt="" className="h-auto w-[45vw] mb-3" />
//           <img src={birthdayframeM2} alt="" className="h-auto w-[35vw]" />
//         </div>
//         <p className="w-full h-full flex items-start px-5  text-black text-lg mb-3 font-bold">
//           {profile.lastName} {profile.firstName} {profile.middlename}'s birthday
//           is in {daysUntilBirthday} {daysUntilBirthday === 1 ? "day" : "days"}
//         </p>

//         <p className="w-full h-full flex items-start px-5  text-black text-sm font-normal">
//           On days like this Essential Groups advices visitors like yourself to
//           find a way to wish this personnel a happy birthday. You can maximize
//           our social media handle keys we provided, and if this personnel is
//           deceased you can still get through to any of the family member through
//           our platform here
//         </p>
//       </div>
//       {/* familyDetails?  */}

//       <div className="lg:grid grid-cols-10 my-6">
//         {/* <div className=" col-span-4">
//           <FamilyDetails />
//         </div> */}
//         <div className="col-span-4">
//           {profile?.images && profile.images.length > 0 && <FamilyDetails />}
//         </div>

//         <div className="flex mx-3 flex-col justify-start items-start col-span-6 ">
//           <div className="">
//             {/* childrensCard */}
//             {/* <div className="flex flex-wrap space-x-2 Nlg:my-3 gap-2 mb-9">
//               <button className="text-black  bg-[#d9f8de] text-sm  p-2 rounded-sm">
//                 child1
//               </button>
//               <button className="text-black  bg-[#d9f8de] text-sm  p-2 rounded-sm">
//                 Child2
//               </button>
//               <button className="text-black  bg-[#d9f8de] text-sm  p-2 rounded-sm">
//                 Child3
//               </button>
//               <button className="text-black  bg-[#d9f8de] text-sm  p-2 rounded-sm">
//                 Child4
//               </button>
//               <button className="text-black  bg-[#d9f8de] text-sm  p-2 rounded-sm">
//                 Chid5
//               </button>
//             </div> */}

// {profile.religion && (
//   <>
//     <h3 className="text-black text-lg font-bold uppercase mb-3">
//       State religion
//     </h3>
//     <button className="text-white bg-green text-lg font-bold uppercase mb-1 p-1 rounded-xs">
//       {profile.religion}
//     </button>
//     <div className="">
//       <p className="text-black text-sm font-normal">
//         {ReligionDetails?.description ||
//           "Religion description not available"}
//       </p>
//     </div>
//   </>
// )}
//           </div>
//         </div>
//       </div>

//       {/* Tribe  */}
// {profile.tribe && (
//   <div className="mt-10">
//     <h3 className="text-black  text-lg font-bold uppercase  text-start mb-4">
//       Tribe
//     </h3>
//     <button className="text-white bg-green text-lg font-bold uppercase mb-1 p-1 rounded-xs">
//       {profile.tribe}
//     </button>
//     <div className="">
//       <p className="text-black text-sm font-normal">
//         {TribesDetails?.description || "Tribe description not available"}
//       </p>
//     </div>
//   </div>
// )}

//       {/*   */}
//       <div className="mt-10">
//         {relatedProfiles.length > 0 && (
//           <div className="mt-24">
//             <h3 className="text-black text-lg font-bold text-start mb-4">
//               Greate people bearing this name
//             </h3>

//             <div className="flex flex-wrap justify-center lg:justify-start">
//               {relatedProfiles.map((profile) => (
//                 <div
//                   key={profile._id}
//                   className="overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg max-w-[15rem] w-full m-4"
//                 >
//                   {/* Image */}
//                   <div className="overflow-hidden bg-transparent shadow-none bg-clip-border">
//                     <img
//                       src={
//                         profile.image
//                           ? `${backendURL}/${profile.image}` // If profile image is available
//                           : noProfile // Placeholder image if no profile image
//                       }
//                       alt="profile"
//                       className="w-full h-[15rem] object-cover"
//                     />
//                   </div>

//                   {/* Name */}
//                   <div className="px-4 mb-3">
//                     <h3 className="font-sans text-lg font-bold mod:text-sm py-2">
//                       {profile.lastName} {profile.firstName}{" "}
//                       {profile.middlename}
//                     </h3>
//                   </div>

//                   {/* Gender and Position */}
//                   <div className="flex justify-between px-4 pb-3">
//                     <h3 className="font-sans text-base mod:text-sm font-normal">
//                       {profile.profession}
//                     </h3>
//                     <h3 className="font-sans text-base mod:text-sm font-normal bg-NavClr py-">
//                       {profile.gender}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* search */}
//       <div className="mt-24">
//         <h4 className="text-black my-4 text-sm  font-bold   text-center">
//           Dont Find What You Are Looking For?
//         </h4>
//         <p className="mt-4 text-center lg:max-w-[35rem] mx-auto">
//           should lead to more on culture and town, religion, tribe family
//           photograph, highlight position of people on the photo
//         </p>

//         {/* form */}
//         <SearchUsers />
//         {/* form */}

//         {/* related searches */}
//         <RecentSearches />
//         {/* related searches */}
//       </div>
//       {isModalOpen && (
//         <ChatModal isOpen={isModalOpen} onClose={handleModalClose} />
//       )}
//     </section>
//   );
// }

// const FamilyTreeFeeds = () => {
//   const { userId } = useParams();

//   return <ChildFeed userId={userId} />;
// };

// export default FamilyTreeFeeds;

import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStateDetails } from "../../features/Statefeature/stateAction";
import moment from "moment";
import { DirectionButton2 } from "../../components/d-button";

import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import {
  Message as MessageIcon,
  Home as HomeIcon,
  Group as GroupIcon,
  Book as BookIcon,
  PersonAdd as PersonAddIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import FamilyTreeIcon from "@mui/icons-material/AccountTree";
import ChatIcon from "@mui/icons-material/Chat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DetailsIcon from "@mui/icons-material/Details";
import InfoIcon from "@mui/icons-material/Info";

// Custom imports (assumed to exist)
import { AuthContext } from "../../components/context/AuthContext";
import { ChatContext } from "../../components/context/chatContext";
import {
  getProfile,
  getAllProfiles,
} from "../../features/UserFeature/UserAction";
import { calculateBirthdayCountdown } from "../../components/tools/birthdayCountdown";
import noProfile from "../../assets/images/noProfile.png";
import BirthdayFrame from "../../assets/images/birthdayFrame.png";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8080";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));

const BirthdayCard = styled(Card)(({ theme }) => ({
  backgroundImage: `url(${BirthdayFrame})`,
  backgroundSize: "cover",
  minHeight: "15rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  "& .MuiTypography-root": {
    color: theme.palette.common.black,
    textAlign: "center",
  },
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  width: "100%",
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  "&::-webkit-scrollbar": { display: "none" },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
}));

const CarouselCard = styled(Card)(({ theme }) => ({
  flex: "0 0 auto",
  width: "250px",
  marginRight: theme.spacing(2),
  scrollSnapAlign: "start",
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function FamilyTreeFeeds() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const { CreateChat, updateCurrentChat } = useContext(ChatContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { profile, profiles, loading } = useSelector((state) => state.person);
  const { allStates, religions, tribes } = useSelector((state) => state.state);

  // if (error) {
  //   console.error("Error fetching data:", error);
  // }

  // Find the state based on the user's selected state
  const stateName = profile?.state;
  const ReligionNam = profile?.religion;
  const TribeName = profile?.tribe;
  console.log("Profile State:", stateName, ReligionNam, TribeName);

  // Format the state name to match the names in allStates
  const formattedStateName = stateName ? `${stateName} State` : "";
  console.log("Formatted State Name:", formattedStateName);

  // Find the state based on the formatted state name
  const userStateOfOrigin = allStates?.find(
    (state) => state.name === formattedStateName
  );
  console.log("User State of Origin:", userStateOfOrigin);
  // Create the complete state name if needed

  // check and display religions details
  const ReligionDetails = religions?.find(
    (state) => state.religionName === ReligionNam
  );

  // check and display tribes details
  const TribesDetails = tribes?.find((tribe) => tribe?.tribeName === TribeName);

  useEffect(() => {
    dispatch(fetchStateDetails()) // Fetch all states
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
      dispatch(getAllProfiles());
    }
  }, [dispatch, userId]);

  const formattedDate = profile?.DOB
    ? moment(profile.DOB).format("DD MMMM YYYY")
    : "N/A";
  const daysUntilBirthday = calculateBirthdayCountdown(formattedDate);
  const imageSrc = profile?.image
    ? `${backendURL}/${profile.image}`
    : noProfile;

  const handleStartChat = async () => {
    try {
      const chat = await CreateChat(userId, user.id);
      if (chat) {
        updateCurrentChat(chat, user, []);
        navigate("/chatPage");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const relatedProfiles = profiles.filter(
    (p) =>
      (p.firstName === profile?.firstName ||
        p.lastName === profile?.lastName) &&
      p._id !== userId
  );
  const carouselRef = useRef(null);

  const handleCarouselScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            component="nav"
            sx={{
              width: "100%",
              flexShrink: 0,
              bgcolor: "background.paper",
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              marginTop: { xs: 2, md: 9 },
              display: { xs: "none", md: "block" },
            }}
          >
            <List>
              <ListItem button component={Link} to={`/view-tree/${userId}`}>
                <FamilyTreeIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="View Family Tree" />
              </ListItem>
              <ListItem button onClick={handleStartChat}>
                <ChatIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Start Chat" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={`/genealogy/${profile?.state}`}
              >
                <LocationOnIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="State & Culture" />
              </ListItem>
              <ListItem button>
                <DetailsIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="Family Details" />
              </ListItem>
              <ListItem button>
                <InfoIcon sx={{ marginRight: 1 }} />
                <ListItemText primary="About" />
              </ListItem>
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box sx={{ width: "100%", maxWidth: 900, mx: "auto" }}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <h2 className="text-black text-2xl md:text-xl font-bold uppercase font-Montserrat text-left">
                ABOUT {profile?.lastName} {profile?.firstName}{" "}
                {profile?.middlename}
              </h2>
              <Link to={`/view-tree/${userId}`}>
                <Button
                  variant="outlined"
                  startIcon={<FamilyTreeIcon />}
                  sx={{
                    borderColor: "#00d121", // Green border color
                    color: "#00d121", // Green text color to match the border
                    "&:hover": {
                      borderColor: "#00b81a", // Darker green border on hover
                      backgroundColor: "rgba(0, 209, 33, 0.1)", // Optional light green background on hover
                      color: "#00b81a", // Darker green text on hover
                    },
                    mt: { xs: 2, sm: 0 }, // Margin-top adjustment for different screen sizes
                  }}
                >
                  Go to Tree
                </Button>
              </Link>
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Avatar
                src={imageSrc}
                alt={`${profile?.firstName} ${profile?.lastName}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "300px",
                  aspectRatio: "1 / 1",
                  marginBottom: 2,
                  borderRadius: 2,
                }}
              />
              <Typography variant="h5" sx={{ mb: 1 }}>
                {profile?.lastName} {profile?.firstName} {profile?.middlename}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<MessageIcon />}
                  sx={{
                    backgroundColor: "#00d121",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                  fullWidth={isMobile}
                >
                  Message
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: "#00d121",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                  fullWidth={isMobile}
                >
                  Connect
                </Button>
                <Button
                  variant="contained"
                  startIcon={<GroupIcon />}
                  sx={{
                    backgroundColor: "#00d121",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkgreen",
                    },
                  }}
                  fullWidth={isMobile}
                >
                  Connections
                </Button>
              </Box>
            </Box>

            {/* Personal Details */}
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "Phone Number", value: profile?.phoneNumber },
                  { label: "Email", value: profile?.email },
                  { label: "State of Origin", value: profile?.state },
                  { label: "Local Government", value: profile?.lga },
                  { label: "Autonomous Community", value: profile?.autonomous },
                  { label: "Kindred", value: profile?.kindred },
                  { label: "Religion", value: profile?.religion },
                  { label: "Tribe", value: profile?.tribe },
                  { label: "Profession", value: profile?.profession },
                  { label: "Date of Birth", value: formattedDate },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {item.label}:
                    </Typography>
                    <Typography variant="body2">
                      {item.value || "Unavailable"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>

            {/* Social Links */}
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              {/* <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton href={profile?.twitter} target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href={`https://wa.me/${profile?.phoneNumber}`}
                  target="_blank"
                >
                  <WhatsAppIcon />
                </IconButton>
                <IconButton href={profile?.facebook} target="_blank">
                  <FacebookIcon />
                </IconButton>
                <IconButton href={profile?.instagram} target="_blank">
                  <InstagramIcon color="primary" />
                </IconButton>
              </Box> */}
              <Box sx={{ display: "flex", gap: 2, paddingLeft: 2 }}>
                <IconButton
                  href={profile?.twitter}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-500" // Tailwind color classes
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href={`https://wa.me/${profile?.phoneNumber}`}
                  target="_blank"
                  className="text-green-500 hover:text-green-600" // Tailwind color classes
                >
                  <WhatsAppIcon />
                </IconButton>
                <IconButton
                  href={profile?.facebook}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700" // Tailwind color classes
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href={profile?.instagram}
                  target="_blank"
                  className="text-pink-500 hover:text-pink-600" // Tailwind color classes
                >
                  <InstagramIcon />
                </IconButton>
              </Box>
            </StyledPaper>

            {/* Birthday Countdown */}
            <BirthdayCard>
              <Typography variant="h5" gutterBottom>
                {profile?.firstName}'s birthday is in {daysUntilBirthday}{" "}
                {daysUntilBirthday === 1 ? "day" : "days"}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: "80%" }}>
                On days like this, Essential Groups advises visitors like
                yourself to find a way to wish this person a happy birthday. You
                can use our provided social media handles, and if this person is
                deceased, you can still get through to any family member through
                our platform here.
              </Typography>
            </BirthdayCard>

            {/* About Section */}
            {profile?.about && (
              <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Background
                </Typography>
                <Typography variant="body2">
                  {getText(profile.about)}
                </Typography>
              </StyledPaper>
            )}

            {/* {getText(userStateOfOrigin?.origin)} */}
            {profile?.about && (
              <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                  State of origin
                </Typography>
                <Typography variant="body2">
                  {getText(userStateOfOrigin?.origin)}
                </Typography>
              </StyledPaper>
            )}

            {/* TRIBE */}
            {profile?.tribe && (
              <div className="mt-10">
                <h3 className="text-black  text-lg font-bold uppercase  text-start mb-4">
                  Tribe
                </h3>
                <button className="text-white bg-green text-lg font-bold uppercase mb-1 p-1 rounded-xs">
                  {profile?.tribe}
                </button>
                <div className="">
                  <p className="text-black text-sm font-normal">
                    {TribesDetails?.description ||
                      "Tribe description not available"}
                  </p>
                </div>
              </div>
            )}
            {/* RELIGION */}
            <section className="mt-5">
              {profile?.religion && (
                <>
                  <h3 className="text-black text-lg font-bold uppercase mb-3">
                    State religion
                  </h3>
                  <button className="text-white bg-green text-lg font-bold uppercase mb-1 p-1 rounded-xs">
                    {profile?.religion}
                  </button>
                  <div className="">
                    <p className="text-black text-sm font-normal">
                      {ReligionDetails?.description ||
                        "Religion description not available"}
                    </p>
                  </div>
                </>
              )}
            </section>

            {/* Family Details */}
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Family Photos
              </Typography>
              <FamilyDetails />
            </StyledPaper>

            {/* Related Profiles Carousel */}
            {relatedProfiles.length > 0 && (
              <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                  Great People Bearing This Name
                </Typography>
                <CarouselContainer>
                  <CarouselButton
                    onClick={() => handleCarouselScroll("left")}
                    sx={{ left: 0 }}
                  >
                    <ChevronLeftIcon />
                  </CarouselButton>
                  <CarouselTrack ref={carouselRef}>
                    {relatedProfiles.map((item) => (
                      <CarouselCard key={item._id}>
                        <CardContent>
                          <Avatar
                            src={
                              item.image
                                ? `${backendURL}/${item.image}`
                                : noProfile
                            }
                            alt={item.firstName}
                            sx={{
                              width: 100,
                              height: 100,
                              margin: "auto",
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" align="center">
                            {item.lastName} {item.firstName} {item.middleName}
                          </Typography>
                          <Typography variant="body2" align="center">
                            {item.profession}
                          </Typography>
                          <Typography
                            variant="body2"
                            align="center"
                            color="text.secondary"
                          >
                            {item.gender}
                          </Typography>
                        </CardContent>
                      </CarouselCard>
                    ))}
                  </CarouselTrack>
                  <CarouselButton
                    onClick={() => handleCarouselScroll("right")}
                    sx={{ right: 0 }}
                  >
                    <ChevronRightIcon />
                  </CarouselButton>
                </CarouselContainer>
              </StyledPaper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FamilyTreeFeeds;
export const StartChatButton = ({ onClick, chat }) => (
  <button className="flex gap-2 items-center" onClick={onClick}>
    <BsChatDots className="w-3 h-3 text-[#A60505]" />
    <span>Start Chat</span>
  </button>
);
export const ConnectionButton = ({ onClick, chat }) => (
  <button className="flex gap-2 items-center" onClick={onClick}>
    <IoIosLink className="w-3 h-3 text-[#A60505]" />
    <span>Connections</span>
  </button>
);

export const SendRequestButton = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const senderId = user?.id;
  const { userId } = useParams();
  const receiverId = userId;

  // Using status instead of loading directly
  const { status, error, success } = useSelector(
    (state) => state.connectionRequests
  );

  const isLoading = status === "loading";

  const handleClick = async () => {
    try {
      await dispatch(sendConnectionRequest({ senderId, receiverId })).unwrap();
      toast.success("Request sent successfully!");
    } catch (error) {
      // Display a specific error message if available
      toast.error(error || "Failed to send request.");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={` ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Sending..." : "Send Request"}
    </button>
  );
};

export function ChatModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { connections, status, error } = useSelector(
    (state) => state.connectionRequests
  );
  const { profile, profiles, loading } = useSelector((state) => state.person);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(fetchConnections(userId));
    }
  }, [dispatch, userId]);

  if (status === "loading") {
    return <div className="text-center py-4">Loading connections...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  if (!isOpen) return null;

  return (
    <div className="p-5 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[80vh] max-h-[90vh] relative">
        <div className="flex justify-between items-center p-4 border-b">
          <IoIosLink size={24} />

          <h2 className="text-sm mb-2 px-6 first-letter:uppercase">
            {`${profile.lastName} ${profile.firstName} ${profile.middlename}'s Connections`}
          </h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <IoIosClose
              className="hover:text-red-400 transition ease-in-out duration-200 transform hover:scale-110"
              size={28}
            />
          </button>
        </div>

        <div className="max-w-2xl mx-auto p-4">
          {/* <h2 className="text-xl font-semibold mb-4 ">My Connections</h2> */}
          {connections.length === 0 ? (
            <p className="text-gray-600">No connections yet.</p>
          ) : (
            connections.map((connection) => (
              <div
                key={connection._id}
                // className="flex items-center p-4 border border-gray-200 shadow-sm rounded-lg mb-2 bg-white"
                className="md:max-w-[30rem] flex items-center justify-between py-2 px-3 border border-gray-200 rounded-lg mb-2 bg-white shadow-sm"
              >
                {connection.userId1.image ? (
                  <img
                    src={`${backendURL}/${connection.userId1.image}`}
                    alt={`${connection.userId1.firstName} ${connection.userId1.lastName}`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-image.png";
                    }}
                  />
                ) : (
                  <FaUserCircle className="w-12 h-12 text-gray-400 mr-4" />
                )}

                <div className="flex-1">
                  <p className=" first-letter:uppercase ext-lg mod:text-sm font-semibold text-gray-900">
                    {`${connection.userId1.firstName} ${connection.userId1.lastName}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {connection.userId1.email || "No email provided"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const FamilyDetails = () => {
  const { profile, loading, error } = useSelector((state) => state.person);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading images: {error.message}</div>;

  const images = profile?.images || [];
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const displayedImages = images.slice(0, 3);
  const remainingImages = images.length - 3;

  return (
    <div className="relative">
      <div className="relative">
        {images.length === 1 && (
          <img
            src={`${backendURL}/${images[0].path}`}
            alt="Single Family Image"
            className="object-cover w-full h-80 cursor-pointer rounded"
            onClick={handleImageClick}
          />
        )}
        {images.length === 2 && (
          <div className="grid grid-cols-2 gap-2">
            {displayedImages.map((image, index) => (
              <img
                key={index}
                src={`${backendURL}/${image.path}`}
                alt={`Family Image ${index}`}
                className="object-cover w-full h-80 cursor-pointer rounded"
                onClick={handleImageClick}
              />
            ))}
          </div>
        )}
        {images.length >= 3 && (
          <div className="grid grid-cols-2 gap-2">
            <div
              className="relative col-span-1 h-80 cursor-pointer"
              onClick={handleImageClick}
            >
              <img
                src={`${backendURL}/${displayedImages[0].path}`}
                alt="Main Family Image"
                className="object-cover w-full h-full rounded"
              />
              {images.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 text-white text-xl font-bold">
                  +{remainingImages}
                </div>
              )}
            </div>

            <div className="grid grid-rows-2 gap-2 h-80">
              {displayedImages.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={`${backendURL}/${image.path}`}
                  alt={`Family Image ${index + 1}`}
                  className="object-cover w-full h-full cursor-pointer "
                  onClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white  rounded-md max-w-4xl w-full overflow-auto max-h-[100vh] shadow-lg">
            <div className="sticky top-0 w-full bg-white  flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold text-gray-700 ml-4">
                Family Photos
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 text-red-500 border-red-500 border rounded  hover:text-white hover:bg-red-600"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Images Displayed in Single Blocks */}
            <div className="flex flex-col space-y-4 p-4">
              {images.map((image, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className=" my-5 w-[30rem] h-[30rem] shadow-gray-900  shadow-sm bg-gray-100 flex items-center justify-center">
                    <img
                      src={`${backendURL}/${image.path}`}
                      alt={`Expanded Image ${index}`}
                      className="object-cover w-full h-full  rounded-lg" // Ensures images fill the container while maintaining uniform size
                    />
                  </div>
                  {image.caption && (
                    <p className="mt-2 text-center text-gray-600">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
