import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";
import { options } from "node_modules/axios/index.d.cts";
import { IProduct } from "./productStore";
import { useCartOrderStore } from "./cartOrderStore";

export interface IOrderProduct {
  id: number,
  orderId: number,
  productId: number,
  quantity: number,
  product: IProduct,
  createdAt: string,
  updatedAt: string,
}
export interface IOrder {
  id: number,
  price: string | number,
  status: string,
  address: string,
  createdAt: string,
  updatedAt: string,
  userId: number,
}

export type OrderWithProducts = IOrder & {
  order_products: IOrderProduct[]
}



interface IOrderStore {
    currentOrder: OrderWithProducts,
    orders: IOrder[],
    error: string,
    loading: boolean,
    creteOrder: (userId: number, basketId: number, price: number, address: string | null) => Promise<IOrder | undefined>
    getAllOrdersById: (userId: number) => void
    getOneOrdersById: (orderId: string | undefined) => void
    cretePayment: (value: number, orderId: string | undefined) => Promise<void>
}


export const useOrderStore = create<IOrderStore>()(immer(devtools((set,get) => ({
    currentOrder: {} as OrderWithProducts,
    orders: [],
    error: '',
    loading: false,  
 

    async creteOrder(userId: number, basketId: number, price: number, address: string | null) {
      set({loading: true})
      try {
        const {data} = await $authHost.post<IOrder>('api/order/create', {userId, basketId, price, address})
        console.log(data);
        useCartOrderStore.getState().cartItems = []
        return data
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          set({loading: false})
      }
    },

    async getAllOrdersById(userId: number) {
      set({loading: true})
      try {
        const {data} = await $authHost.get<IOrder[]>('api/order/getAll', {params: {userId}})
        set({orders: data}) 
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
    async getOneOrdersById(orderId: string | undefined) {
      set({loading: true})
      try {
        const {data} = await $authHost.get<OrderWithProducts>('api/order/getOne', {params: {orderId}})
        set({currentOrder: data}) 
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


    async cretePayment(value: number, orderId: string | undefined) { 
      set({loading: true})  
      try { 
        const data = await $host.post('api/payment/create', {amount: value, orderId}) 
        console.log(data);
        // return data 
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          // get().reduceCartProdict() 
          set({loading: false})
      }
    },
 
  
}))))


