import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard.jsx";
import useCounterContext from "./Context.js";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Watchlist = () => {
  const [movieList, setMovieList] = useState([]);
  const { userEmail } = useCounterContext();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `/user/additionalInfo?email=${userEmail}`
        );
        const data = await response.json();
        if (response.ok) {
          setMovieList(data.additionalInfo || []);
        } else {
          console.error(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [userEmail]);

  const removeMovie = async (imdbID) => {
    try {
      const response = await fetch("http://localhost:3000/removeMovie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, imdbID: imdbID }),
      });

      const data = await response.json();

      if (response.ok) {
        setMovieList((prevMovies) =>
          prevMovies.filter((movie) => movie.imdbID !== imdbID)
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while removing the movie.");
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap scrollbar-hide overflow-auto max-height">
      {movieList.length > 0 ? (
        movieList.map((movie, index) => (
          <div className="relative w-[21%] h-[60%] m-4" key={index}>
            <MovieCard movie={movie} />
            <button
              className="absolute px-2 rounded-full top-10 left-6 bg-red-600"
              onClick={() => removeMovie(movie.imdbID)}
            >
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </div>
        ))
      ) : (
        <p>No movies in watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
