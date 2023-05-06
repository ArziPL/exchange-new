// Login dialog types
export interface UserLoginInput {
  loginEmail: string;
  loginPassword: string;
  loginResponse: string;
  registerNick: string;
  registerEmail: string;
  registerPassword: string;
  registerResponse: string;
}

// useUserStore
export interface UserState {
  isLogged: boolean;
  id: string;
  nick: string;
  email: string;
  createdAt: string;
  menuChoose: string;
  prints: Array<Print>;
  login: (LoginData: LoginData) => void;
  logoff: () => void;
}

export interface LoginData {
  id: string;
  nick: string;
  email: string;
  createdAt: string;
  menuChoose: string;
  prints: Print[];
}

export interface Print {
  id: string;
  name: string;
  symbol: string;
  price: number;
  volume24h: number;
  circulatingSupply?: number;
  marketDominance?: number;
  createdAt: string;
}

// useCryptoStore
export interface CryptoStore {
  crypto: CryptoDataFromApi;
}

export interface CryptoDataFromApi {
  data: Array<CryptoObject>;
  status?: StatusFromApi;
}

export interface CryptoObject {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank?: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform?: string | null;
  self_reported_circulating_supply?: string | null;
  self_reported_market_cap?: string | null;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
    [key: string]: unknown;
  };
}

export interface StatusFromApi {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
}

// Article type
export interface Articles {
  articles: Array<Article>;
}

// ??? - don't know how to do that correctly
export interface Article {
  article: any;
  articleUrl: string;
  author: string;
  content: string;
  date: string;
  description: string;
  iconUrl: string;
  imgUrl: string;
  title: string;
}
