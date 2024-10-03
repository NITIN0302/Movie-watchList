import React, { useState } from "react";
import useCounterContext from "./Context";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { setUserName, setUserEmail } = useCounterContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email };

    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setUserName(data.user.name);
        setUserEmail(data.user.email);
        // Optionally reset the form fields
        setName("");
        setEmail("");
        onClose(); // Close modal after successful login
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black opacity-90 rounded-lg p-6 w-1/3 border border-blue-700">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-lg font-bold mb-2">LOGIN</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-center">
            <input
              className="w-full border border-white focus:border-none outline-none focus:outline-blue-700 rounded-md bg-black text-white py-1 px-2 mb-4"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="w-full border border-white focus:border-none outline-none focus:outline-blue-700 rounded-md bg-black text-white py-1 px-2 mb-4"
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="w-full flex flex-wrap justify-around">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
