// Every single crypto bar in crypto table
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Snackbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useUserStore from "../../stores/useUserStore";
import { CryptoObject } from "../../types/types";
import getCryptoImage from "../../utils/getCryptoImage";

type MarketBar = {
  cryptoObject: CryptoObject;
};

export default function MarketBar(props: MarketBar) {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const crypto = props.cryptoObject;
  const router = useRouter();
  const isLogged = useUserStore((state) => state.isLogged);
  const user = useUserStore();

  // Snackbar closing
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Snackbar closing - jsx
  const action = (
    <React.Fragment>
      <IconButton size="small" onClick={handleClose} aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // Save print on click
  const handlePrintSave = () => {
    if (isLogged) {
      fetch("/api/savePrint", {
        method: "POST",
        body: JSON.stringify({
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.quote.USD.price,
          volume24h: crypto.quote.USD.volume_24h,
          circulatingSupply: crypto.circulating_supply,
          marketDominance: crypto.quote.USD.market_cap_dominance,
          authorId: user.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => setSnackbarMessage(data))
        .then((data) => setOpen(true));
    } else {
      setSnackbarMessage("Log in to make prints!");
      setOpen(true);
    }
  };

  return (
    <div className="w-[100%] h-[60px] flex">
      <Link href={"/asset/" + crypto.symbol.toLowerCase()}>
        <div
          className="w-full h-full bg-white flex hover:bg-slate-200 cursor-pointer"
          onClick={() => {
            router.push(`/asset/${crypto.symbol.toLowerCase()}`);
          }}
        >
          <div className="w-[5%] h-full flex justify-start items-center p-2">{getCryptoImage(crypto.symbol)}</div>
          <div className="w-[20%] h-full flex justify-start items-center p-2">
            {crypto.name} ({crypto.symbol})
          </div>
          <div className="w-[15%] h-full flex justify-start items-center p-2 font-semibold">
            ${crypto.quote.USD.price.toFixed(3)}
          </div>
          <div className="w-[20%] h-full flex justify-start items-center p-2 font-semibold">
            ${crypto.quote.USD.volume_24h.toFixed(3)}
          </div>
          <div className="w-[calc(40%/3)] h-full flex justify-start items-center p-2">
            <b className={crypto.quote.USD.percent_change_1h > 0 ? "text-green-500" : "text-red-500"}>
              {crypto.quote.USD.percent_change_1h.toFixed(3)}%
            </b>
          </div>
          <div className="w-[calc(40%/3)] h-full flex justify-start items-center p-2">
            <b className={crypto.quote.USD.percent_change_24h > 0 ? "text-green-500" : "text-red-500"}>
              {crypto.quote.USD.percent_change_24h.toFixed(3)}%
            </b>
          </div>
          <div className="w-[calc(40%/3)] h-full flex justify-start items-center p-2">
            <b className={crypto.quote.USD.percent_change_7d > 0 ? "text-green-500" : "text-red-500"}>
              {crypto.quote.USD.percent_change_7d.toFixed(3)}%
            </b>
          </div>
        </div>
      </Link>
      <div
        className="w-[5%] h-full flex justify-center items-center p-2 hover:bg-slate-200 cursor-pointer"
        onClick={handlePrintSave}
      >
        <SaveIcon fontSize="small" />
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={snackbarMessage} action={action} />
    </div>
  );
}
