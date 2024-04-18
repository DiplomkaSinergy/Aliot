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



export interface ICartItem {
    id: number | undefined
    quantity: number,
    basketId: number,
    productId: number,
    product: IProduct
}

interface ICartOrderStore {
    cartItems: ICartItem[],
    cartQuantity: number,
    error: string,
    loading: boolean,
    getAllOrderCartItems: (basketId: number) => Promise<ICartItem[] | undefined>
    getOneCartItem: (productId: string | number | undefined, basketId: number) => Promise<ICartItem | undefined>
    removeFromCart: (productId: string | number | undefined, basketId: number) => Promise<ICartItem | undefined>
    asyncIncreaseCartQuantity: (productId: string | number | undefined, basketId: number) => Promise<void>
    asyncDecreaseCartQuantity: (productId: string | number | undefined, basketId: number) => Promise<void>
    reduceCartProdict: () => void
    cretePayment: (value: number | string) => Promise<void>
    // getItemQuantity: (id: number | undefined) => number | undefined
    // increaseCartQuantity: (id: number | undefined) => void 
    // decreaseCartQuantity: (id: number | undefined) => void
}


export const useCartOrderStore = create<ICartOrderStore>()(immer(devtools((set,get) => ({
    cartItems: [],
    error: '',
    loading: false, 
    cartQuantity: 0,

    async cretePayment(value) { 
      set({loading: true})  
      try { 
        const {data} = await $host.post('api/payment/create', {value}) 
        console.log(data);
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          get().reduceCartProdict() 
          set({loading: false})
      }
    },
 
    reduceCartProdict() { 
      set(state => {
        state.cartQuantity = state.cartItems.reduce((total, cartItem) => {
          if (cartItem !== null || cartItem !== undefined) {
            return total + (cartItem?.product.price || 0) * cartItem.quantity 
          } else {
            return total
          }
        }, 0)
      })
    },

    async getAllOrderCartItems(basketId: number) {
      set({loading: true})  
      try {
        const {data} = await $host.get('api/cartOrder/all', {params: {basketId}})
        console.log(data);
        set({cartItems: data})
        return data
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          get().reduceCartProdict() 
          set({loading: false})
      }
    },
    async getOneCartItem(productId: string | number | undefined, basketId: number) {
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
          set({error: ''})
          get().getAllOrderCartItems() 
          get().reduceCartProdict() 
          set({loading: false})
      }
    },

    async asyncIncreaseCartQuantity(productId: string | number | undefined, basketId: number) {
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
            get().reduceCartProdict() 
            set({loading: false})
        }
      },  
        
    async asyncDecreaseCartQuantity(productId: string | number | undefined, basketId: number) {
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
            get().reduceCartProdict()  
            set({loading: false})
        }  
      },    

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
          get().reduceCartProdict()  
          set({loading: false})
      }  
    }
}))))

// , {name: 'cartOrderStore'})


