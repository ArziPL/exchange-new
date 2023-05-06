// Every one print that is displayed
import Link from "next/link";
import useCryptoStore from "../../stores/useCryptoStore";
import { CryptoObject, Print } from "../../types/types";
import getCryptoImage from "../../utils/getCryptoImage";

type PrintCard = {
  print: Print;
};

export default function PrintCard(props: PrintCard) {
  const { print } = props;
  const cryptos = useCryptoStore((state) => state.crypto.data);
  let cryptoObject: CryptoObject = {} as CryptoObject;

  // Calculating days passed from today to day print was saved
  const calculateDaysPassed = (date: string) => {
    const dateNow = new Date();
    const datePrint = new Date(date);
    const timeDiff = Math.abs(dateNow.getTime() - datePrint.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays - 1;
  };

  // Finding crypto in store based on symbol of print
  let change: number = 0;
  cryptos.forEach((crypto_object: any) => {
    if (crypto_object.symbol == print.symbol.toUpperCase()) {
      cryptoObject = crypto_object;
      // Calculating change from today to day print was saved
      change = cryptoObject.quote.USD.price - print.price;
    }
  });

  return (
    <Link href={"/asset/" + print.symbol.toLowerCase()}>
      <div className="w-full h-[120px] flex text-lg pl-5 shadow xl:flex-col xl:h-auto xl:pt-5 xl:pb-5 xl:text-base hover:bg-slate-300 cursor-pointer">
        <div className="w-[15%] flex justify-start items-center gap-2 text-xl font-semibold xl:w-full xl:justify-center">
          {getCryptoImage(print.symbol)}
          {print.name}
        </div>
        <div className="w-[20%] flex justify-start items-center xl:w-full xl:justify-center">
          Created at: {print.createdAt}
        </div>
        <div className="w-[20%] flex justify-center items-center xl:w-full xl:justify-center">
          <b>{calculateDaysPassed(print.createdAt)} days have passed since then</b>
        </div>
        <div className="w-[30%] flex flex-col justify-center items-start ml-auto xl:w-full xl:justify-center xl:items-center">
          <div>Price: ${parseFloat(print.price.toString()).toFixed(3)}</div>
          <div>Volume(24h) : ${print.volume24h}</div>
          <div>
            Change : <b className={change > 0 ? "text-green-500" : "text-red-500"}>{change.toFixed(3)}$</b>
          </div>
          <div style={{ display: typeof print.circulatingSupply === "number" ? "block" : "none" }}>
            Circulating supply: {print.circulatingSupply}
          </div>
          <div style={{ display: typeof print.marketDominance === "number" ? "block" : "none" }}>
            Market position: {print.marketDominance}
          </div>
        </div>
      </div>
    </Link>
  );
}
