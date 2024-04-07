import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";


export type stringNameProp = 
'brands' |
'breakingCapacity' |
'degreeProtection' |
'display' |
'numberPoles' |
'ratedCurrent' |
'ratedVoltage' |
'shutdownCruve' |
'typeOfMechanism' 

export interface IFilter {
    id: number,
    name: string | number,
    characteristicNameId: number,
    characteristic_name: {name: string}
}

interface TFilters<T> {
  brands: T;
  breakingCapacity: T;
  degreeProtection: T;
  display: T;
  numberPoles: T;
  ratedCurrent: T;
  ratedVoltage: T;
  shutdownCruve: T;
  typeOfMechanism: T;
}

export type FiltersResponse = TFilters<IFilter[]>
export type IActiveFilters = TFilters<number[]>


interface IFilterStore {
    activeFilters: IActiveFilters,
    filters: FiltersResponse,
    error: string,
    loading: boolean,
    getFilters: () => Promise<any>
    updateActiveFilters: (filterName: stringNameProp, filterId: number, checked: boolean) => void; // Добавляем функцию обновления фильтров
}



export const useFilterStore = create<IFilterStore>()(immer(devtools((set) => ({
    filters: { } as FiltersResponse,
    activeFilters: {
        brands: [],
        breakingCapacity: [],
        degreeProtection: [],
        display: [],
        numberPoles: [],
        ratedCurrent: [],
        ratedVoltage: [],
        shutdownCruve: [],
        typeOfMechanism: []
    } as IActiveFilters,
    error: '',
    loading: false,

    getFilters: async () => {
      set({loading: true})
      try {
        const {data} = await $host.get(`api/filters`)
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


  updateActiveFilters: (filterName: stringNameProp, filterId: number, checked: boolean) => {
    set((state) => {
    //   const { activeFilters } = state;
      const activeFilters: IActiveFilters = state.activeFilters;
      const filterList = activeFilters[filterName]

      if (checked) {
        // Если чекбокс отмечен, добавляем id фильтра в соответствующий список
        return {
          activeFilters: {
            ...activeFilters,
            [filterName]: [...filterList, filterId],
          },
        };
      } else {
        // Если чекбокс снят, удаляем id фильтра из списка
        return {
          activeFilters: {
            ...activeFilters,
            [filterName]: filterList.filter((id: number) => id !== filterId),
          },
        };
      }
    });
  },

}))))




