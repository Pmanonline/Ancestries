import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "../../../features/UserFeature/inviteAction";
import { resetSuccess } from "../../../features/UserFeature/inviteSlice";
import { Link } from "react-router-dom";
import { Select } from "flowbite-react";
import backgroundImage from "../../../assets/images/backgroundImage.png";
import { DirectionButton1 } from "../../../components/d-button";
import LayoutNAv from "../../../components/layoutNAv";
import Error from "../../../components/tools/Error";
import Spinner from "../../../components/tools/Spinner";
import { toast } from "react-toastify";
import { Label, TextInput, Button } from "flowbite-react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineUserGroup,
} from "react-icons/hi";

const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";

const Invites = () => {
  const [recipient, setRecipient] = useState("");
  const [name, setName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.invite);
  const { user } = useSelector((state) => state.auth);

  const relationshipOptions = [
    "Mother",
    "Father",
    "Brother",
    "Sister",
    "Cousin",
    "Niece",
    "Nephew",
    "Grandmother",
    "Grandfather",
    "Aunt",
    "Uncle",
    "Mother-in-law",
    "Father-in-law",
    "Brother-in-law",
    "Sister-in-law",
    "Stepson",
    "Stepdaughter",
    "Stepbrother",
    "Stepsister",
    "Grandson",
    "Granddaughter",
    "Great-Grandmother",
    "Great-Grandfather",
    "Great-Grandson",
    "Great-Granddaughter",
    "Friend",
    "Colleague",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !recipient || !relationshipType) {
      toast.error("Please fill out all fields!");
      return;
    }

    dispatch(
      sendInvite({
        inviteType: "email",
        recipient,
        name,
        relationshipType,
        senderName: user.name,
      })
    );
  };

  useEffect(() => {
    if (success) {
      toast.success("Invite sent successfully!");
      dispatch(resetSuccess());
      setName("");
      setRecipient("");
      setRelationshipType("");
      window.scrollTo(0, 0);
    }
  }, [success, dispatch]);

  return (
    <section
      className="min-h-screen p-8 relative bg-cover bg-no-repeat Nlg:max-w-[40rem] Nlg:mx-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <LayoutNAv />
      <div className="mt-10  bg-opacity-80 rounded-lg  p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Send Invites
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-black">
              <span className="text-gray-700"> Recipient's Name</span>
            </Label>
            <TextInput
              id="name"
              type="text"
              icon={HiOutlineUser}
              placeholder="Name of recipient"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="recipient"
              className="text-sm font-medium text-gray-700"
            >
              <span className="text-gray-700"> Recipient's Email</span>
            </Label>
            <TextInput
              id="recipient"
              type="email"
              icon={HiOutlineMail}
              placeholder="Enter email address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>

          <div>
            <Label
              htmlFor="relationshipType"
              className="text-sm font-medium text-gray-700"
            >
              <span className="text-gray-700"> Relationship Type</span>
            </Label>
            <Select
              id="relationshipType"
              icon={HiOutlineUserGroup}
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
              required
            >
              <option value="">Select relationship type</option>
              {relationshipOptions.map((option, index) => (
                <option
                  key={index}
                  value={option.toLowerCase().replace(/\s+/g, "-")}
                >
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <Button
            type="submit"
            color="success"
            className="w-full border border-gray-700 text-gray-700"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Send Invite"}
          </Button>

          {error && <Error>{error}</Error>}
        </form>
      </div>
    </section>
  );
};

export default Invites;
