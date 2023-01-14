import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { error } from ".";
import { supabase } from "../lib/supabaseClient";

type Props = {};

export default function SignUp({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<error>({ message: "" });
  const router = useRouter();
  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data) {
      setLoading(false);
      router.push("/");
    }

    if (error) {
      setError({
        message: error.message,
      });
      setLoading(false);

      setTimeout(() => {
        setError({
          message: "",
        });
      }, 3000);
    }
  }
  return (
    <div className="w-full h-full py-32">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmail();
        }}
        className="w-full rounded py-10 px-1 m-auto text-white font-semibold flex items-center justify-center   gap-y-4 flex-col md:w-3/4"
      >
        <h1 className="text-3xl">welcome</h1>
        <input
          className="bg-gray-900 placeholder-slate-50  px-1 focus:border focus:border-slate-50 outline-none w-full py-4 rounded"
          value={email}
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="bg-gray-900 px-1 placeholder-slate-50  focus:border focus:border-slate-50 outline-none w-full py-4 rounded"
          value={password}
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 inline-flex w-full rounded py-4  items-center justify-center text-white font-bold"
        >
          {loading ? "loading..." : "sign up"}
        </button>
        <Link href="/sign-up">
          <p className="hover:underline hover:text-opacity-80 text-gray-100 m-auto">
            do have an account? log in
          </p>
        </Link>
        {error.message.length > 0 && (
          <p className="font-bold hover:text-opacity-80 text-red-600 m-auto">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
