import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LayoutNAv() {
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo?.id;

  // Determine if the current path matches any of the specified routes
  const isActive =
    location.pathname.includes("/layout/Invites") ||
    location.pathname.includes("/layout/viewers") ||
    location.pathname.includes("/layout/find-in-tree") ||
    location.pathname.includes("/layout/custom-tree");

  return (
    <div className="flex lg:justify-end mb-12 overflow-hidden">
      <nav className="text-black border border-green gap-5 text-end">
        <div className="flex justify-between">
          <div className="flex flex-wrap">
            {isActive && userId && (
              <a
                href={`/layout/personal-form/${userId}`}
                className="hover:text-green Nlg:text-xs hover:underline px-3 py-2 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
              >
                Form
              </a>
            )}
            <a
              href="/layout/Invites"
              className="hover:text-green Nlg:text-xs hover:underline px-3 py-2 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
            >
              Invite
            </a>
            <a
              href={`/layout/viewers/${userId}`}
              className="hover:text-green Nlg:text-xs hover:underline px-3 py-2 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
            >
              Viewers
            </a>
            <a
              href="/layout/find-in-tree"
              className="hover:text-green Nlg:text-xs hover:underline px-3 py-2 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
            >
              Find in Tree
            </a>
            <a
              href="#"
              className="hover:text-green Nlg:text-xs hover:underline px-3 py-2 rounded-md transition ease-in-out duration-200 transform hover:scale-105"
            >
              Custom Tree
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
