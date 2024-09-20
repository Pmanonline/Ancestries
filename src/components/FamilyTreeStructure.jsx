import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { TreeProfile } from "./d-button";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NestedModal } from "../components/modals/personModal";
import { NestedModal2 } from "../components/modals/motherModal";
import { FatherModal } from "../components/modals/fatherModal";
import { PGFModal } from "../components/modals/PgrandfatherModal";
import { PGMModal } from "../components/modals/PgrandMotherModal";
import { MGFModal } from "../components/modals/MgrandFatherModal";
import { MGMModal } from "../components/modals/MgrandMotherModal";
import { PGGFModal } from "../components/modals/paternalGGFModal";
import { PGGMModal } from "../components/modals/paternalGGMModal";
import { MGGFModal } from "./modals/maternalGGFModal";
import { MGGFMModal } from "./modals/maternalGGMModal";
import { fetchAllDetails } from "../features/UserFeature/UserAction";
import { FiZoomOut } from "react-icons/fi";
import { FiZoomIn } from "react-icons/fi";
import { MdOutlineZoomInMap } from "react-icons/md";
import { fetchUserInvites } from "../features/UserFeature/inviteAction";
import { GrTreeOption } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaUserCircle, FaTrash } from "react-icons/fa";
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
import { FaEllipsisV } from "react-icons/fa"; // Replacing MoreVertIcon and DeleteIcon
import { styled } from "@mui/material/styles";
const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14), // Increase size as it will be on top
  height: theme.spacing(14),
  margin: "0 auto", // Center the image horizontally
}));

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";
// import { deleteInvite } from "../redux/actions/inviteActions";

Modal.setAppElement("#root");

export const FamilyTreeStructure = () => {
  const invites = useSelector((state) => state.invite.invites);
  const loading = useSelector((state) => state.invite.loading);
  const error = useSelector((state) => state.invite.error);

  const isActive = (route) => location.pathname === route;
  const { userId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const treeContentRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  console.error(invites, "USERS INVITES");

  const {
    person: personData,
    father: fatherData,
    mother: motherData,
    MGF: MGFData,
    MGM: MGMData,
    PGF: PGFData,
    PGM: PGMData,
    PGGF: PGGFData,
    PGGM: PGGMData,
    MGGF: MGGFData,
    MGGM: MGGMData,
  } = useSelector((state) => state.person);

  const personCard =
    personData && Object.keys(personData).length > 0
      ? "border-green border-2"
      : "";
  const fatherCard =
    fatherData && Object.keys(fatherData).length > 0
      ? "border-green  border-2"
      : "";
  const motherCard =
    motherData && Object.keys(motherData).length > 0
      ? "border-green  border-2"
      : "";
  const MGFDataCard =
    MGFData && Object.keys(MGFData).length > 0 ? "border-green  border-2" : "";
  const MGMDataCard =
    MGMData && Object.keys(MGMData).length > 0 ? "border-green  border-2" : "";
  const PGFDataCard =
    PGFData && Object.keys(PGFData).length > 0 ? "border-green  border-2" : "";
  const PGMDataCard =
    PGMData && Object.keys(PGMData).length > 0 ? "border-green  border-2" : "";
  const PGGFCard =
    PGGFData && Object.keys(PGGFData).length > 0
      ? "border-green  border-2"
      : "";
  const PGGMCard =
    PGGMData && Object.keys(PGGMData).length > 0
      ? "border-green  border-2"
      : "";
  const MGGFCard =
    MGGFData && Object.keys(MGGFData).length > 0
      ? "border-green  border-2"
      : "";
  const MGGMCard =
    MGGMData && Object.keys(MGGMData).length > 0
      ? "border-green  border-2"
      : "";

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserInvites(userId));
    }
  }, [dispatch, userId]);

  // Handle drag start
  const handleMouseDown = (e) => {
    setDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Handle dragging
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Limit max zoom
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); // Limit min zoom
  };

  // Reset zoom and position
  const resetZoomAndPosition = () => {
    setScale(0.8);
    setPosition({ x: 0, y: 0 });
  };

  const modalRefs = {
    self: useRef(),
    mother: useRef(),
    father: useRef(),
    PGF: useRef(),
    PGM: useRef(),
    MGF: useRef(),
    MGM: useRef(),
    PGGF: useRef(),
    PGGM: useRef(),
    MGGF: useRef(),
    MGGM: useRef(),
  };

  const openModal = (modalType) => {
    if (modalRefs[modalType]?.current) {
      modalRefs[modalType].current.openModal();
    }
  };

  const closeModal = (modalType) => {
    if (modalRefs[modalType]?.current) {
      modalRefs[modalType].current.closeModal();
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllDetails(userId));
    } else {
      console.error("userId is undefined");
    }
  }, [userId, dispatch]);

  return (
    <>
      {/* Zoom Controls */}
      <div className="flex space-x-2 mb-4 relative z-50">
        <button
          onClick={handleZoomIn}
          className="text-gray-800 p-2 rounded transition ease-in-out duration-200 transform hover:scale-105"
        >
          <FiZoomIn size={24} />
        </button>
        <button
          onClick={handleZoomOut}
          className="text-gray-800 p-2 rounded transition ease-in-out duration-200 transform hover:scale-105"
        >
          <FiZoomOut size={24} />
        </button>
        <button
          onClick={resetZoomAndPosition}
          className="text-gray-800 p-2 rounded transition ease-in-out duration-200 transform hover:scale-105"
        >
          <MdOutlineZoomInMap size={24} />
        </button>
      </div>

      {/* Main Family Tree */}
      <div className="mb-20">
        {/* ... (keep all the existing family tree structure) */}
        <div className="">
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
            {/* Me */}

            <div className="relative flex flex-col items-center">
              <div
                className={`card mb-4 cursor-pointer ${personCard}  ${
                  isActive(`/layout/personal-form/${userId}`)
                    ? "bg-[#A9A8A8]"
                    : "bg-[#E8F3E7]"
                } border border-gray-300 p-6 rounded-lg relative z-50 shadow-md text-center w-full`}
                onClick={() => openModal("self")}
              >
                <p className="flex justify-center mb-5">
                  <TreeProfile />
                </p>
                <p className="text-xs text-center flex justify-center">Self</p>
              </div>
              <NestedModal ref={modalRefs.self} userId={userId} />
              <div className="line absolute z-10 w-0.5 h-[6.1rem] top-[6rem] bg-gray-300"></div>
            </div>

            {/* Parents */}
            <div className="relative flex flex-col items-center mb-8 w-[70%]">
              <div className="flex justify-between w-full mb-4 relative">
                <div
                  className={`card mb-4 cursor-pointer ${fatherCard} ${
                    isActive(`/layout/fathers-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center w-[6rem]`}
                  onClick={() => openModal("father")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs whitespace-nowrap">Father</p>
                </div>
                <FatherModal ref={modalRefs.father} userId={userId} />
                <div
                  className={`card mb-4 cursor-pointer relative z-50 ${motherCard} ${
                    isActive(`/layout/mothers-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center w-[6rem]`}
                  onClick={() => openModal("mother")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs whitespace-nowrap">Mother</p>
                </div>
                <NestedModal2 ref={modalRefs.mother} userId={userId} />
                <div className="line w-[67%] h-0.5 bg-gray-300 absolute z-10 top-1/2 left-[6rem]"></div>
              </div>
              <div className="right-[3rem] top-[7rem] absolute line w-0.5 h-[8.5rem] bg-gray-300"></div>
              <div className="left-[3rem] top-[7rem] absolute line w-0.5 h-[8.5rem] bg-gray-300"></div>
            </div>

            {/* Grandparents */}
            <div className="relative flex justify-between w-full flex-wrap">
              <div className="relative flex flex-col items-center">
                {/* PGF */}
                <div
                  className={`card mb-4 relative z-30 cursor-pointer ${PGFDataCard}  ${
                    isActive(`/layout/paternalGrandfather-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("PGF")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grandfather <br /> (Paternal)
                  </p>
                </div>
                <PGFModal ref={modalRefs.PGF} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
              </div>
              <div className="relative flex flex-col items-center">
                <div
                  className={`card mb-4 cursor-pointer ${PGMDataCard} ${
                    isActive(`/layout/paternalGrandmother-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("PGM")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grandmother <br /> (Paternal)
                  </p>
                </div>
                <PGMModal ref={modalRefs.PGM} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
              </div>
              <div className="relative flex flex-col items-center">
                <div
                  className={`card mb-4 relative z-10 cursor-pointer ${MGFDataCard} ${
                    isActive(`/layout/maternalGrandfather-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("MGF")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grandfather <br /> (Maternal)
                  </p>
                </div>
                <MGFModal ref={modalRefs.MGF} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
              </div>
              <div className="relative flex flex-col items-center">
                <div
                  className={`card mb-4 relative z-50  cursor-pointer ${MGMDataCard} ${
                    isActive(`/layout/maternalGrandmother-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("MGM")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grandmother <br /> (Maternal)
                  </p>
                </div>
                <MGMModal ref={modalRefs.MGM} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
              </div>
            </div>

            {/* GREAT GRAND PARENTS? */}
            {/* PGGP */}
            <div className="relative flex justify-between w-full flex-wrap">
              <div className="relative flex flex-col items-center right-[7rem] top-[4rem]">
                {/* PGGF */}

                <div
                  className={`card mb-4 cursor-pointer ${PGGFCard}  ${
                    isActive(`/layout/paternalGGFather-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("PGGF")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grt_Grandfather <br /> (Paternal)
                  </p>
                </div>
                <PGGFModal ref={modalRefs.PGGF} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
              </div>
              {/* PGGM */}
              <div className="relative flex flex-col items-center right-[7rem] top-[4rem]">
                <div
                  className={`card mb-4 cursor-pointer ${PGGMCard} ${
                    isActive(`/layout/paternalGGMother-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("PGGM")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grt_Grandmother <br /> (Paternal)
                  </p>
                </div>
                <PGGMModal ref={modalRefs.PGGM} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
              </div>
              {/* PGGM */}

              <div className="w-0.5 h-[10rem] bg-gray-300 absolute top-[-1.3rem] left-[3.5rem]  z-10  transform -translate-x-1/2"></div>
              {/* MGGF */}
              <div className="relative flex flex-col items-center left-[7.1rem] top-[4rem]">
                <div
                  className={`card mb-4 cursor-pointer ${MGGFCard} ${
                    isActive(`/layout/maternalGGFather-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("MGGF")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grt_Grandfather <br /> (Maternal)
                  </p>
                </div>
                <MGGFModal ref={modalRefs.MGGF} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] left-full"></div>
              </div>
              {/* MGGF */}
              <div className="relative flex flex-col items-center left-[7.1rem] top-[4rem]">
                <div className="w-0.5 h-[10rem] bg-gray-300 absolute  bottom-[4.5rem] left-[-3.5rem]  z-10  transform -translate-x-1/2"></div>
                <div
                  className={`card mb-4 cursor-pointer ${MGGMCard} ${
                    isActive(`/layout/maternalGGMother-form/${userId}`)
                      ? "bg-[#A9A8A8]"
                      : "bg-[#E8F3E7]"
                  } border border-gray-300 p-6 rounded-lg shadow-md text-center max-w-[7rem]`}
                  onClick={() => openModal("MGGM")}
                >
                  <p className="flex justify-center mb-5">
                    <TreeProfile />
                  </p>
                  <p className="text-xs text-center flex justify-center">
                    Grt_Grandmother <br /> (Maternal)
                  </p>
                </div>
                <MGGFMModal ref={modalRefs.MGGM} userId={userId} />
                <div className="line-horizontal w-16 h-0.5 bg-gray-300 absolute bottom-[4.5rem] right-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              {invites && invites.length > 0 ? (
                <>
                  {" "}
                  <h2 className="text-2xl font-bold text-center mb-24">
                    Other Relations
                  </h2>
                </>
              ) : (
                ""
              )}

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>
                  {/* Unable to load relations at this time. Please try again later. */}
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
export default InviteCard;
