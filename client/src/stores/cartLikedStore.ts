//@ts-nocheck

import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";
import { options } from "node_modules/axios/index.d.cts";
import { IProduct } from "./productStore";



interface ICartOrderStore {
    likedItems: IProduct[],
    error: string,
    loading: boolean,
    getItemQuantity: (id: number | undefined) => number | undefined
    toggleLikedItmes: (product: IProduct | undefined) => void
}

export const useCartLikedStore = create<ICartOrderStore>()(persist(immer(devtools((set,get) => ({
  likedItems: [],
  error: '',
  loading: false,

  getItemQuantity(id: number | undefined) {
      return get().likedItems.find(item => item.id === id)?.id
  },

  toggleLikedItmes(product: IProduct | undefined) {
    set((state) => {
      const item = state.likedItems.find(item => item.id === product?.id);
      if (item) {
        state.likedItems = state.likedItems.filter(item => item.id !== product?.id)         
      } else {
        if (product) {  
          state.likedItems.push(product);
        }
      }
      console.log(state.likedItems);
      
    });
  },


}))),{name: 'LikedStoreStore'}))

// , 


