import create from "zustand";
import { CryptoStore } from "../types/types";

// Store for crypto assets from CoinMarketCap
const useCryptoStore = create<CryptoStore>((set) => ({
  crypto: {
    data: [],
    status: {
      timestamp: "",
      error_code: 0,
      error_message: "",
      elapsed: 0,
      credit_count: 0,
    },
  },
}));

export default useCryptoStore;
