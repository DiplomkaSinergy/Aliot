import { $authHost, $host } from "@/services/instance/index";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { jwtDecode } from "jwt-decode";
import { AxiosError, isAxiosError } from "axios";
import { AuthErrorType } from "@/utils/Types/Errors";
import { User } from "@/utils/Types/User";
import {
  LoginFormValues,
  RegestrationFormValues,
} from "@/components/Forms/types.interface";

interface IBasket {
  id: number;
  userId: number;
}

interface IAuthStore {
  isAuth: boolean;
  basket: IBasket;
  user: User;
  error: string;
  loading: boolean;
  register: ({
    firstName,
    lastName,
    email,
    password,
    phone,
  }: RegestrationFormValues) => Promise<User | undefined>;
  login: ({ email, password }: LoginFormValues) => Promise<User | undefined>;
  loguot: () => void;
  chaekAuth: () => Promise<User | undefined>;
}

export const useAuth = create<IAuthStore>()(
  persist(
    immer(
      devtools((set) => ({
        isAuth: false,
        user: {} as User,
        basket: {} as IBasket,
        error: "",
        loading: false,

        register: async ({ firstName, lastName, email, password, phone }) => {
          try {
            set({ loading: true });
            const { data } = await $host.post("api/user/registration", {
              firstName,
              lastName,
              email,
              password,
              phone,
              role: "USER",
            });
            console.log(data);
            localStorage.setItem("token", data.token);
            const user = jwtDecode<User>(data.token);
            set({ user: user, basket: data.basket });
            return user;
          } catch (error) {
            if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error;
              set({ error: err.response?.data.message });
            }
          } finally {
            set({ loading: false });
            setTimeout(() => set({ error: "" }), 5000);
          }
        },

        login: async ({ email, password }) => {
          try {
            set({ loading: true });
            const { data } = await $host.post("api/user/login", {
              email,
              password,
            });
            localStorage.setItem("token", data.token);
            const user = jwtDecode<User>(data.token);
            set({ user: user, isAuth: true, basket: data.basket });
            return user;
          } catch (error) {
            if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error;
              set({ error: err.response?.data.message });
            }
          } finally {
            set({ loading: false });
            setTimeout(() => set({ error: "" }), 5000);
          }
        },

        chaekAuth: async () => {
          set({ loading: true });
          try {
            const { data } = await $authHost.get("api/user/check-auth");
            console.log("cheauth", data);
            localStorage.setItem("token", data.token);
            const user = jwtDecode<User>(data.token);
            set({ user: user, isAuth: true });
            return user;
          } catch (error) {
            if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error;
              set({ error: err.response?.data.message });
            }
          } finally {
            set({ loading: false });
            setTimeout(() => set({ error: "" }), 1000);
          }
        },

        loguot: async () => {
          set({ loading: true });
          try {
            localStorage.removeItem("token");
            set({ user: {} as User, isAuth: false, basket: {} as IBasket });
          } catch (error) {
            if (isAxiosError(error)) {
              const err: AxiosError<AuthErrorType> = error;
              set({ error: err.response?.data.message });
            }
          } finally {
            set({ loading: false });
          }
        },
      }))
    ),
    {
      name: "basket-store",
      partialize: (state) => ({ basket: state.basket }),
    }
  )
);
