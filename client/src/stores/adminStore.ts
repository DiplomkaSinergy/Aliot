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
import { notification } from "@/components/Blocks/Tostify/Tostify";
import { IOrder } from "./orderStore";


type fetchResponse<T> = {
  count: number,
  rows: T[]
}

type OrderWithUser = IOrder & {
  user: User
}

type UserCounts = fetchResponse<User>
type ProductCounts = fetchResponse<IProduct>
type OrderCounts = fetchResponse<OrderWithUser>

interface IAdminStore {
    products: ProductCounts
    users: UserCounts
    orders: OrderCounts,
    error: string,
    _pageUsers: number,
    _pageProduct: number,
    _limitUsers: number,
    _limitProducts: number,
    _totalCount: number
    loading: boolean,
    getUsers: (page: number, limit: number) => void
    setPage: (page: number, key: string) => void
    getProducts: (page: number, limit: number) => void
    getOrders: (page: number, limit: number) => void
    updateRole: (userId: number | string, role: string) => Promise<void>
    changeOrderStatus: (orderId: number , status: string) => Promise<void>
    createProduct: (formdata) => Promise<void>
}


export const useAdminStore = create<IAdminStore>()(immer(devtools((set, get) => ({
    users: {} as UserCounts,
    products: {} as ProductCounts,
    orders: {} as OrderCounts,
    _pageProduct: 1,
    _pageUsers: 1,
    _pageOrders: 1,
    _limitProducts: 3,
    _limitUsers: 5, 
    _limitOrders: 5, 
    _totalCount: 0,
    error: '',
    loading: false,

    async getUsers(page, limit = 5) {
      set({loading: true})
      try {
        const {data} = await $host.get<UserCounts>('api/admin/users', {params: {page, limit}})
        console.log(data);
        set({users: data, _totalCount: data.count})
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          set({loading: false})
      }
    },

    async getProducts(page, limit = 3) {
      set({loading: true})
      try {
        const {data} = await $host.get<ProductCounts>('api/admin/products', {params: {page, limit}}) 
        console.log(data);
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
        const {data} = await $host.post('api/admin/create-product', formdata)
        notification.success('Создание прошло успешно!')
        console.log(data);
        return data
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          get().getProducts(get()._page, get()._limit) 
          set({loading: false})
      }
    },

    setPage(page: number, key: string) {
      switch (key) {
        case 'user':
          set({_pageUsers: page}) 
          break;
        case 'product':
          set({_pageProduct: page}) 
          break
        default:
          break;
      }
    },


    async getOrders(page, limit = 5) {
      set({loading: true})
      try {
        const {data} = await $host.get<OrderCounts>('api/admin/orders', {params: {page, limit}}) 
        console.log(data);
        set({orders: data, _totalCount: data.count}) 
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          set({loading: false})
      }
    },
    async changeOrderStatus(orderId, status) {
      set({loading: true})
      try {
        const {data} = await $host.put('api/admin/change-order-status', {orderId, status}) 
        console.log(data);
        // set({orders: data, _totalCount: data.count}) 
      } catch (error) {
        if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error
            set({error: err.response?.data.message})
        }
      } finally {
          get().getOrders()
          set({loading: false})
      }
    }


}))))




