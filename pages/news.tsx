import Head from "next/head";
import NewsComponent from "../components/News/NewsComponent";
import useArticlesStore from "../stores/useArticlesStore";

export default function Dashboard() {
  const articles = useArticlesStore((state) => state.articles);
  return (
    <>
      <Head>
        <title>Ex-news</title>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NewsComponent articles={articles} />
    </>
  );
}
