import React, {useCallback, useEffect, useState, Dispatch, FC} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { AuthForm, ChangePasswordFrom, ForgotPasswordForm, Menu } from '@/components'
import { Forms } from '@/components/Forms/types.interface'
import './Layout.scss'
import { ToastContainer } from 'react-toastify'


// interface ILayoutProops {
//   activeAuthForm: Forms | null
//   setActiveAuthForm: Dispatch<React.SetStateAction<Forms | null>>
// }


const Layout = () => {

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

  return (
    <div className='layout'>
        <Header
          activeMenu={activeMenu}
          handleMenu={handleMenu}
          handleAuthForm={handleAuthForm}
        />
        <Menu
          activeMenu={activeMenu}
          handleMenu={handleMenu}
        />
        <AuthForm
          activeAuthForm={activeAuthForm}
          handleAuthForm={handleAuthForm}
        />
        <ChangePasswordFrom
          activeAuthForm={activeAuthForm} 
          handleAuthForm={handleAuthForm}
          />
        <ForgotPasswordForm
          activeAuthForm={activeAuthForm}
          handleAuthForm={handleAuthForm}
        />
        <main className='layout__main'>
            <Outlet/>
        </main>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export {Layout}