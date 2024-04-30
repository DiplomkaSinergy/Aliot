//@ts-nocheck

import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";
import { ProductCounts } from "./adminStore";

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
    createdAt: string,
    updatedAt: string,
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
    _limitProduct: number
    _totalCount: number
    _pageProduct: number
    products: ProductCounts 
    error: string,
    loading: boolean,
    getProducts: (page: number, limit: number) => Promise<void>
    setProductsPage: (page: number) => void
    getOneProduct: (id: string | undefined) => Promise<ProductWithInfo | undefined>
}



export const useProductStore = create<IProductStore>()(immer(devtools((set) => ({
    _limitProduct: 30,
    _pageProduct: 1,
    _totalCount: 0,
    products: {} as ProductCounts,
    error: '',
    loading: false,

    getProducts: async (page, limit = 35) => {
      set({loading: true})
      try { 
        const {data} = await $host.get<ProductCounts>('api/product', {params: {page, limit}})
        set({products: data, _totalCount: data.count})            
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

    setProductsPage(page: number) {
        set({_pageProduct: page})
    }


}))))




