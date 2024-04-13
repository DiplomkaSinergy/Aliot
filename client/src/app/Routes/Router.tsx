import { createBrowserRouter } from 'react-router-dom';
import {
  AccountPage,
  AdminCharacteristics,
  AdminMain,
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

const Routes = () => {
  return createBrowserRouter([
    {
      path: Paths.Payment,
      element: <PaymentPage />,
    },
    {
      path: Paths.AdminPanel,
      element: <AdminPanelPage />,
      children: [
        {
            path: PathsAdminPanel.Main,
            element: <AdminMain />,
        },
        {
            path: PathsAdminPanel.Users,
            element: <AdminUsers />,
        },
        {
            path: PathsAdminPanel.Products,
            element: <AdminProducts />,
        },
        {
            path: PathsAdminPanel.Characteristics,
            element: <AdminCharacteristics />,
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
