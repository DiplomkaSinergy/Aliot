import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { Device } from "@/utils/Types/Device";
import { IProduct } from "./productStore";


type fetchResponse<T> = {
  count: number,
  rows: T[]
}

type UserCounts = fetchResponse<User>
type ProductCounts = fetchResponse<IProduct>

interface IAdminStore {
    products: ProductCounts
    users: UserCounts
    error: string,
    loading: boolean,
    getUsers: () => void
    getProducts: () => void
    updateRole: (userId: number | string, role: string) => Promise<void>
    createProduct: (formdata) => Promise<void>
}



export const useAdminStore = create<IAdminStore>()(immer(devtools((set, get) => ({
    users: {} as UserCounts,
    products: {} as ProductCounts,
    error: '',
    loading: false,

    async getUsers() {
      set({loading: true})
      try {
        const {data} = await $host.get<UserCounts>('api/admin/users')
        console.log(data);
        set({users: data})
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          set({loading: false})
      }
    },

    async getProducts() {
      set({loading: true})
      try {
        const {data} = await $host.get<ProductCounts>('api/admin/products')
        console.log(data);
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

    async updateRole(userId: number | string, role: string) {
      set({loading: true})
      try {
        console.log(userId, role);
        
        const {data} = await $host.put('api/admin/update-role', {userId, role})
        console.log(data);
        // set({products: data}) 
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          get().getUsers() 
          set({loading: false})
      }
    },

    async createProduct(formdata) {
      set({loading: true})
      try {
        console.log(formdata);
        const {data} = await $host.put('api/admin/update-role', {formdata})
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




