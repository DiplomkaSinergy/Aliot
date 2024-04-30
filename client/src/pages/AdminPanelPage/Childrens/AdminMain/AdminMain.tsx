//@ts-nocheck

import React from 'react'

import './AdminMain.scss'
import { LogOut, UserRoundCog } from 'lucide-react'
import { useAuth } from '@/stores/authStore'
import {notification} from '@/components/Blocks/Tostify/Tostify'
import { ToastContainer } from 'react-toastify'
const AdminMain = () => {
  
  const firstName = useAuth(state => state.user.firstName)
  const email = useAuth(state => state.user.email)
  const phone = useAuth(state => state.user.phone)
  const loguot = useAuth(state => state.loguot)


  return (
    <section className='AdminMain'>
        <div className="AdminMain__flex">
          <div className="AdminMain__icon"><UserRoundCog /></div>
          <div className="AdminMain__title">Учётные данные</div>
        </div>
        <div className="AdminMain__wrapper">
          <div className="AdminMain__block">
              <div className="AdminMain__item">
                <div className="AdminMain__item-title">ФИО</div>
                  <div className="AdminMain__item-subtitle">{firstName}</div>
              </div>
          <div className="AdminMain__item">
              <div className="AdminMain__item-title">Телефон</div>
              <div className="AdminMain__item-subtitle">{phone ? phone : '---'}</div>
          </div>
          </div>
          <div className="AdminMain__block">
          <div className="AdminMain__item">
              <div className="AdminMain__item-title">Почта</div>
              <div className="AdminMain__item-subtitle">{email}</div>
          </div>
          </div>
        </div>

        <button className="AdminMain__leave" onClick={loguot}><LogOut />Выйти</button>
        <ToastContainer />
    </section>
  )
}

export default AdminMain