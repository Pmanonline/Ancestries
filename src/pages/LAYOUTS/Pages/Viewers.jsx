import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import backgroundImage from "../../../assets/images/backgroundImage.png";
import { CgProfile } from "react-icons/cg";
import LayoutNAv from "../../../components/layoutNAv";
import { fetchVisits } from "../../../features/UserFeature/inviteAction";
import moment from "moment"; // Import moment
const backendURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080"
    : "https://gekoda-api.onrender.com";
const Viewers = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);

  // Get visits from the Redux store
  const { visits, loading, error } = useSelector((state) => state.invite);

  // Fetch visits when the component mounts
  useEffect(() => {
    if (userId) {
      dispatch(fetchVisits({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <section
      className="p-8 relative bg-cover bg-no-repeat h-full w-full Nlg:max-w-[40rem] Nlg:mx-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-opacity-50 pointer-events-none"></div>
      <span className="w-full flex justify-center">
        <LayoutNAv />
      </span>
      <h2 className="text-xl font-bold mb-4">
        {loading ? "Loading..." : visits.length} People have viewed your tree
      </h2>
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="flex flex-col flex-wrap">
        {visits.length > 0
          ? visits.map((visit, index) => (
              <div
                key={index}
                className="flex flex-row mb-4 w-full items-center"
              >
                <div className="mr-4">
                  {visit.visitor && visit.visitor.image ? (
                    <img
                      src={`${backendURL}/${visit.visitor.image}`}
                      alt={`${visit.visitor.firstName} ${visit.visitor.lastName}`}
                      className="w-7 h-7 rounded-full"
                    />
                  ) : (
                    <CgProfile className="w-7 h-7" />
                  )}
                </div>
                <div className="flex gap-2">
                  <p className="">{visit.visitor?.firstName}</p>
                  <p>{visit.visitor?.lastName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {moment(visit.visitedAt).fromNow()}
                  </p>
                </div>
              </div>
            ))
          : !loading && <p>No visits recorded</p>}
      </div>
    </section>
  );
};

export default Viewers;
