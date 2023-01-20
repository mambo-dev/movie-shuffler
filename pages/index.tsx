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
import Image from "next/image";

import Link from "next/link";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import prisma from "../lib/prisma";

type User = {
  id: number;
  email: string;
};

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
  const router = useRouter();
  const [play, setPlay] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (Cookies.get("user")) {
      //@ts-ignore
      setUser(JSON.parse(Cookies.get("user")));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Head>
        <title>thee show shuffler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            This is a simple website that helps you decide what you will rewatch
            from the genius mind of{" "}
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
            algorithm randomly pick one for you. Hope you love it. Follow the
            links here please
            <Link href="/auth/login">
              <strong className="text-blue-700 font-semibold hover:underline">
                {" "}
                sign-in{" "}
              </strong>
            </Link>
            or
            <Link href="/auth/sign-up">
              <strong className="text-blue-700 font-semibold hover:underline">
                {" "}
                sign-up
              </strong>
            </Link>
          </motion.p>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  const user = JSON.parse(context.req.cookies.user);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/shows/shuffle",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}
