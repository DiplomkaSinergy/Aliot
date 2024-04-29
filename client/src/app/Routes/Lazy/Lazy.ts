import { lazy } from 'react';
import { Loadable } from '../../Providers/Loadable';


export const MainPage = Loadable(
    lazy(() => import('@/pages/MainPage/MainPage'))
);
export const CatalogPage = Loadable(
    lazy(() => import('@/pages/CatalogPage/CatalogPage'))
);
export const ProdactPage = Loadable(
    lazy(() => import('@/pages/ProdactPage/ProdactPage'))
);
export const PaymentPage = Loadable(
    lazy(() => import('@/pages/PaymentPage/PaymentPage'))
);
export const ErrorPage = Loadable(
    lazy(() => import('@/pages/ErrorPage/ErrorPage'))
);

//@ FeedBack
export const FeedbakPage = Loadable(
    lazy(() => import('@/pages/FeedbakPage/FeedbakPage'))
);


//@ Account Pages
export const AccountPage = Loadable(
    lazy(() => import('@/pages/AccountPage/AccountPage'))
);

//* Childrens
export const Profile = Loadable(
    lazy(() => import('@/pages/AccountPage/Childrens/Profile/Profile'))
);
export const Favorites = Loadable(
    lazy(() => import('@/pages/AccountPage/Childrens/Favorites/Favorites'))
);
export const Cart = Loadable(
    lazy(() => import('@/pages/AccountPage/Childrens/Cart/Cart'))
);
export const Orders = Loadable(
    lazy(() => import('@/pages/AccountPage/Childrens/Orders/Orders'))
);


//@ AdminPanel Pages
export const AdminPanelPage = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/AdminPanelPage'))
);


//* Childrens
export const AdminMain = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/Childrens/AdminMain/AdminMain'))
);
export const AdminUsers = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/Childrens/AdminUsers/AdminUsers'))
);
export const AdminProducts = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/Childrens/AdminProducts/AdminProducts'))
);
export const AdminCharacteristics = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/Childrens/AdminCharacteristics/AdminCharacteristics'))
);
export const AdminOrders = Loadable(
    lazy(() => import('@/pages/AdminPanelPage/Childrens/AdminOrders/AdminOrders'))
);
