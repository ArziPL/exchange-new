// Every iconLink in MUI dialog with crypto name/crypto img
import Link from "next/link";
import getCryptoImage from "../../utils/getCryptoImage";

type SearchResult = {
  symbol: string;
  name: string;
  handleClose: () => void;
}
export default function SearchResult(props: SearchResult) {
  return (
    <Link href={"/asset/" + props.symbol.toLowerCase()}>
      <div
        className="w-[calc(100%/4)] h-[100px] flex justify-center items-center cursor-pointer hover:bg-slate-200 lg:w-[50%] active:scale-[0.95]"
        onClick={props.handleClose}
      >
        {/* Crypto image */}
        <div className="w-[200px] flex flex-col justify-center items-center lg:w-auto">
          {getCryptoImage(props.symbol)}
          {/* Crypto name */}
          <div>{props.name}</div>
        </div>
      </div>
    </Link>
  );
}
