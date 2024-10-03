import React from "react";

const MovieCard = ({ movie }) => {
  if (!movie) {
    return null;
  }

  console.log(movie);

  return (
    <div
      className="w-full h-full rounded-md  border border-blue-400 mx-4 my-8 relative"
      style={{
        backgroundImage: `url(${movie.Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "black",
      }}
    >
      <div className="absolute bottom-0 rounded-md bg-black w-full">
        <div className="h-[10%] max-h-[40px] hover:max-h-[100%] overflow-y-auto scrollbar-hide rounded-md px-2 py-2 transition-all duration-700 ease-in-out transform hover:translate-y-2">
          <p>{movie.Title}</p>
          <p>
            <span>Release Year :</span>({movie.Year})
          </p>
          <p>
            <span>Type :</span> {movie.Type}
          </p>
          <p>
            <span>About:</span> {movie.imdbId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
