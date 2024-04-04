import { PathsAccount } from "@/app/Routes/Types/paths";
import { CircleUserRound, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import {  ReactNode } from "react";

export interface INavigationLinks {
    icon: ReactNode
    title: string
    path: string
}

export const navigation: INavigationLinks[] = [
    {
        icon: <CircleUserRound />,
        title: 'Главная',
        path: `${PathsAccount.Main}`,
    },
    {
        icon: <Heart />,
        title: 'Избранное',
        path: `${PathsAccount.Favorites}`,
    },
    {
        icon: <ShoppingCart />,
        title: 'Моя корзина',
        path: `${PathsAccount.Cart}`,
    },
    {
        icon: <ShoppingBag />,
        title: 'Мои заказы',
        path: `${PathsAccount.Orders}`,
    },
]