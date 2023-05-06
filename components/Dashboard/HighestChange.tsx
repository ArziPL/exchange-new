// Card with highest change of all cryptos/time periods
import { CryptoObject } from "../../types/types";

type HighestChange = {
  cryptoObject: CryptoObject;
  highestChange: number;
  timePeriod: string;
};

function HighestChange(props: HighestChange) {
  return (
    <div className="w-[90%] h-[70px] bg-white flex justify-center items-center text-lg p-3 xl:[95%] xl:text-sm">
      <div>
        <b>
          {props.cryptoObject.name}({props.cryptoObject.symbol})
        </b>{" "}
        changed by{" "}
        <b className={props.highestChange > 0 ? "text-green-500" : "text-red-500"}>{props.highestChange.toFixed(3)}%</b>{" "}
        in {props.timePeriod}!{" "}
      </div>
    </div>
  );
}

export default HighestChange;
