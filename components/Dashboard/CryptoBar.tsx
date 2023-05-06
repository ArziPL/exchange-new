// Every crypto bar inside table on the left
import Link from "next/link";
import { CryptoObject } from "../../types/types";
import getCryptoImage from "../../utils/getCryptoImage";

type CryptoBar = {
  crypto: CryptoObject;
  menuChoose: string;
};

function CryptoBar(props: CryptoBar) {
  const crypto = props.crypto;
  const menuChoose = props.menuChoose;

  // Return percent change based on user change choice
  const cryptoChangeChoice = () => {
    if (menuChoose === "1h") {
      return crypto.quote.USD.percent_change_1h;
    } else if (menuChoose === "24h") {
      return crypto.quote.USD.percent_change_24h;
    } else if (menuChoose === "7d") {
      return crypto.quote.USD.percent_change_7d;
    } else {
      return crypto.quote.USD.percent_change_1h;
    }
  };

  return (
    <Link href={"/asset/" + crypto.symbol.toLowerCase()}>
      <div className="w-full h-[70px] flex justify-start items-center hover:bg-slate-300 cursor-pointer pl-2">
        <div className="w-[15%]">{getCryptoImage(crypto.symbol)}</div>
        <div className="w-[40%]">
          {crypto.name} ({crypto.symbol})
        </div>
        <div className="w-[25%]">
          <b>${crypto.quote.USD.price.toFixed(3)}</b>
        </div>
        <div className="w-[20%]">
          <b className={cryptoChangeChoice() > 0 ? "text-green-500" : "text-red-500"}>
            {cryptoChangeChoice().toFixed(3)}%
          </b>
        </div>
      </div>
    </Link>
  );
}

export default CryptoBar;
