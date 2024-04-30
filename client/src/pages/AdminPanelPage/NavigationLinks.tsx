import { PathsAdminPanel } from "@/app/Routes/Types/paths";
import { CircleUserRound, ListOrdered, ShoppingCart, SlidersHorizontal, Users } from "lucide-react";
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
        path: `${PathsAdminPanel.Main}`,
    },
    {
        icon: <Users />,
        title: 'Пользователи',
        path: `${PathsAdminPanel.Users}`,
    },
    {
        icon: <ShoppingCart />,
        title: 'Продукты',
        path: `${PathsAdminPanel.Products}`,
    },
    {
        icon: <ListOrdered />,
        title: 'Заказы',
        path: `${PathsAdminPanel.Orders}`,
    },
]