import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import useDebounce from "../hooks/debounce";
import axios from "axios";
import { error } from "../pages";

type Props = {
  setAddFav: Dispatch<React.SetStateAction<boolean>>;
  setError: Dispatch<React.SetStateAction<error>>;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchAndAdd({ setAddFav, setError }: Props) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<null | number>();
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_ENV_VARIABLE}&language=en-US&page=1&query=${debouncedSearch}&include_adult=false`
        )
        .then((response) => {
          const responseData = response.data.results.map((response: any) => {
            return {
              id: response.id,
              image_link: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
              original_path: response.poster_path,
              movie_name: response.original_name,
              movie_description: response.overview,
            };
          });
          setMovies(responseData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [debouncedSearch]);

  async function addToRewatch(movie: any) {
    try {
      setSelected(movie.id);
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/shows/add-show`,
        {
          ...movie,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { error, data } = response.data;

      if (data) {
        setAddFav(true);
        setLoading(false);
        setTimeout(() => {
          setAddFav(false);
          setSelected(null);
        }, 3000);
      }

      if (error) {
        setLoading(false);
        console.log(error);
        if (error.code === "23505") {
          setError({
            message: "you alredy have this in your list",
          });

          setTimeout(() => {
            setError({
              message: "",
            });
          }, 3000);
        } else {
          setError({
            message: error.message,
          });

          setTimeout(() => {
            setError({
              message: "",
            });
          }, 3000);
        }

        setSelected(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSelected(null);
    }
  }

  return (
    <div className="w-full h-full flex flex-col px-2 ">
      <form className="w-full flex items-center ">
        <input
          type="text"
          placeholder="start typing to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none px-1 py-2 rounded bg-black text-white font-semibold"
        />
      </form>
      <div className="w-full h-full py-5 flex flex-col items-center gap-y-4 ">
        {movies.map((movie: any, index: number) => (
          <div
            key={index}
            className="relative bg-black/80 w-full rounded h-24 flex gap-y-2"
          >
            <div className="relative rounded-l h-24 w-24 ">
              <Image
                src={
                  movie.original_path === null
                    ? "/images/not-found.svg"
                    : movie.image_link
                }
                alt="movie-images"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                className="rounded-l"
              />
            </div>
            <div className="relative w-3/4 rounded-l flex flex-col px-2 gap-y-2 py-2 text-gray-500 truncate items-start font-bold justify-between">
              <p>{movie.movie_name}</p>

              {loading && selected === movie.id ? (
                <button
                  onClick={() => {
                    addToRewatch(movie);
                  }}
                  className="bg-green-600 hover:bg-green-500 inline-flex items-center gap-x-4 justify-center w-full rounded py-2 text-white"
                >
                  <div className="flex items-center justify-center ">
                    <div className="w-6 h-6  border-l-2  border-gray-100 rounded-full animate-spin"></div>
                  </div>
                  <p className="animate-pulse"> loading ...</p>
                </button>
              ) : (
                <button
                  onClick={() => addToRewatch(movie)}
                  className="bg-green-600 hover:bg-green-500 inline-flex items-center gap-x-4 justify-center w-full rounded py-2 text-white truncate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>
                  <p className="hidden md:flex"> add to rewatchs</p>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
