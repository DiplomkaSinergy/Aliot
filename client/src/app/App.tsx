import { RouterProvider } from 'react-router-dom'
import {Routes} from './Routes/Router'
import './App.scss'
import { useAuth } from '@/stores/authStore';
import { useEffect } from 'react';
import { useCartOrderStore } from '@/stores/cartOrderStore';

function App() {

  const chaekAuth = useAuth(state => state.chaekAuth)
  const getAllOrderCartItems = useCartOrderStore(state => state.getAllOrderCartItems)

  useEffect(() => {
    chaekAuth()
    getAllOrderCartItems()
  }, [])

  return (
    <RouterProvider router={Routes()}/>
  )
}

export default App
