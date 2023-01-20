import React from "react";

type Props = {};

export default function DeleteShow({ setOpen, Open }: any) {
  return (
    <div className="max-w-1/2 w-[600px] h-[300px] overflow-y-auto bg-gray-900 rounded shadow flex flex-col gap-y-2">
      <div className="w-full flex items-center p-2 justify-end">
        <button
          className="outline-none rounded-full h-8 w-8"
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-full h-full font-semibold text-slate-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
