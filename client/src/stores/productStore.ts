import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";

export interface IInfoProduct {
    id: number
    title: string | number
    description: string | number
    deviceId: number
}
export type ProductWithInfo = IProduct & {
    info: IInfoProduct[];
  };

export interface IProduct {
    id: number,
    name: string
    img: string
    price: number
    rating: number
    brandsCharId: null | string
    breakingCapacityCharId: null | string
    degreeProtectionCharId: null | string
    displayCharId: null | string
    numberPolesCharId: null | string
    ratedCurrentCharId: null | string
    ratedVoltageCharId: null | string
    shutdownCruveCharId: null | string
    typeOfMechanismCharId: null | string
} 

interface IProductStore {
    products: IProduct[] 
    error: string,
    loading: boolean,
    getProducts: () => Promise<void>
    getOneProduct: (id: string | undefined) => Promise<ProductWithInfo | undefined>
}



export const useProductStore = create<IProductStore>()(immer(devtools((set) => ({
    products: [],
    error: '',
    loading: false,

    getProducts: async () => {
      set({loading: true})
      try {
        const {data} = await $host.get('api/product')
        set({products: data})
            
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          set({loading: false})
      }
  },
  getOneProduct: async (id: string | undefined) => {
    set({loading: true})
    try {
      const {data} = await $host.get<ProductWithInfo>(`api/product/${id}`)
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



}))))




