import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation/Navigation";
import TopBar from "../components/TopBar/TopBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Css baseline from MUI and navigation for all pages
  return (
    <CssBaseline>
      <Navigation />
      <div className="w-[calc(100vw - 300px)] h-screen bg-slate-200 overflow-y-auto ml-[300px] lg:w-screen lg:ml-0 lg:mt-[100px]">
        <TopBar />
        <Component {...pageProps} />
      </div>
    </CssBaseline>
  );
}

export default MyApp;
