import Head from "next/head";
import DashboardComponent from "../components/Dashboard/DashboardComponent";
import useArticlesStore from "../stores/useArticlesStore";
import useCryptoStore from "../stores/useCryptoStore";
import { CryptoDataFromApi, Article } from "../types/types";

type Dashboard = {
  crypto: CryptoDataFromApi;
  articles: Array<Article>;
}
export default function Dashboard({ crypto, articles }: Dashboard) {
  // Saving to stores data from all API's - CryptoMarketCap and crypto-articles-api
  useCryptoStore.setState({ crypto: crypto });
  useArticlesStore.setState({ articles: articles });
  return (
    <>
      <Head>
        <title>Exboard</title>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <DashboardComponent />
    </>
  );
}

// Getting static props, revalidating every 274 seconds because per month this results in approximately 9800 requests, where free CryptoMarketCap plan provides 10 000 requests per month 
export async function getStaticProps() {
  // Crypto assets
  const cryptoRes = await fetch("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
    headers: {
      "X-CMC_PRO_API_KEY": `${process.env.API_KEY}`,
    },
  });
  const crypto = await cryptoRes.json();

  // Articles
  const articleRes = await fetch("http://127.0.0.1:4000/articles");
  const articles = await articleRes.json();

  if (!articleRes.ok || !cryptoRes.ok) {
    throw new Error(`Failed to fetch data`);
  }

  return {
    props: {
      crypto,
      articles,
    },
    revalidate: 274,
  };
}
