import "../styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const status = process.env.NEXT_PUBLIC_WEB_STATUS;
  if (status === "maintainance") {
    return (
      <>
        <Head>
          <title>under construction </title>
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
          <div className="w-full md:w-3/4  text-white font-semibold m-auto py-10 flex flex-col items-center justify-center">
            <div className="relative w-64 h-56  md:w-[400px] md:h-[350px]">
              <Image
                alt="construction on going"
                src="/images/under-construction.svg"
                fill
                sizes=""
              />
            </div>
            <p className="text-xl text-green-500 font-bold">
              website is under construction! check later
            </p>
          </div>
        </main>
      </>
    );
  }
  return <Component {...pageProps} />;
}
