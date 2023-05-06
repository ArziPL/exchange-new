import Head from "next/head";
import { useRouter } from "next/router";
import AssetComponent from "../../components/Asset/AssetComponent";

export default function Dashboard() {
  const router = useRouter();
  let symbol = "";
  if (typeof router.query.symbol == "string") {
    symbol = router.query.symbol.toUpperCase();
  }

  return (
    <>
      <Head>
        <title>{symbol}</title>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AssetComponent />
    </>
  );
}