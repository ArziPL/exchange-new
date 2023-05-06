// Table with crypto bars on the left
import { CryptoObject } from "../../types/types";
import CryptoBar from "./CryptoBar";

type CryptoChanges = {
  sortedCryptos: CryptoObject[];
  menuChoose: string;
};
function CryptoChanges(props: CryptoChanges) {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-[40px] flex justify-center items-center text-lg font-semibold">
        Best changes over last {props.menuChoose}
      </div>
      <div className="w-full h-[40px] flex justify-center items-center text-lg font-semibold pl-2">
        <div className="w-[15%]">Icon</div>
        <div className="w-[40%]">Name</div>
        <div className="w-[25%]">Price</div>
        <div className="w-[20%]">Change</div>
      </div>
      <div>
        {props.sortedCryptos.map((crypto) => {
          return <CryptoBar key={crypto.id} crypto={crypto} menuChoose={props.menuChoose} />;
        })}
      </div>
    </div>
  );
}

export default CryptoChanges;
