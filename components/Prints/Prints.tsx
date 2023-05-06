// Displayed if user has some prints
import { Print } from "../../types/types";
import PrintCard from "./PrintCard";

type Prints = {
  prints: Array<Print>;
};

export default function Prints(props: Prints) {
  const prints = props.prints;
  return (
    <div>
      {prints.map((print, index) => {
        return <PrintCard key={index} print={print} />;
      })}
    </div>
  );
}
