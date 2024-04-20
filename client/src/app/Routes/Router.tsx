import { createBrowserRouter } from 'react-router-dom';
import {
  AccountPage,
  AdminCharacteristics,
  AdminMain,
  AdminOrders,
  AdminPanelPage,
  AdminProducts,
  AdminUsers,
  Cart,
  CatalogPage,
  Favorites,
  FeedbakPage,
  MainPage,
  Orders,
  PaymentPage,
  ProdactPage,
  Profile,
} from './Lazy/Lazy';
import { Layout } from '../../layout';
import { Paths, PathsAccount, PathsAdminPanel } from './Types/paths';
import { AuthGuard } from '../Providers/AuthGuard';
import { Notification } from '@/components/Blocks/Tostify/Tostify';

const Routes = () => {
  return createBrowserRouter([
    
    {
      path: Paths.AdminPanel,
      element: <AdminPanelPage /> ,
      children: [
        {
            path: PathsAdminPanel.Main,
            element: <AuthGuard><AdminMain /></AuthGuard>,
        },
        {
            path: PathsAdminPanel.Users,
            element: <AuthGuard><AdminUsers /></AuthGuard>,
        },
        {
            path: PathsAdminPanel.Products,
            element: <AuthGuard><AdminProducts /></AuthGuard>,
        },
        {
            path: PathsAdminPanel.Characteristics,
            element: <AdminCharacteristics />,
        },
        {
            path: PathsAdminPanel.Orders,
            element: <AuthGuard><AdminOrders /></AuthGuard>,
        },
      ]
    },
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
              element: (
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              ),
            },
            {
              path: PathsAccount.Favorites,
              element: (
                <AuthGuard>
                  <Favorites />
                </AuthGuard>
              ),
            },
            {
              path: PathsAccount.Cart,
              element: (
                <AuthGuard>
                  <Cart />
                </AuthGuard>
              ),
            },
            {
              path: PathsAccount.Orders,
              element: (
                <AuthGuard>
                  <Orders />
                </AuthGuard>
              ),
            },
            {
              path: PathsAccount.Order,
              element: <PaymentPage />,
            },
          ],
        },
        {
          path: Paths.Catalog,
          element: <CatalogPage />,
        },
        {
          path: Paths.Product,
          element: <ProdactPage />,
        },
        {
          path: Paths.Feedback,
          element: <FeedbakPage />,
        },
      ],
    },
  ]);
};
export { Routes };
