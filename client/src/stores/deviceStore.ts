import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";



interface IDeviceStore {
    error: string,
    loading: boolean,
}



export const useDeviceStore = create<IDeviceStore>()(immer(devtools((set) => ({
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

}))))




