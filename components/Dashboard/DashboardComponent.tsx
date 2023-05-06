// Component with all the content rendered in /dashboard
import _ from "lodash";
import { useEffect, useState } from "react";
import useArticlesStore from "../../stores/useArticlesStore";
import useCryptoStore from "../../stores/useCryptoStore";
import useUserStore from "../../stores/useUserStore";
import CryptoChanges from "./CryptoChanges";
import DashPrints from "./DashPrints";
import NewsSection from "./NewsSection";

export default function DashboardComponent() {
  const [prints, setPrints] = useState([]);
  const isLogged = useUserStore((state) => state.isLogged);
  const menuChoose = useUserStore((state) => state.menuChoose);
  const user = useUserStore();
  const articles = useArticlesStore((state) => state.articles);
  const cryptos = useCryptoStore((state) => state.crypto.data);

  // Sort all crypto assets based on percent change (time period dependent on user choice)
  const sortedCryptos = _.orderBy(cryptos, [`quote.USD.percent_change_${menuChoose}`], ["desc"]);

  // Get prints on load
  useEffect(() => {
    if (isLogged) {
      fetch("/api/getPrints", {
        method: "POST",
        body: JSON.stringify({ id: user.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPrints(data.prints);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  // Done this way because in fetch or useEffect or any other way it was freezing the entire application
  const returnSortedPrints = () => {
    return _.sortBy(prints, "createdAt").reverse();
  };

  // Not used currently
  // Return : [cryptoObject,highestChange(number), time period(string)] of coin with highest change over given period of time, probably to refactor in the future
  // @ts-ignore
  // const findHighestChange = (): [CryptoObject, number, string] => {
  //   let sortedCryptos1h = _.orderBy(cryptos, [`quote.USD.percent_change_1h`], ["desc"]);
  //   let sortedCryptos24h = _.orderBy(cryptos, [`quote.USD.percent_change_24h`], ["desc"]);
  //   let sortedCryptos7d = _.orderBy(cryptos, [`quote.USD.percent_change_7d`], ["desc"]);

  //   let highestChange1h = sortedCryptos1h[0].quote.USD.percent_change_1h;
  //   let highestChange24h = sortedCryptos24h[0].quote.USD.percent_change_24h;
  //   let highestChange7d = sortedCryptos7d[0].quote.USD.percent_change_7d;

  //   if (Math.max(highestChange1h, highestChange24h, highestChange7d) === highestChange1h) {
  //     return [sortedCryptos1h[0], sortedCryptos1h[0].quote.USD.percent_change_1h, "1h"];
  //   } else if (Math.max(highestChange1h, highestChange24h, highestChange7d) === highestChange24h) {
  //     return [sortedCryptos24h[0], sortedCryptos24h[0].quote.USD.percent_change_24h, "24h"];
  //   } else if (Math.max(highestChange1h, highestChange24h, highestChange7d) === highestChange7d) {
  //     return [sortedCryptos7d[0], sortedCryptos7d[0].quote.USD.percent_change_7d, "7d"];
  //   }
  // };
  // const highestChange = findHighestChange();

  return (
    <div className="flex flex-col">
      <div className="w-full h-[230px] shadow xl:h-auto">
        <NewsSection articles={articles} />
      </div>
      <div className="flex xl:flex-col">
        <div className="w-1/2 h-auto shadow xl:w-full">
          <CryptoChanges menuChoose={user.menuChoose} sortedCryptos={sortedCryptos} />
        </div>
        <div className="w-1/2 h-auto shadow xl:w-full">
          <DashPrints prints={returnSortedPrints()} cryptos={cryptos} isLogged={isLogged} />
        </div>
      </div>
    </div>
  );
}

// Old components, maybe i will use them
{
  /* <CryptoChanges menuChoose={user.menuChoose} sortedCryptos={sortedCryptos} />
<HelloCard isLogged={isLogged} nick={user.nick} />
<HighestChange cryptoObject={highestChange[0]} highestChange={highestChange[1]} timePeriod={highestChange[2]} />;
<DashPrints prints={prints} cryptos={cryptos} isLogged={isLogged} />
<NewsSection articles={articles} /> */
}
