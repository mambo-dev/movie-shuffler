import Image from "next/image";
import React, { useState } from "react";

import { motion } from "framer-motion";
import prisma from "../../lib/prisma";
import Modal from "../../components/modal";
import SearchAndAdd from "../../components/search-and-add";
import { error } from "../shows/shuffle";
import EditShow from "../../components/favoutrites/edit-show";
import DeleteShow from "../../components/favoutrites/delete-show";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type Props = {
  movies: any;
};

export default function Page({ movies }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState();

  const [addFav, setAddFav] = useState(false);
  const [error, setError] = useState<error>({
    message: "",
  });
  const router = useRouter();
  async function handleLogout() {
    //@ts-ignore
    Cookies.set("user", null);
    router.push("/");
  }

  return (
    <main className="w-full min-h-screen py-10 px-2 overflow-hidden">
      <header className="w-full bg-black/90 h-14 shadow-md flex items-center px-2 py-1 shadow-gray-700">
        <div>
          <span className="text-gray-50">Show Shuffle</span>
        </div>
        <div className="ml-auto  flex items-center gap-x-4">
          <Link href="/">
            <p className="text-slate-500  hover:underline text-sm w-fit m-auto font-semibold ">
              home
            </p>
          </Link>
          <button
            onClick={handleLogout}
            className="ml-auto bg-gray-800/50 hover:bg-gray-900 py-2 h-12 w-12 rounded-full inline-flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-slate-200 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </header>
      <div className="w-full h-fit px-2 py-5 flex items-center justify-between  md:justify-end gap-x-4  md:px-4 font-semibold">
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
          addShow={true}
        >
          <SearchAndAdd
            setError={setError}
            setAddFav={setAddFav}
            setIsOpen={setIsOpen}
          />
        </Modal>
      </div>
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 py-10 px-1">
        {movies?.map((movie: any) => (
          <div
            key={movie?.id}
            className="relative group min-w-full min-h-full w-64 h-60 rounded-lg  bg-black "
          >
            <Image
              src={movie.image_link}
              alt="shuffle-pic"
              className="w-full h-full rounded-lg absolute"
              fill
              sizes=""
            />
            <motion.div
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, y: -300 }}
              transition={{ duration: 0.5 }}
              className="w-full h-14  gap-x-4 py-4 invisible group-hover:visible bg-black/60 bg-gradient-to-t from-black via-black/30 to-transparent rounded-tl-lg rounded-tr-lg flex items-center p-1  justify-end absolute bottom-0 left-0 right-0  "
            >
              <Modal
                isOpen={moreOpen}
                setIsOpen={setMoreOpen}
                title="view show details"
              >
                <EditShow
                  open={moreOpen}
                  setOpen={setMoreOpen}
                  movie={selectedShow}
                />
              </Modal>
              <button
                onClick={() => {
                  setMoreOpen(true);
                  setSelectedShow(movie);
                }}
                className=" inline-flex items-center disabled:bg-gray-500 justify-center w-12 h-12 rounded-2xl bg-gray-300     hover:shadow-slate-200 focus:shadow-gray-900 focus:bg-gray-400 focus:shadow-md text-white"
              >
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
              <Modal
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
                title="delete show from favourites"
              >
                <DeleteShow
                  open={deleteOpen}
                  setOpen={setDeleteOpen}
                  show={selectedShow}
                />
              </Modal>
              <button
                onClick={() => {
                  setDeleteOpen(true);
                  setSelectedShow(movie);
                }}
                className=" inline-flex items-center disabled:bg-gray-500 justify-center w-12 h-12 rounded-2xl bg-gray-300   hover:shadow-slate-200 focus:shadow-gray-900 focus:bg-gray-400 focus:shadow-md text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
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

export async function getServerSideProps<GetServerSideProps>(context: any) {
  const user = JSON.parse(context.req.cookies.user);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const db_result = await prisma.user_shows.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
    include: {
      show: true,
    },
  });

  const user_shows = db_result.map((result) => {
    const { created_at, updated_at, ...shows } = result.show;
    return { ...shows };
  });

  return {
    props: {
      movies: user_shows,
    }, // will be passed to the page component as props
  };
}
