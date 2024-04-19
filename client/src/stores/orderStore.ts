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

interface IOrder {
  id: number,
  price: string | number,
  status: string,
  address: string,
  createdAt: string,
  userId: number
}

interface IOrderProducts {
  id: number,
  orderId: number,
  basketId: number,
}


interface IOrderStore {
    error: string,
    loading: boolean,
    creteOrder: (userId: number, basketId: number, price: number, address: string | null) => void
    getAllOrders: (userId: number) => void
}


export const useOrderStore = create<IOrderStore>()(immer(devtools((set,get) => ({
    error: '',
    loading: false,  
 

    async creteOrder(userId: number, basketId: number, price: number, address: string | null) {
      set({loading: true})
      try {
        const {data} = await $authHost.post('api/order/create', {userId, basketId, price, address})
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

    async getAllOrders(userId: number) {
      set({loading: true})
      try {
        console.log(userId);
        
        const {data} = await $authHost.get('api/order/getAll', {params: {userId}})
        console.log(data);
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          set({loading: false})
      }
    }

    // async cretePayment(value) { 
    //   set({loading: true})  
    //   try { 
    //     const {data} = await $host.post('api/payment/create', {value}) 
    //     console.log(data);
    //   } catch (error) {
    //       if (isAxiosError(error)) {
    //           const err: AxiosError<AuthErrorType> = error
    //           set({error: err.response?.data.message})
    //       }
    //   } finally {
    //       get().reduceCartProdict() 
    //       set({loading: false})
    //   }
    // },
 
  
}))))


