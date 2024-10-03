import React from "react";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[90%] h-[92%] bg-gray-700 opacity-70 backdrop-blur-sm pt-20">
      <div className="h-14 w-full py-auto flex flex-wrap justify-center py-2">
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `w-full justify-start pt-0.5 flex flex-wrap text-lg text-white ${
              isActive ? "border-r-4 border-blue-700" : ""
            }`
          }
        >
          <div className="w-[30%] pr-4 flex flex-wrap justify-end">
            <FontAwesomeIcon className="text-white my-2" icon={faList} />
          </div>
          <span className="hidden sm:flex py-1">WatchList</span>
        </NavLink>
      </div>

      <div className="h-14 py-auto w-full flex flex-wrap justify-center py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `justify-start flex flex-wrap pt-0.5 w-full text-lg text-white ${
              isActive ? "border-r-4 border-blue-700" : ""
            }`
          }
        >
          <div className="w-[30%] pr-4 flex flex-wrap justify-end">
            <FontAwesomeIcon className="text-white my-2" icon={faHome} />
          </div>
          <span className="hidden sm:flex py-1">Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
