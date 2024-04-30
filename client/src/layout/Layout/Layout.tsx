//@ts-nocheck


import React, {useCallback, useEffect, useState, Dispatch, FC} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { AuthForm, ChangePasswordFrom, ForgotPasswordForm, Menu } from '@/components'
import { Forms } from '@/components/Forms/types.interface'
import './Layout.scss'
import { ToastContainer } from 'react-toastify'


interface ILayoutProops {
  activeMenu: boolean
  activeAuthForm: Forms | null
  handleMenu: () => void
  handleAuthForm: (value: Forms | null) => void
}

const Layout = ({
  activeAuthForm, 
  activeMenu, 
  handleAuthForm,
  handleMenu}: ILayoutProops) => {


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