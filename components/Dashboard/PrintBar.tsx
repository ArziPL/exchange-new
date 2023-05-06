// Every single print bar in print section
import Link from "next/link";
import { Print, CryptoObject } from "../../types/types";
import getCryptoImage from "../../utils/getCryptoImage";

type PrintBar = {
  print: Print;
  cryptos: CryptoObject[];
};

function PrintBar(props: PrintBar) {
  const { print, cryptos } = props;
  let cryptoObject: CryptoObject = {} as CryptoObject;

  let change: number = 0;
  // Find crypto in store based on symbol
  cryptos.forEach((crypto_object: any) => {
    if (crypto_object.symbol == print.symbol.toUpperCase()) {
      cryptoObject = crypto_object;
      // Calculating change from today to day print was saved
      change = cryptoObject.quote.USD.price - print.price;
    }
  });

  // Calculate days passed from today to day when print was done
  const calculateDaysPassed = (date: string) => {
    const dateNow = new Date();
    const datePrint = new Date(date);
    const timeDiff = Math.abs(dateNow.getTime() - datePrint.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays - 1;
  };
  return (
    <Link href={"/asset/" + print.symbol.toLowerCase()}>
      <div className="w-full h-[70px] flex justify-start items-center hover:bg-slate-300 cursor-pointer">
        <div className="w-[15%] pl-2">{getCryptoImage(print.symbol)}</div>
        <div className="w-[30%]">
          {print.name} ({print.symbol})
        </div>
        <div className="w-[15%]">
          <b>${parseFloat(print.price.toString()).toFixed(3)}</b>
        </div>
        <div className="w-[20%]">{calculateDaysPassed(print.createdAt)} days</div>
        <div className="w-[20%]">
          <b className={change > 0 ? "text-green-500" : "text-red-500"}>{change.toFixed(3)}$</b>
        </div>
      </div>
    </Link>
  );
}

export default PrintBar;
