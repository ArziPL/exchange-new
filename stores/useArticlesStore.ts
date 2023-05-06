import create from "zustand";
import { Articles } from "../types/types";

// Store for articles from crypto-articles-api
const useArticlesStore = create<Articles>((set) => ({
  articles: [],
}));

export default useArticlesStore;
