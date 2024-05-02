import { RouterProvider } from 'react-router-dom'
import {Routes} from './Routes/Router'
import './App.scss'
import { useAuth } from '@/stores/authStore';
import { useEffect } from 'react';
import { useCartOrderStore } from '@/stores/cartOrderStore';

function App() {

  const chaekAuth = useAuth(state => state.chaekAuth)
  const isAuth = useAuth(state => state.isAuth)
  const getAllOrderCartItems = useCartOrderStore(state => state.getAllOrderCartItems)
  const basketId = useAuth(state => state.basket?.id)

  useEffect(() => {
    chaekAuth()
    if (isAuth) {
      getAllOrderCartItems(basketId)
    }
  }, [isAuth])

  return (
    <RouterProvider router={Routes()}/>
  )
}

export default App
