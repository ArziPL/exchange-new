// Component with all the content rendered in /asset/[symbol]
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useCryptoStore from "../../stores/useCryptoStore";
import useUserStore from "../../stores/useUserStore";
import { CryptoObject } from "../../types/types";
import getCryptoImage from "../../utils/getCryptoImage";
import useWindowDimensions from "../../utils/useWindowDimensions";
import PageContent from "../common/PageContent";
import RawBar from "./RawBar";

export default function AssetComponent() {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const cryptos = useCryptoStore((state) => state.crypto.data);
  const isLogged = useUserStore((state) => state.isLogged);
  const user = useUserStore();
  const windowDimensions = useWindowDimensions();
  let cryptoObject: CryptoObject = {
    id: 0,
    name: "",
    symbol: "",
    slug: "",
    num_market_pairs: 0,
    circulating_supply: 0,
    total_supply: 0,
    last_updated: "",
    date_added: "",
    tags: [],
    quote: {
      USD: {
        price: 0,
        volume_24h: 0,
        volume_change_24h: 0,
        percent_change_1h: 0,
        percent_change_24h: 0,
        percent_change_7d: 0,
        market_cap: 0,
        market_cap_dominance: 0,
        fully_diluted_market_cap: 0,
        last_updated: "",
      },
    },
  };

  // Make sure that symbol is string
  let symbol = "";
  if (typeof router.query.symbol == "string") {
    symbol = router.query.symbol.toUpperCase();
  }

  // Find crypto object in store and return it based on crypto symbol from url (getting data)
  cryptos.forEach((crypto_object) => {
    if (crypto_object.symbol == symbol.toUpperCase()) {
      cryptoObject = crypto_object;
    }
  });

  // Provider for tables (Recharts)
  const data = [
    {
      name: "Change (1h%)",
      Change: parseFloat(cryptoObject.quote.USD.percent_change_1h.toFixed(3)),
    },
    {
      name: "Change (24h%)",
      Change: parseFloat(cryptoObject.quote.USD.percent_change_24h.toFixed(3)),
    },
    {
      name: "Change (7d%)",
      Change: parseFloat(cryptoObject.quote.USD.percent_change_7d.toFixed(3)),
    },
  ];

  // Save print on click
  const handlePrintSave = () => {
    if (isLogged) {
      fetch("/api/savePrint", {
        method: "POST",
        body: JSON.stringify({
          name: cryptoObject.name,
          symbol: cryptoObject.symbol,
          price: cryptoObject.quote.USD.price,
          volume24h: cryptoObject.quote.USD.volume_24h,
          circulatingSupply: cryptoObject.circulating_supply,
          marketDominance: cryptoObject.quote.USD.market_cap_dominance,
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

  // Closing snackbar
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // Closing snackbar - jsx
  const action = (
    <React.Fragment>
      <IconButton size="small" onClick={handleClose} aria-label="close" color="inherit">
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* Container for whole site */}
      <div className="w-full h-[calc(100vh-300px)] flex xl:flex-col">
        {/* Left half of site */}
        <div className="w-1/2 flex flex-col xl:w-full">
          {/* Block with crypto img and name */}
          <PageContent title="Coin" tooltip="">
            <div className="w-[90%] h-auto p-5 flex justify-center items-center text-3xl gap-5 font-semibold bg-white">
              {getCryptoImage(symbol)} {cryptoObject.name} ({symbol})
            </div>
          </PageContent>

          {/* Block with charts */}
          <div className="h-[80%]">
            <PageContent
              title="Change over time"
              tooltip="Watch out for percents changes throught different coins, for one max might be 1% when for other it might be 110% !"
            >
              <div className="bg-white w-[90%] h-[520px] flex justify-center items-center">
                <ResponsiveContainer width="90%" height="90%">
                  <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" hide={windowDimensions.width < 639 ? true : false} />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Bar dataKey="Change">
                      {data.map((entry, index) => (
                        <Cell key={index} fill={entry.Change > 0 ? "#22c55e" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </PageContent>
          </div>
        </div>

        {/* Right side of site */}
        <div className="w-1/2 h-full xl:w-full">
          {/* Raw data block */}
          <PageContent
            title="Raw data"
            tooltip="Some of the values might not be there because the coin itself does not have them or were not provided by API"
          >
            <div className="w-[90%] h-[520px] bg-white">
              <div className="ml-3 mt-3 text-slate-400 tracking-wider text-sm">IMPORTANT</div>
              <RawBar title="Price:">{cryptoObject.quote.USD.price.toFixed(2)}$</RawBar>
              <RawBar title="Volume (24h):">{cryptoObject.quote.USD.volume_24h.toFixed(2)}$</RawBar>
              <RawBar title="Volume change (24h%):">{cryptoObject.quote.USD.volume_change_24h.toFixed(2)}%</RawBar>
              <RawBar title="Last update (external API):">{cryptoObject.last_updated}</RawBar>
              <div className="ml-3 mt-3 text-slate-400 tracking-wider text-sm">OTHER</div>
              <RawBar title="Internal ID:">{cryptoObject.id}</RawBar>
              <RawBar title="Name:">{cryptoObject.name}</RawBar>
              <RawBar title="Symbol:">{cryptoObject.symbol}</RawBar>
              <RawBar title="Coin slug:">{cryptoObject.slug}</RawBar>
              <RawBar title="CMC Rank:">{cryptoObject.cmc_rank}</RawBar>
              <RawBar title="Circulating supply:">{cryptoObject.total_supply}</RawBar>
              <RawBar title="Total supply:">{cryptoObject.max_supply}</RawBar>
              <RawBar title="Market cap:">{cryptoObject.quote.USD.market_cap.toFixed(2)}$</RawBar>
              <RawBar title="Market cap dominance rank:">
                {cryptoObject.quote.USD.market_cap_dominance.toFixed(3)}
              </RawBar>
            </div>
          </PageContent>

          {/* Block with save button */}
          <PageContent title="Save print !" tooltip="">
            <div
              className="w-[90%] h-[90px] bg-white flex justify-center items-center hover:bg-slate-100 cursor-pointer active:scale-[0.95]"
              onClick={handlePrintSave}
            >
              <SaveIcon sx={{ fontSize: "72px" }} />
            </div>
          </PageContent>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={snackbarMessage}
            action={action}
          />
        </div>
      </div>
    </div>
  );
}
