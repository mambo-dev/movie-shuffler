import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/window";
import Modal from "../components/modal";
import { GetServerSideProps } from "next";
import SearchAndAdd from "../components/search-and-add";
import Alert from "../components/alert";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Login from "./Login";
import Link from "next/link";
import { User, UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/router";

export type error = {
  message: string;
};
export default function Home({ movies }: any) {
  const [currentImage, setCurrentImage] = useState(0);
  const [shuffleEnd, setShuffleEnd] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [addFav, setAddFav] = useState(false);
  const { width, height } = useWindowSize();
  const [error, setError] = useState<error>({
    message: "",
  });
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [play, setPlay] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event);

        checkUser();
      }
    );
    checkUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.getUser();
    setUser(user.data.user);
  }

  const handleNext = () => {
    movies.length - 1 === currentImage
      ? setCurrentImage(0)
      : setCurrentImage((currentImage) => (currentImage += 1));
  };

  const handlePrevious = () => {
    currentImage === 0
      ? setCurrentImage(movies.length - 1)
      : setCurrentImage((currentImage) => (currentImage -= 1));
  };

  const handleShuffle = () => {
    setSuccess(false);
    setPlay(true);
    let myInterval = setInterval(() => {
      setCurrentImage(Math.floor(Math.random() * movies.length));
    }, 10);

    setTimeout(() => {
      clearInterval(myInterval);
      setShuffleEnd(true);
      setPlay(false);
    }, 8000);

    setTimeout(() => {
      setSuccess(true);
      setShuffleEnd(false);
    }, 9000);

    setTimeout(() => {
      setSuccess(false);
    }, 15000);
  };

  async function handleLogout() {
    setUser(null);
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      {success && <Confetti width={width} height={height} />}
      {addFav && <Alert message="added this show" />}
      {error.message.length > 0 && <Alert message={error.message} />}
      <Head>
        <title>thee show shuffler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? (
        <main className="w-full min-h-screen py-10 px-2 overflow-hidden">
          <header className="w-full bg-black/90 h-14 shadow-md flex items-center px-2 shadow-gray-700">
            <div>
              <span className="text-gray-50">Show Shuffle</span>
            </div>
          </header>
          <div className="w-full md:w-3/4  text-white font-semibold m-auto py-10">
            <motion.h1
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 1 }}
              className="text-green-500 text-xl  drop-shadow-[2px 2px 2px #56CE15]"
            >
              Hello series Lover
            </motion.h1>
            <motion.p
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 2 }}
            >
              This is a simple website that helps you decide what you will
              rewatch from the genius mind of{" "}
              <motion.strong
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="text-green-500 text-opacity-80 drop-shadow-xl text-lg"
              >
                Michael
              </motion.strong>{" "}
              and a little encouragement from some unkown named mwathy, Add your
              favorite movies to our database and let our easy-to-use shuffling
              algorithm randomly pick one for you. Hope you love it. If your new
              here please
              <Link href="/sign-up">
                <strong className="text-blue-700 font-semibold hover:underline">
                  {" "}
                  sign up{" "}
                </strong>
              </Link>
              if not, welcome back and{" "}
              <Link href="/Login">
                <strong className="text-blue-700 font-semibold  hover:underline">
                  {" "}
                  Log in{" "}
                </strong>
              </Link>
            </motion.p>
          </div>
        </main>
      ) : (
        <main className="w-full min-h-screen ">
          <header className="w-full bg-black/90 h-14 shadow-md flex items-center px-2 py-1 shadow-gray-700">
            <div>
              <span className="text-gray-50">Show Shuffle</span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto bg-gray-900/50 hover:bg-gray-900 py-2 h-12 w-12 rounded-full inline-flex items-center justify-center"
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </header>
          <div className="w-full h-screen py-4 flex flex-col items-center justify-center gap-y-4">
            <div className="w-full h-fit px-2 py-2 flex items-center justify-between  md:justify-end gap-x-4  md:px-4 font-semibold">
              <button
                onClick={handleShuffle}
                className="inline-flex items-center justify-center text-white px-2 h-9 bg-green-700 hover:bg-green-600 rounded w-24"
              >
                shuffle
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex hover:bg-slate-200/50 items-center  h-9 justify-center text-white px-2 py-1 bg-transparent border border-slate-300 rounded "
              >
                add show
              </button>
              <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="add some of your favourite shows"
              >
                <SearchAndAdd setError={setError} setAddFav={setAddFav} />
              </Modal>
            </div>
            {play && (
              <audio className="" autoPlay={true}>
                <source
                  src="/audio/drum-roll-please-6386.mp3"
                  type="audio/mp3"
                />
              </audio>
            )}
            <div className="w-full h-[90%]   flex flex-col items-center justify-center gap-y-4">
              <div className="w-full flex items-center justify-center margin-auto">
                <span className="text-gray-200 font-semibold ">
                  today you are watching...
                </span>
              </div>
              <div className="w-full py-2 px-2 overflow-hidden relative flex items-center justify-center gap-x-4 h-4/5">
                <AnimatePresence>
                  <motion.div
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className={`${
                      shuffleEnd &&
                      movies[currentImage]?.id === currentImage + 1
                        ? "border relative  border-slate-200 animate-pulse w-64 h-64  rounded-full"
                        : "rounded-lg relative w-full h-[450px] md:w-[450px] "
                    }  `}
                  >
                    <Image
                      src={movies[currentImage]?.image_link}
                      alt="shuffle-pic"
                      className={`${
                        shuffleEnd &&
                        movies[currentImage]?.id === currentImage + 1
                          ? "w-64 h-64  rounded-full"
                          : "w-full h-full rounded-lg absolute"
                      } `}
                      fill
                      sizes=""
                    />

                    <p></p>
                    {shuffleEnd &&
                      movies[currentImage]?.id === currentImage + 1 && (
                        <span className=" w-full h-full top-0 left-0 right-0 bottom-0 bg-black rounded-full absolute">
                          .
                        </span>
                      )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="w-full md:w-1/2  flex items-center justify-center gap-x-4">
                <button
                  onClick={handlePrevious}
                  className={`inline-flex group relative items-center disabled:bg-gray-800 justify-center w-12 h-12 rounded-full bg-black bg-opacity-10 hover:bg-opacity-50 text-gray-100`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <motion.path
                      variants={{
                        hidden: {
                          pathLength: 0,
                          fill: "rgba(255, 255, 255, 0)",
                        },
                        visible: {
                          pathLength: 1,
                          fill: "rgba(255, 255, 255, 1)",
                        },
                      }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleShuffle}
                  className="inline-flex items-center disabled:bg-opacity-10 justify-center w-14 h-14 rounded-full bg-green-600  hover:bg-opacity-50 text-gray-100"
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
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className=" inline-flex items-center disabled:bg-gray-800 justify-center w-12 h-12 rounded-full bg-black bg-opacity-10 hover:bg-opacity-50 text-gray-100"
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
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

type Data = {};
//<{ data: Data }>

export async function getServerSideProps<GetServerSideProps>(context: any) {
  let { data } = await supabase.from("show").select();

  return {
    props: {
      movies: data,
    }, // will be passed to the page component as props
  };
}
