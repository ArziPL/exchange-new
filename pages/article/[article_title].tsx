import Head from "next/head";
import { useRouter } from "next/router";
import ArticleComponent from "../../components/Article/ArticleComponent";
import { Article } from "../../types/types";

export default function Article() {
  const router = useRouter();
  const article = router.query;

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ArticleComponent article={article} />
    </>
  );
}
