// Table with prints on right site
import { CryptoObject, Print } from "../../types/types";
import PrintBar from "./PrintBar";

type DashPrints = {
  prints: Print[];
  cryptos: CryptoObject[];
  isLogged: boolean;
};

function DashPrints(props: DashPrints) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full text-lg flex justify-center font-semibold">Your prints</div>
      <div className="w-full h-full ">
        <div className="flex font-semibold">
          <div className="w-[15%] pl-2">Icon</div>
          <div className="w-[30%]">Name</div>
          <div className="w-[15%]">Price</div>
          <div className="w-[20%]">Time passed</div>
          <div className="w-[20%]">Price change</div>
        </div>
        {typeof props.prints == "undefined" || props.prints.length === 0 ? (
          <div className="text-center font-semibold text-xl mt-10">You don&apos;t have any prints yet</div>
        ) : (
          props.prints.map((print) => {
            return <PrintBar key={print.id} print={print} cryptos={props.cryptos} />;
          })
        )}
        {props.isLogged ? <div></div> : <div className="text-center">Please login to create/see your own prints!</div>}
      </div>
    </div>
  );
}

export default DashPrints;
