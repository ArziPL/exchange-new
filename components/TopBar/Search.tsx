// Search MUI dialog with all logic behind filtering
import SearchIcon from "@mui/icons-material/Search";
import { Button, Dialog, DialogActions, DialogTitle, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useCryptoStore from "../../stores/useCryptoStore";
import ErrorData from "../common/ErrorData";
import SearchResult from "./SearchResult";

export default function Search() {
  // Getting all assets from store + creating short assets array [[asset_id,name],["btc","bitcoin"]]
  const cryptos = useCryptoStore((state) => state.crypto.data);
  let cryptosNames: Array<Array<string>> = [];
  cryptos.forEach((cryptoObject) => {
    cryptosNames.push([cryptoObject.symbol, cryptoObject.name]);
  });

  // Initializing state
  const [userInput, setUserInput] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState<Array<Array<string>>>(cryptosNames);

  // Input state update on input change
  const handleInputResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase().replace(/\s/g, ""));
  };

  // Menu handling
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUserInput(userInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering and setting state to display search results dependent on user input change
  useEffect(() => {
    // Get all values matching asset_id ("btc")
    let filteredId = cryptosNames.filter(([k, v]) => k.toLowerCase().replace(/\s/g, "").includes(userInput));
    // Get all values matching name ("bitcoin")
    let filteredName = cryptosNames.filter(([k, v]) => v.toLowerCase().replace(/\s/g, "").includes(userInput));
    // Concat those two arrays
    let filteredBoth = filteredId.concat(filteredName);
    // Get only uniques from concatened array
    let filteredUnique = filteredBoth.filter((v, i, a) => a.indexOf(v) === i);
    setFilteredCryptos(filteredUnique);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, open]);

  return (
    <div>
      {/* Search caller */}
      <IconButton size="medium" edge="start" color="inherit" aria-label="menu" onClick={handleClickOpen}>
        <SearchIcon fontSize="medium" color="disabled" />
      </IconButton>
      {/* Search dialog with whole UI */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {cryptos.length == 0 ? (
          <ErrorData />
        ) : (
          <>
            {/* Title */}
            <DialogTitle id="alert-dialog-title" className="text-center">
              Search for crypto
            </DialogTitle>

            {/* Search input */}
            <TextField
              autoComplete="off"
              onChange={handleInputResults}
              label="Crypto"
              className="w-[70%] ml-auto mr-auto"
              inputProps={{ style: { textTransform: "uppercase" } }}
            />

            {/* Input results */}
            <div className="w-[500px] h-[450px] overflow-auto mt-2 lg:w-auto">
              <div className="h-auto flex flex-wrap">
                {filteredCryptos.map((cryptoObjectName) => (
                  <SearchResult
                    key={`${cryptoObjectName[0]}`}
                    symbol={cryptoObjectName[0]}
                    name={cryptoObjectName[1]}
                    handleClose={handleClose}
                  />
                ))}
              </div>
            </div>

            {/* Button on bottom */}
            <DialogActions>
              <Button onClick={handleClose}>Next time</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
