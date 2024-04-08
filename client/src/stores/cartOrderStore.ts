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



export interface ICartItem {
    id: number | undefined
    quantity: number
}

interface ICartOrderStore {
  // currentCartItem: ICartItem
    cartItems: ICartItem[],
    cartQuantity: number,
    error: string,
    loading: boolean,
    getAllOrderCartItems: () => Promise<void>
    getOneCartItem: (productId: string | undefined, basketId: number) => Promise<ICartItem | undefined>
    removeFromCart: (productId: string | undefined, basketId: number) => Promise<ICartItem | undefined>
    asyncIncreaseCartQuantity: (productId: string | undefined, basketId: number) => Promise<void>
    asyncDecreaseCartQuantity: (productId: string | undefined, basketId: number) => Promise<void>
    // getItemQuantity: (id: number | undefined) => number | undefined
    // increaseCartQuantity: (id: number | undefined) => void 
    // decreaseCartQuantity: (id: number | undefined) => void
}


export const useCartOrderStore = create<ICartOrderStore>()(immer(devtools((set,get) => ({
    cartItems: [],
    error: '',
    loading: false,
    cartQuantity: 0,


    // getItemQuantity(id: number | undefined) {
    //     return get().cartItems.find(item => item.id === id)?.quantity || 0;
    // },

    // increaseCartQuantity(id: number | undefined) {
    //     set((state) => {
    //       const item = state.cartItems.find(item => item.id === id);
    //       if (item) {
    //         item.quantity += 1;
    //       } else {
    //         state.cartItems.push({ id, quantity: 1 });
    //       }
    //     });
    //   },

    async getAllOrderCartItems() {
      set({loading: true}) 
      try {
        const {data} = await $host.get('api/cartOrder/all')
        set({cartItems: data})
        console.log(data);
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          set({loading: false})
      }
    },
    async getOneCartItem(productId: string | undefined, basketId: number) {
      set({loading: true})
      try {
        const {data} = await $host.get<ICartItem>(`api/cartOrder/one?basketId=${basketId}&productId=${productId}`)
        console.log(data);
        return data
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          get().getAllOrderCartItems() 
          set({loading: false})
      }
    },

    async asyncIncreaseCartQuantity(productId: string | undefined, basketId: number) {
        set({loading: true})
        try {
          const {data} = await $host.post('api/cartOrder/increase', {productId, basketId})
          console.log(data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            get().getAllOrderCartItems() 
            set({loading: false})
        }
      },

    async asyncDecreaseCartQuantity(productId: string | undefined, basketId: number) {
        set({loading: true})
        try {
          const {data} = await $host.post('api/cartOrder/decrease', {productId, basketId})
          console.log(data);
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            get().getAllOrderCartItems()  
            set({loading: false})
        } 
      }, 

    // decreaseCartQuantity(id: number | undefined) {
    //     set((state) => {
    //       const item = state.cartItems.find(item => item.id === id);
    //       if (item) {
    //         if (item.quantity > 1) {
    //           item.quantity -= 1;
    //         } else {
    //           state.cartItems = state.cartItems.filter(item => item.id !== id);
    //         }
    //       }
    //     });
    //   },

    async removeFromCart(productId: string | undefined, basketId: number) {
      set({loading: true})
      try {
        const {data} = await $host.delete(`api/cartOrder/delete?basketId=${basketId}&productId=${productId}`)
        console.log(data);
        return data
      } catch (error) {
        if (isAxiosError(error)) {
          const err: AxiosError<AuthErrorType> = error
          set({error: err.response?.data.message})
        }
      } finally {
          get().getAllOrderCartItems()  
          set({loading: false})
      } 
     
    }


}))))

// , {name: 'cartOrderStore'})


