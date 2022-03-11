import { useQuery } from 'react-query';
import { fetchCoins } from "api.ts";
import { atom } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: true,
})

export interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
  }

  export const CoinsInfo = atom<ICoin[]>({
      key: "Coin",
      default:[],
  })

  export const coinState = atom({
      key: "list",
      default: [fetchCoins]
  })