import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";


type nullOrNumber = null | string

export interface IProduct {
    id: number,
    name: string
    img: string
    price: number
    rating: number
    brandsCharId: nullOrNumber
    breakingCapacityCharId: nullOrNumber
    degreeProtectionCharId: nullOrNumber
    displayCharId: nullOrNumber
    numberPolesCharId: nullOrNumber
    ratedCurrentCharId: nullOrNumber
    ratedVoltageCharId: nullOrNumber
    shutdownCruveCharId: nullOrNumber
    typeOfMechanismCharId: nullOrNumber
} 

interface IProductStore {
    products: IProduct[] 
    getProducts: () => Promise<void>
    error: string,
    loading: boolean,
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

}))))




