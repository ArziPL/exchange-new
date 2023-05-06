// Whole crypto table with all it's logic
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import _ from "lodash";
import { MouseEvent, useEffect, useState } from "react";
import { CryptoObject } from "../../types/types";
import MarketBar from "./MarketBar";

type CryptoTable = {
  cryptos: CryptoObject[];
};

function CryptoTable(props: CryptoTable) {
  const [sortingField, setSortingField] = useState("");
  const [sortingDirection, setSortingDirection] = useState("asc");
  const cryptos = props.cryptos;
  const [sortedCryptos, setSortedCryptos] = useState(cryptos);

  // On change on any sorting property refresh displayed cryptos
  useEffect(() => {
    if (sortingField == "") {
      setSortedCryptos(cryptos);
    } else {
      if (sortingDirection == "asc") {
        setSortedCryptos(_.sortBy(sortedCryptos, sortingField).reverse());
      } else if (sortingDirection == "desc") {
        setSortedCryptos(_.sortBy(sortedCryptos, sortingField));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingField, sortingDirection, cryptos]);

  // Handle clicking on header bar and sorting properties
  const handleSortingChoice = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, sortingKey: string) => {
    if (sortingField == "" || sortingField != sortingKey) {
      setSortingField(sortingKey);
      setSortingDirection("asc");
    } else if (sortingField == sortingKey && sortingDirection == "asc") {
      setSortingDirection("desc");
    } else if (sortingField == sortingKey && sortingDirection == "desc") {
      setSortingField("");
    }
  };

  // Generate arrow next to header field name based on sorting properties
  const handleArrowDisplay = (sortingKey: string) => {
    if (sortingKey == sortingField && sortingDirection == "asc") {
      return <ArrowUpwardIcon fontSize="small" />;
    } else if (sortingKey == sortingField && sortingDirection == "desc") {
      return <ArrowDownwardIcon fontSize="small" />;
    }
  };

  // Generate all header cells
  const generateHeaderCell = (index: number, width: string, name: string, sortingKey: string) => {
    return (
      <div
        className={
          "h-full flex justify-start items-center pl-2  hover:bg-slate-200 cursor-pointer select-none font-semibold " +
          `w-[${width}]`
        }
        onClick={(e) => handleSortingChoice(e, sortingKey)}
        key={index}
      >
        {name} {handleArrowDisplay(sortingKey)}
      </div>
    );
  };

  // Header cell data
  const headerCells = [
    { index: 0, width: "20%", name: "Name", sortingKey: "name" },
    { index: 1, width: "15%", name: "Price ($)", sortingKey: "quote.USD.price" },
    { index: 2, width: "20%", name: "Volume (24h$)", sortingKey: "quote.USD.volume_24h" },
    { index: 3, width: "calc(40%/3)", name: "Change (1h%)", sortingKey: "quote.USD.percent_change_1h" },
    { index: 4, width: "calc(40%/3)", name: "Change (24h%)", sortingKey: "quote.USD.percent_change_24h" },
    { index: 5, width: "calc(40%/3)", name: "Change (7d%)", sortingKey: "quote.USD.percent_change_7d" },
  ];

  return (
    <>
      <div className="w-[90%] h-[50px] bg-white rounded-[5px] mb-5 flex shadow min-w-[1100px]">
        {/* Header cells */}
        <div className="w-full flex">
          <div className="w-[5%] h-full flex justify-start items-center pl-2 select-none font-semibold">Icon</div>
          {headerCells.map((headerCell) => {
            {
              return generateHeaderCell(headerCell.index, headerCell.width, headerCell.name, headerCell.sortingKey);
            }
          })}
        </div>
        <div className="w-[5%] h-full flex justify-start items-center pl-2 select-none font-semibold">Save</div>
      </div>
      {/* Table generated with all crypto data */}
      <div className="w-[90%] h-[650px] bg-white rounded-[5px] shadow min-w-[1100px] mb-10 overflow-y-auto lg:overflow-scroll">
        {sortedCryptos.map((crypto) => (
          <MarketBar key={crypto.id} cryptoObject={crypto} />
        ))}
      </div>
    </>
  );
}

export default CryptoTable;
