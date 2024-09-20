 import React, { useState, useRef, useEffect } from "react";
 import { useSelector } from "react-redux";
 import { useParams, useNavigate } from "react-router-dom";
 import { useDispatch } from "react-redux";
 import { fetchAllDetails } from "../features/UserFeature/UserAction";
 import { fetchUserInvites } from "../features/UserFeature/inviteAction";
 import { FiZoomOut, FiZoomIn } from "react-icons/fi";
 import { MdOutlineZoomInMap } from "react-icons/md";
 import { FaEllipsisV, FaTrash } from "react-icons/fa";
 import {
   Card,
   CardHeader,
   CardContent,
   CardActions,
   Avatar,
   IconButton,
   Typography,
   Button,
   Menu,
   MenuItem,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
 } from "@mui/material";

 export const FamilyTreeStructure = () => {
   const invites = useSelector((state) => state.invite.invites);
   const loading = useSelector((state) => state.invite.loading);
   const error = useSelector((state) => state.invite.error);
   const { userId } = useParams();
   const dispatch = useDispatch();
   const [scale, setScale] = useState(1);
   const [dragging, setDragging] = useState(false);
   const [position, setPosition] = useState({ x: 0, y: 0 });
   const treeContentRef = useRef(null);
   const startPos = useRef({ x: 0, y: 0 });

   useEffect(() => {
     if (userId) {
       dispatch(fetchAllDetails(userId));
       dispatch(fetchUserInvites(userId));
     }
   }, [dispatch, userId]);

   // ... (keep all the existing functions like handleMouseDown, handleZoomIn, etc.)

   return (
     <>
       {/* ... (keep all the existing zoom controls and family tree structure) */}

       {/* My Relations Tree */}
       <div className="mt-20">
         <div
           ref={treeContentRef}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
           style={{
             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
             transition: dragging ? "none" : "transform 0.1s ease-in-out",
           }}
           className="flex flex-col cursor-grab items-center"
         >
           <div className="family-tree-container">
             <div className="invites-section">
               <h2 className="text-2xl font-bold text-center mb-24">
                 Other Relations
               </h2>
               {loading ? (
                 <p>Loading...</p>
               ) : error ? (
                 <p>
                   Unable to load relations at this time. Please try again
                   later.
                 </p>
               ) : invites && invites.length > 0 ? (
                 <div className="flex justify-center">
                   {invites.map((invite, index) => (
                     <div key={invite._id || index} className="mx-4 relative">
                       <InviteCard invite={invite} />
                       {/* Vertical line */}
                       <div className="absolute top-0 left-1/2 w-px h-8 bg-gray-300 -translate-x-1/2 -translate-y-full"></div>
                       {/* Horizontal line */}
                       {index > 0 && (
                         <div className="absolute top-0 left-0 w-full h-px bg-gray-300 -translate-y-8"></div>
                       )}
                     </div>
                   ))}
                 </div>
               ) : (
                 <p>No relations found.</p>
               )}
             </div>
           </div>
         </div>
       </div>
     </>
   );
 };

 const InviteCard = ({ invite }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [deleteOpen, setDeleteOpen] = useState(false);
   const navigate = useNavigate();

   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
   const handleMenuClose = () => setAnchorEl(null);
   const handleDeleteOpen = () => {
     handleMenuClose();
     setDeleteOpen(true);
   };
   const handleDeleteClose = () => setDeleteOpen(false);

   const handleDelete = () => {
     console.log("Delete invite", invite.id);
     handleDeleteClose();
   };

   const invitee = invite?.invitee || {};

   const handleViewProfile = () => {
     if (invitee._id) {
       navigate(`/familyTree-feeds/${invitee._id}`);
     } else {
       console.error("User ID is not available");
     }
   };

   if (!invitee || !invitee.firstName) {
     return null; // Don't render the card if invitee data is missing
   }

   return (
     <Card sx={{ width: 180, m: 1 }}>
       <CardHeader
         avatar={
           <Typography
             variant="h6"
             sx={{
               width: 40,
               height: 40,
               borderRadius: "50%",
               bgcolor: "primary.main",
               color: "white",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
             }}
           >
             {`${invitee.firstName[0]}${
               invitee.lastName ? invitee.lastName[0] : ""
             }`}
           </Typography>
         }
         action={
           <IconButton
             aria-label="settings"
             onClick={handleMenuOpen}
             size="small"
           >
             <FaEllipsisV />
           </IconButton>
         }
         title={
           <Typography variant="subtitle2">{`${invitee.firstName} ${
             invitee.lastName || ""
           }`}</Typography>
         }
         subheader={
           <Typography variant="caption">
             {invite.relationshipType || "Relation"}
           </Typography>
         }
         sx={{ p: 1 }}
       />

       <CardActions sx={{ justifyContent: "center", p: 1 }}>
         <Button
           size="small"
           variant="outlined"
           fullWidth
           onClick={handleViewProfile}
         >
           View Profile
         </Button>
       </CardActions>

       <Menu
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItem onClick={handleDeleteOpen}>
           <FaTrash fontSize="small" style={{ marginRight: "8px" }} />
           Delete Invite
         </MenuItem>
       </Menu>

       <Dialog open={deleteOpen} onClose={handleDeleteClose}>
         <DialogTitle>Confirm Delete</DialogTitle>
         <DialogContent>
           <DialogContentText>
             Are you sure you want to delete the invite for {invitee.firstName}{" "}
             {invitee.lastName || ""}?
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleDeleteClose}>Cancel</Button>
           <Button onClick={handleDelete} color="error">
             Delete
           </Button>
         </DialogActions>
       </Dialog>
     </Card>
   );
 };

 export default FamilyTreeStructure;