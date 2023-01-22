import axios from "axios";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { error } from "../../pages";

type Props = {};

export default function DeleteShow({ setOpen, Open, show }: any) {
  const [error, setErrors] = useState<error>({
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  async function deleteShow(movie: any) {
    try {
      setLoading(true);

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/shows/delete/${show.id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      const { error, data } = response.data;

      if (data) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          router.reload();
        }, 1000);
      }

      if (error) {
        setLoading(false);

        setErrors({
          message: error.message,
        });
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setErrors({
        message: error.message,
      });
      setTimeout(() => {
        setErrors({
          message: "",
        });
      }, 3000);
    }
  }
  return (
    <div className="md:max-w-1/2 px-2 w-full md:w-1/2 h-fit m-auto overflow-y-auto bg-gray-900 rounded shadow flex flex-col  py-5">
      <div className="w-full flex items-center p-2 justify-end">
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
      <div className="w-full flex gap-y-4 flex-col ">
        <span className="m-auto w-10 h-10 bg-red-200/80 rounded-full flex items-center justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </span>
        <p className="text-lg font-semibold text-slate-300">
          Are you sure you want to delete this from your favourites? This action
          cannot be undone.
        </p>
        <div className="w-full flex flex-col md:flex-row md:justify-end items-center">
          <button
            type="button"
            onClick={deleteShow}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {loading ? "Loading..." : "Delete"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
        {error.message.length <= 0 && (
          <p className="text-sm font-semibold text-red-500 m-auto w-fit">
            {error.message}
          </p>
        )}
        {success && (
          <p className="text-sm font-semibold text-red-500 w-fit m-auto">
            successfully deleted
          </p>
        )}
      </div>
    </div>
  );
}
