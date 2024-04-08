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



interface ICartOrderStore {
    likedItems: number[],
    error: string,
    loading: boolean,
}

export const useCartLikedStore = create<ICartOrderStore>()(persist(immer(devtools((set,get) => ({
  likedItems: [],
  error: '',
  loading: false,

  getItemQuantity(id: number | undefined) {
      return get().likedItems.find(item => item === id)
  },

  addCartQuantity(id: number | undefined) {
    set((state) => {
      const item = state.likedItems.find(item => item === id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ id, quantity: 1 });
      }
    });
  },

  deleteCartQuantity(id: number | undefined) {
      set((state) => {
        const item = state.likedItems.find(item => item.id === id);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.likedItems = state.likedItems.filter(item => item.id !== id);
          }
        }
      });
    },


}))),{name: 'LikedStoreStore'}))

// , 


