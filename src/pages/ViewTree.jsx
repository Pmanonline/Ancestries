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
