import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";



interface Filter {
    id: number,
    name: string | number,
    characteristicNameId: number,
    characteristic_name: {name: string}
}
export interface FiltersResponse {
    brands: Filter[];
    breakingCapacities: Filter[];
    degreesOfProtection: Filter[];
    displays: Filter[];
    numberPoles: Filter[];
    ratedCurrents: Filter[];
    ratedVoltages: Filter[];
    shutdownCurves: Filter[];
    typesOfMechanism: Filter[];
  }
interface IFilterStore {
    filters: FiltersResponse,
    error: string,
    loading: boolean,
    getFilters: () => Promise<any>
}



export const useFilterStore = create<IFilterStore>()(immer(devtools((set) => ({
    filters: { } as FiltersResponse,
    error: '',
    loading: false,

    getFilters: async () => {
      set({loading: true})
      try {
        const {data} = await $host.get(`api/filters`)
        console.log(data);
        set({filters: data})
        //   set({products: data.products, filters: data.filters})
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




