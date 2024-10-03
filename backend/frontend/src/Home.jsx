import React from "react";
import MovieCard from "./MovieCard.jsx";
import useCounterContext from "./Context.js";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = ({ movieData }) => {
  const { userEmail } = useCounterContext();

  const addMovie = async (movie) => {
    if (userEmail == "") {
      alert("Please Login with valid email");
    } else {
      try {
        const response = await fetch(
          `/user/additionalInfo?email=${userEmail}`
        );
        const data = await response.json();

        if (response.ok) {
          const isMovieAdded = data.additionalInfo.some(
            (existingMovie) => existingMovie.imdbID === movie.imdbID
          );

          if (isMovieAdded) {
            alert("This movie is already in your watchlist.");
            return;
          }

          const movieInfo = {
            email: userEmail,
            movies: [
              {
                Title: movie.Title,
                Year: movie.Year,
                imdbID: movie.imdbID,
                Type: movie.Type,
                Poster: movie.Poster,
              },
            ],
          };

          const addResponse = await fetch("/addinfo", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(movieInfo),
          });

          const addData = await addResponse.json();

          if (addResponse.ok) {
            alert("Movie added successfully!");
          } else {
            alert(`Error: ${addData.message}`);
          }
        } else {
          alert(`Error fetching movies: ${data.message}`);
        }
      } catch (error) {
        alert("An error occurred while adding the movie.");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-wrap scrollbar-hide overflow-auto max-height">
      {movieData.map((ele) => (
        <div className="relative w-[21%] h-[60%] m-4" key={ele.imdbID}>
          <MovieCard movie={ele} />
          <button
            className="absolute px-2 py-0.5 rounded-full top-9 left-5 bg-gray-600 "
            onClick={() => addMovie(ele)}
          >
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
