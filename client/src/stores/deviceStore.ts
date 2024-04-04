import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";


type ProductWithInfo = IDevice & {
    info: IInfoProduct[];
  };
export interface IInfoProduct {
    id: number
    title: string | number
    description: string | number
    deviceId: number
}

export interface IFilter {
    value: number | string
}

export type fullFilters = {
    char1: IFilter[]
    char2: IFilter[]
    char3?: IFilter[]
    char4?: IFilter[]
}

export interface ICharacteristic {
    value: string | number,
    title: string
}

export type fullDevice = {
    id: number
    device: IDevice
    char1: ICharacteristic
    char2: ICharacteristic
    char3?: ICharacteristic

}
export interface IDevice {
    id: number
    img: string,
    name: string
    price: number,
    
}

interface IDeviceStore {
    products: fullDevice[],
    filters: fullFilters,
    error: string,
    loading: boolean,
    oneProduct: ProductWithInfo
    // getFil: () => Promise<any>,
    getDevices: (type: string | undefined) => void
    getOneDevice: (id: string | number |undefined) => void
}



export const useDeviceStore = create<IDeviceStore>()(immer(devtools((set) => ({
    products: [],
    oneProduct: {} as ProductWithInfo,
    filters: {} as fullFilters,
    error: '',
    loading: false,

    getDevices: async (type: string | undefined) => {
      set({loading: true})
      try {
          const {data} = await $host.get(`api/device/${type}`)
        
          set({products: data.products, filters: data.filters})
      } catch (error) {
          if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error
              set({error: err.response?.data.message})
          }
      } finally {
          set({loading: false})
      }
  },

  getOneDevice: async (id: string | number |undefined) => {
    set({loading: true})
    try {
        console.log('frontend ' + id)
        const {data} = await $host.get(`api/device/?id=${id}`)
        set({oneProduct: data})
        console.log(data);
        
        // set({products: data.products, filters: data.filters})
    } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
    } finally {
        set({loading: false})
    }
},



    // getFil: async () => {
    //     set({loading: true})
    //     try {
    //         const {data} = await $host.get('api/filters')
    //         console.log(data)
    //     } catch (error) {
    //         if (isAxiosError(error)) {
    //             const err: AxiosError<AuthErrorType> = error
    //             set({error: err.response?.data.message})
    //         }
    //     } finally {
    //         set({loading: false})
    //     }
    // }
}))))




