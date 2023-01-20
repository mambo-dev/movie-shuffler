import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

type Props = {};

export default function SignUp({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3000/api/auth/sign-up", {
        email,
        password,
        confirm_password,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (!response.data.error) {
          setSuccess(true);
          Cookies.set("user", JSON.stringify(response.data.user));
          setTimeout(() => {
            setSuccess(false);
            router.push("/");
          }, 3000);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 409) {
          setError({
            message: error.response.data.error.message,
          });
        }
        setError({
          message: error.message,
        });
        setTimeout(() => {
          setError({
            message: "",
          });
        }, 3000);
      });
  }
  return (
    <div className="w-full px-2 py-32 md:w-3/4 m-auto lg:w-1/2">
      <h1 className="w-fit m-auto text-green-500  font-semibold text-xl  drop-shadow-md shadow-green-400">
        Welcome New Member
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full py-5 flex items-center flex-col justify-center text-white font-semibold h-full gap-y-4 placeholder-slate-500 placeholder-"
      >
        <div className="w-full group relative flex items-center gap-x-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 hidden md:flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full  md:flex-1 p-2 outline-none rounded-r  bg-gray-600 border border-gray-800 rounded shadow focus:ring-1 focus:ring-green-400 focus:ring-offset-1  focus:ring-offset-green-400/75"
          />
        </div>
        <div className="w-full group relative flex items-center gap-x-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 hidden md:flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full md:flex-1 flex-1 p-2 outline-none rounded-r  bg-gray-600 border border-gray-800 rounded shadow focus:ring-1 focus:ring-green-400 focus:ring-offset-1  focus:ring-offset-green-400/75 "
          />
        </div>

        <div className="w-full group relative flex items-center gap-x-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 hidden md:flex"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          <input
            type="password"
            name="confirm_password"
            placeholder="confirm password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" w-full md:flex-1 flex-1 p-2 outline-none rounded-r  bg-gray-600 border border-gray-800 rounded shadow focus:ring-1 focus:ring-green-400 focus:ring-offset-1  focus:ring-offset-green-400/75 "
          />
        </div>

        <button
          type="submit"
          className=" w-full md:w-1/2 lg:w-44 m-auto py-2 bg-green-600 rounded shadow focus:bg-green-700 "
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
      </form>
      {error.message.length > 0 && (
        <p className="text-red-500 font-semibold m-auto w-fit">
          {error.message}
        </p>
      )}
      {success && (
        <p className="text-green-500 font-semibold m-auto w-fit">
          successfully registered
        </p>
      )}
    </div>
  );
}
