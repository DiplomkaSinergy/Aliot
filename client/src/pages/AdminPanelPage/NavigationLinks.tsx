import { PathsAccount, PathsAdminPanel } from "@/app/Routes/Types/paths";
import { CircleUserRound, Heart, ShoppingBag, ShoppingCart, SlidersHorizontal, Users } from "lucide-react";
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
        icon: <SlidersHorizontal />,
        title: 'Характеристики',
        path: `${PathsAdminPanel.Characteristics}`,
    },
]