import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {jwtDecode}  from 'jwt-decode'
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import { LoginFormValues, RegestrationFormValues } from "@/components/Forms/types.interface";




interface IAuthStore {
    isAuth: boolean,
    user: User,
    error: string,
    loading: boolean,
    register: ({ firstName, secondName, email, firstPassword }: RegestrationFormValues) => Promise<User | undefined>,
    login: ({email, firstPassword}: LoginFormValues) => Promise<User | undefined>,
    loguot: () => void,
    chaekAuth: () =>  Promise<User | undefined>,
    getFil: () => Promise<any>
}






export const useAuth = create<IAuthStore>()(immer(devtools((set) => ({
    isAuth: false,
    user: {} as User,
    error: '',
    loading: false,

    register: async ({firstName, secondName, email, firstPassword}) => {
            try {
                set({loading: true})
                const {data} = await $host.post('api/user/registration', {firstName, secondName, email, firstPassword, role: "USER"})
                localStorage.setItem('token', data.token)
                const user = jwtDecode<User>(data.token)
                set({user: user})
                return user;
            } catch (error) {
                if (isAxiosError(error)) {
                    const err: AxiosError<AuthErrorType> = error
                    set({error: err.response?.data.message})
                }
            } finally {
                set({loading: false})
                setTimeout(() => set({error: ''}), 5000)
            }
    },  

    login: async ({email, firstPassword}) => {
        try {
            set({loading: true})
            const {data} = await $host.post('api/user/login', {email, firstPassword})
            localStorage.setItem('token', data.token)
            const user = jwtDecode<User>(data.token)
            set({user: user, isAuth: true})
            return user
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({loading: false})
            setTimeout(() => set({error: ''}), 5000)
        }
    },

    chaekAuth: async () => {
        set({loading: true})
        try {
            const {data} = await $authHost.get('api/user/auth')
            localStorage.setItem('token', data.token)
            const user = jwtDecode<User>(data.token)
            set({user: user, isAuth: true})
            return user
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({loading: false})
            setTimeout(() => set({error: ''}), 1000)
        }
    },

    loguot: async () => {
        set({loading: true})
        try {
            localStorage.removeItem('token')
            set({user: {} as User, isAuth: false})
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({loading: false})
        }
    },

    getFil: async () => {
        set({loading: true})
        try {
            const {data} = await $host.get('api/filters')
            console.log(data)
        } catch (error) {
            if (isAxiosError(error)) {
                const err: AxiosError<AuthErrorType> = error
                set({error: err.response?.data.message})
            }
        } finally {
            set({loading: false})
        }
    }
}))))




