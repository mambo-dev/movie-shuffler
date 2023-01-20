import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";

type Props = {
  movies: any;
};

export default function Page({ movies }: Props) {
  console.log(movies);
  return (
    <main className="w-full min-h-screen py-10 px-2 overflow-hidden">
      <header className="w-full bg-black/90 h-14 shadow-md flex items-center px-2 shadow-gray-700">
        <div>
          <span className="text-gray-50">Show Shuffle</span>
        </div>
      </header>
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 py-10 px-1">
        {movies?.map((movie: any) => (
          <div
            key={movie?.id}
            className="relative group min-w-full min-h-full w-[300px] h-[280px] rounded-lg shadow bg-black shadow-gray-800"
          >
            <Image
              src={movie.image_link}
              alt="shuffle-pic"
              className="w-full h-full rounded-lg absolute"
              fill
              sizes=""
            />
            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, y: -300 }}
              transition={{ duration: 0.5 }}
              className="w-full h-14  gap-x-4 py-2 invisible group-hover:visible bg-black/60 rounded-tl-lg rounded-tr-lg flex items-center p-1  justify-end absolute bottom-0 left-0 right-0  "
            >
              <button className=" inline-flex items-center disabled:bg-gray-800 justify-center w-12 h-12 rounded-full bg-gray-800 bg-opacity-10 hover:bg-opacity-100  hover:shadow-slate-200 focus:shadow-gray-900 focus:bg-gray-900 focus:shadow-md text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </button>
              <button className=" inline-flex items-center disabled:bg-gray-800 justify-center w-12 h-12 rounded-full bg-gray-800 bg-opacity-10 hover:bg-opacity-100  hover:shadow-slate-200 focus:shadow-gray-900 focus:bg-gray-900 focus:shadow-md text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        ))}
      </main>
    </main>
  );
}

export async function getServerSideProps<getServerSideProps>(context: any) {
  return {
    props: {
      movies: [],
    }, // will be passed to the page component as props
  };
}
