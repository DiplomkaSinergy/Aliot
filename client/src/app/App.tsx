import { RouterProvider } from 'react-router-dom'
import {Routes} from './Routes/Router'
import './App.scss'
import { useAuth } from '@/stores/authStore';
import { useEffect } from 'react';

function App() {

  const chaekAuth = useAuth(state => state.chaekAuth)
  // const getFil = useAuth(state => state.getFil)

  useEffect(() => {
    chaekAuth().then(data => {
      // console.log(data);
    })

    // getFil().then(data => {
    //   console.log(data);
    // })
  }, [])

  return (
    <RouterProvider router={Routes()}/>
  )
}

export default App
