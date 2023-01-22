import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function EditShow({ setOpen, Open, movie }: any) {
  const router = useRouter();
  return (
    <div className="m-auto max-w-1/2   w-full h-screen  md:w-[800px] md:h-[600px] overflow-y-auto bg-gray-900 rounded shadow flex flex-col gap-y-2">
      <div className="w-full max-h-1/4 h-3/4  rounded relative">
        <Image
          src={movie?.image_link}
          alt="description"
          fill
          sizes=""
          className="rounded-t"
        />
        <div className="w-full flex items-center p-2 justify-end absolute top-2 right-0">
          <button
            className="outline-none rounded-full h-8 w-8"
            onClick={() => {
              setOpen(false);
              router.reload();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-full font-bold text-slate-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <span className="absolute bottom-0 right-0 left-0  h-20 bg-gradient-to-t from-black/80 via-black/40  ">
          .
        </span>
      </div>
      <div className="text-slate-200 font-medium first-letter:capitalize px-2 flex flex-col gap-y-2">
        <p className=" font-bold text-slate-400 ">{movie?.movie_name}</p>
        <p>{movie?.movie_description}</p>
      </div>
    </div>
  );
}
