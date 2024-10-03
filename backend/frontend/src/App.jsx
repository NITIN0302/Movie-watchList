import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CounterProvider } from "./Context.js";
import getMovieData from "./getMoviedata.js";
import Home from "./Home.jsx";
import Watchlist from "./Watchlist.jsx";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import "./App.css";
import Modal from "./Modal.jsx";

function App() {
  const [searchedMovie, setSearchedMovie] = useState("Tom");
  const [user, setUser] = useState("Login");
  const [movieName, setMoviename] = useState("Tom");
  const movieData = getMovieData(movieName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMovie, setMovie] = useState([{}]);
  const [userEmail, setEmail] = useState("");

  const setUserMovie = (val) => {
    setMovie((userMovie) => [...userMovie, val]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setUserName = (name) => {
    setUser(name);
  };

  const setUserEmail = (email) => {
    setEmail(email);
  };

  useEffect(() => {}, [movieName]);

  return (
    <Router>
      <CounterProvider
        value={{
          user,
          isModalOpen,
          openModal,
          closeModal,
          setUserName,
          userMovie,
          setUserMovie,
          userEmail,
          setUserEmail,
        }}
      >
        <div
          className="w-full h-screen bg-scroll bg-cover bg-center"
          style={{
            backgroundImage: "url('/image/image4.jpg')"
          }}
        >
          <Navbar />

          <Modal isOpen={isModalOpen} onClose={closeModal} />

          <div className="h-full w-full flex flex-wrap pt-12">
            <div className="h-screen w-[20%] fixed">
              <Sidebar />
            </div>
            <div className="ml-[20%] w-[80%] h-[85%] flex flex-wrap justify-center">
              <div className="h-16 py-4 opacity-90 px-2 mt-4 w-[50%] flex flex-wrap bg-black border border-white justify-center rounded-2xl focus-within:border-2 focus-within:border-blue-500">
                <div className="py-1 px-2 rounded-l-md">
                  <FontAwesomeIcon className="text-gray-500" icon={faSearch} />
                </div>
                <input
                  className="w-[70%] outline-none bg-black text-white opacity-60 px-2"
                  placeholder="Movie Name"
                  value={searchedMovie}
                  onChange={(e) => setSearchedMovie(e.target.value)}
                />
                <div className="rounded-r-md">
                  <button
                    className="text-white font-bold px-2 py-1 rounded-r-md btn-color"
                    onClick={() => {
                      setMoviename(searchedMovie);
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <Routes>
                <Route path="/" element={<Home movieData={movieData} />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </div>
          </div>
        </div>
      </CounterProvider>
    </Router>
  );
}

export default App;
