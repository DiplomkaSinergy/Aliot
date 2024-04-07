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



interface ICartItem {
    id: number | undefined
    quantity: number
}

interface ICartOrderStore {
    cartItems: ICartItem[],
    cartQuantity: number,
    // itemQuantity: number,
    error: string,
    loading: boolean,
    getItemQuantity: (id: number | undefined) => any
    increaseCartQuantity: (id: number | undefined) => void
    decreaseCartQuantity: (id: number | undefined) => void
    removeFromCart: (id: number | undefined) => void
}


export const useCartOrderStore = create<ICartOrderStore>()(immer(devtools((set,get) => ({
    cartItems: [],
    error: '',
    loading: false,
    cartQuantity: 0,


    getItemQuantity(id: number | undefined) {
        return get().cartItems.find(item => item.id === id)?.quantity || 0;
    },

    increaseCartQuantity(id: number | undefined) {
        set((state) => {
          const item = state.cartItems.find(item => item.id === id);
          if (item) {
            item.quantity += 1;
          } else {
            state.cartItems.push({ id, quantity: 1 });
          }
        });
      },

    decreaseCartQuantity(id: number | undefined) {
        set((state) => {
          const item = state.cartItems.find(item => item.id === id);
          if (item) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              state.cartItems = state.cartItems.filter(item => item.id !== id);
            }
          }
        });
      },


    removeFromCart(id: number | undefined) {
        set((state) => {
            state.cartItems = state.cartItems.filter(item => item.id !== id);
          });
    }


}))))

// , {name: 'cartOrderStore'})


