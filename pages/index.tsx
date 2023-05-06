// Basically loading page, it will show loading screen until dashboard component is not loaded
import CircularProgress from "@mui/material/CircularProgress";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Trademark from "../components/common/Trademark";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div>
      <Head>
        <title>Exchange</title>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-screen h-screen bg-slate-200 z-99 flex flex-col justify-center items-center absolute top-0 left-0 gap-5">
        <Trademark />
        <div>Welcom to Exchange! We are loading assets right now, please wait</div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Home;
