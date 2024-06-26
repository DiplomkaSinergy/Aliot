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
  ErrorPage,
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
import { useCallback, useEffect, useState } from 'react';
import { Forms } from '@/components/Forms/types.interface';
import { useAuth } from '@/stores/authStore';

const Routes = () => {

  const checkAuth = useAuth(state => state.chaekAuth)
  const [activeAuthForm, setActiveAuthForm] = useState<Forms | null>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  useEffect(() => {
    if (activeAuthForm !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    switch(activeAuthForm) {
      case Forms.Auth: 
        setActiveAuthForm(Forms.Auth)
        break
      case Forms.ChangePassword: 
        setActiveAuthForm(Forms.ChangePassword)
        break
      case Forms.ForgotPassword: 
        setActiveAuthForm(Forms.ForgotPassword)
        break
    }
  }, [activeAuthForm]);

  const handleMenu = () => {
    setActiveMenu(value => !value)
  }

  const handleAuthForm = useCallback((value: Forms | null) => {
    setActiveAuthForm(value)
  }, []);

  return createBrowserRouter([
    
    {
      path: Paths.AdminPanel,
      errorElement: <ErrorPage/>,
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
      element: <Layout 
      activeAuthForm={activeAuthForm}
      activeMenu={activeMenu}
      handleAuthForm={handleAuthForm}
      handleMenu={handleMenu}
      />,
      errorElement: <ErrorPage/>,
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
          loader: async () => {
            const user = await checkAuth()
            return user || null
          },
          element: (
            <AuthGuard handleAuthForm={handleAuthForm}><CatalogPage /></AuthGuard>
          )
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
