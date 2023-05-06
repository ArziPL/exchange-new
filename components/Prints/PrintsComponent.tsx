// Component with all the content rendered in /prints
import _ from "lodash";
import { useEffect, useState } from "react";
import useUserStore from "../../stores/useUserStore";
import Prints from "./Prints";
import PrintsEmpty from "./PrintsEmpty";
export default function PrintsComponent() {
  const [prints, setPrints] = useState([]);
  const isLogged = useUserStore((state) => state.isLogged);
  const user = useUserStore();

  // Get prints of user
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
  }, []);

  // Done this way because in fetch or useEffect or any other way it was freezing the entire application
  const returnSortedPrints = () => {
    return _.sortBy(prints, "createdAt").reverse();
  };

  // Display component dependent if prints are empty or not
  const handlePrints = () => {
    if (prints.length === 0) {
      return <PrintsEmpty />;
    }
    return <Prints prints={returnSortedPrints()} />;
  };

  return <div>{handlePrints()}</div>;
}
