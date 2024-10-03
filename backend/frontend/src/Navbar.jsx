import React, { useState,useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCounterContext from "./Context";

const Navbar = () => {
  const { openModal, user } = useCounterContext();
  const [userName, setUserName] = useState("Login");

  useEffect(() => {
    if (user.length > 7) {
      setUserName(user.substring(0, 5) + "...");
    }
    else{
      setUserName(user);
    }
  },[user]);

  return (
    <div className="fixed top-0 h-12 opacity-70 py-2 border-b border-blue-400 backdrop-blur-sm z-50 w-full px-4 bg-gray-900 shadow-2xl">
      <div className="flex flex-wrap justify-end">
        <div
          className="flex flex-wrap border-2 border-blue-700 justify-center cursor-pointer rounded-md w-[10%] "
          onClick={openModal}
        >
          <FontAwesomeIcon
            className=" w-[40%] flex flex-wrap justify-end text-white my-2"
            icon={faUser}
          />
          <h5 className="w-[53%] py-1 flex flex-wrap justify-start mr-2">
            {userName}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
