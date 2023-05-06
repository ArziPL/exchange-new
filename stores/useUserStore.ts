import create from "zustand";
import { UserState } from "../types/types";

// Store for user data
const useUserStore = create<UserState>((set) => ({
  isLogged: false,
  id: "-1",
  nick: "Not logged",
  email: "notlogged@notlogged.com",
  createdAt: "2022-07-18",
  menuChoose: "1h",
  prints: [],

  login: (loginData: any) =>
    set((state) => ({
      isLogged: true,
      id: loginData.id,
      nick: loginData.nick,
      email: loginData.email,
      createdAt: loginData.createdAt,
      menuChoose: loginData.menuChoose,
      prints: loginData.prints,
    })),

  logoff: () =>
    set((state) => ({
      isLogged: false,
      id: "-1",
      nick: "Not logged",
      email: "notlogged@notlogged.com",
      createdAt: "2022-07-18",
      menuChoose: "1h",
      prints: [],
    })),
}));

export default useUserStore;
