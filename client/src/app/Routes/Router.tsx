import {createBrowserRouter   } from 'react-router-dom'
import { AccountPage, Cart, CatalogCompanyPage, CatalogPage, Favorites, FeedbakPage, MainPage, Orders, ProdactPage, Profile } from './Lazy/Lazy';
import { Layout } from '../../layout';
import { Paths, PathsAccount } from './Types/paths';
import { useState } from 'react';
import { Forms } from '@/components/Forms/types.interface';
import { AuthGuard } from '../Providers/AuthGuard';

const Routes = () => {
    return createBrowserRouter([ 
        {
            element: <Layout />,
            children: [
                {
                    path: Paths.Home,
                    element: <MainPage />,
                },
                {
                    path: Paths.Account,
                    element: <AccountPage />,
                    children: [
                        {
                            path: PathsAccount.Main,
                            element:<AuthGuard>
                                        <Profile/>
                                    </AuthGuard>, 
                            
                        },
                        {
                            path: PathsAccount.Favorites,
                            element: <Favorites/>,
                        },
                        {
                            path: PathsAccount.Cart,
                            element: <Cart/>,
                        },
                        {
                            path: PathsAccount.Orders,
                            element: <Orders/>,
                        },
                    ]
                },
                {
                    path: Paths.Catalog,
                    element: <CatalogPage />,
                },
                {
                    path: Paths.Product,
                    element: <ProdactPage />
                },
                {
                    path: Paths.Feedback,
                    element: <FeedbakPage />,
                },
                
            ]
        },
    ]);
}
export {Routes}