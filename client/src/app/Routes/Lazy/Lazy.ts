import { lazy } from 'react';
import { Loadable } from '../../Providers/Loadable';


export const MainPage = Loadable(
    lazy(() => import('@/pages/MainPage/MainPage'))
);
export const CatalogPage = Loadable(
    lazy(() => import('@/pages/CatalogPage/CatalogPage'))
);
export const CatalogCompanyPage = Loadable(
    lazy(() => import('@/pages/CatalogCompanyPage/CatalogCompanyPage'))
);
export const ProdactPage = Loadable(
    lazy(() => import('@/pages/ProdactPage/ProdactPage'))
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

