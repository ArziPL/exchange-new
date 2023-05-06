import { Avatar } from "@mui/material";
import icons from "../public/icons.json";

// Ultimate function to return crypto img or avatar if img is not found (exported)
const getCryptoImage = (symbol:string) => {
  let imgLink = findCryptoLink(symbol)
  if(imgLink == "") {
      return (<Avatar {...stringAvatar(`${symbol}`)} className="w-[48px] h-[48px]"/>)
  } else {
      {/* eslint-disable-next-line @next/next/no-img-element */}
      return (<img src={imgLink} alt="crypto icon" className="w-[48px] h-[48px]" />)
  }
}

// Find and return link from public/icons.json based on asset_id, if not found return ""
const findCryptoLink = (symbol: string) => {
  let asset = "" + symbol;
  let indx = icons.findIndex((x) => x.asset_id === asset);
  if (indx === -1) {
    return "";
  } else {
    return icons[indx].url;
  }
};

// MUI code to generate different Avatar background based on string of it
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name,
  };
}

export default getCryptoImage