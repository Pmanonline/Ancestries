// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FamilyTreeStructure } from "../components/FamilyTreeStructure";
// import AboutImageTree2 from "../assets/images/AboutImageTree3.png";
// import Spinner from "../components/tools/Spinner";
// import { recordVisit } from "../features/UserFeature/inviteAction";

// export const ViewTree = () => {
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.auth.user);
//   const loggedInUserId = userInfo?.id;
//   const { visitData, loading, error } = useSelector((state) => state.invite);

//   useEffect(() => {
//     if (userId && loggedInUserId) {
//       dispatch(recordVisit({ visitorId: loggedInUserId, visitedId: userId }));
//     }
//   }, [userId, loggedInUserId, dispatch]);

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div className="text-center text-gray-600">
//           <Spinner />
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="text-center text-red-600">
//           <p>
//             Unable to load family tree at this time. Please try again later.
//           </p>
//           <p className="text-sm mt-2">Error details: {error}</p>
//         </div>
//       );
//     }

//     if (!userId) {
//       return <p className="text-center text-red-600">User ID not found</p>;
//     }

//     return (
// <div className="relative w-full h-full max-w-6xl mx-auto overflow-x-auto overflow-y-auto">
//   <div className="min-w-[40rem] max-w-[50rem] w-full mx-auto">
//     <FamilyTreeStructure userId={userId} />
//   </div>
// </div>
//     );
//   };

//   return (
//     <div className="view-tree-page min-h-screen p-4 bg-gray-100">
//       <div className="flex justify-center mb-6">
//         <img
//           src={AboutImageTree2}
//           alt="Family tree illustration"
//           className="w-24 h-24 object-cover"
//         />
//       </div>
//       <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
//         Family Tree
//       </h1>
//       {renderContent()}
//     </div>
//   );
// };

// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FamilyTreeStructure } from "../components/FamilyTreeStructure";
// import AboutImageTree2 from "../assets/images/AboutImageTree3.png";
// import Spinner from "../components/tools/Spinner";
// import {
//   recordVisit,
//   fetchUserInvites,
// } from "../features/UserFeature/inviteAction";
// import InviteCard from "../components/FamilyTreeStructure";

// export const ViewTree = () => {
//   const { userId } = useParams();
//   const dispatch = useDispatch();
//   const userInfo = useSelector((state) => state.auth.user);
//   const loggedInUserId = userInfo?.id;
//   const { visitData, loading, error } = useSelector((state) => state.invite);
//   const { invites, invitesLoading, invitesError } = useSelector(
//     (state) => state.invite
//   );

//   useEffect(() => {
//     if (userId && loggedInUserId) {
//       dispatch(recordVisit({ visitorId: loggedInUserId, visitedId: userId }));
//       dispatch(fetchUserInvites(userId));
//     }
//   }, [userId, loggedInUserId, dispatch]);

//   const renderContent = () => {
//     if (loading || invitesLoading) {
//       return (
//         <div className="text-center text-gray-600">
//           <Spinner />
//         </div>
//       );
//     }

//     if (error || invitesError) {
//       return (
//         <div className="text-center text-red-600">
//           <p>
//             Unable to load family tree or relations at this time. Please try
//             again later.
//           </p>
//           <p className="text-sm mt-2">Error details: {error || invitesError}</p>
//         </div>
//       );
//     }

//     if (!userId) {
//       return <p className="text-center text-red-600">User ID not found</p>;
//     }

//     return (
//       <div className="relative w-full h-full max-w-6xl mx-auto overflow-x-auto overflow-y-auto">
//         <div className="min-w-[40rem] max-w-[50rem] w-full mx-auto">
//           <FamilyTreeStructure userId={userId} />
//         </div>
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-center mb-6">
//             Other Relations
//           </h2>
//           <div className="flex flex-wrap justify-center">
//             {invites && invites.length > 0 ? (
//               invites.map((invite) => (
//                 <InviteCard key={invite._id} invite={invite} />
//               ))
//             ) : (
//               <p className="text-center text-gray-600">
//                 No other relations found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="view-tree-page min-h-screen p-4 bg-gray-100">
//       <div className="flex justify-center mb-6">
//         <img
//           src={AboutImageTree2}
//           alt="Family tree illustration"
//           className="w-24 h-24 object-cover"
//         />
//       </div>
//       <h1 className="text-center text-3xl font-bold mb-6 text-gray-900">
//         Family Tree
//       </h1>
//       {renderContent()}
//     </div>
//   );
// };

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDetails } from "../features/UserFeature/UserAction";
import { fetchUserInvites } from "../features/UserFeature/inviteAction";
import { FamilyTreeStructure } from "../components/FamilyTreeStructure";

export const ViewTree = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const personData = useSelector((state) => state.person);
  const invites = useSelector((state) => state.invite.invites);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllDetails(userId));
      dispatch(fetchUserInvites(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="relative w-full h-full max-w-6xl mx-auto overflow-x-auto overflow-y-auto">
      <div className="min-w-[40rem] max-w-[50rem] w-full mx-auto">
        <FamilyTreeStructure
          personData={personData}
          invites={invites}
          userId={userId}
        />
      </div>
    </div>
  );
};
