import { LogOut, UserRoundCog } from 'lucide-react'
import React from 'react'

import './Profile.scss'
import { useAuth } from '@/stores/authStore'

const Profile = () => {

  const firstName = useAuth(state => state.user.firstName)
  const lastName = useAuth(state => state.user.lastName)
  const email = useAuth(state => state.user.email)
  const loguot = useAuth(state => state.loguot)

  
  return (
    <section className='Profile'>
        <div className="Profile__flex">
          <div className="Profile__icon"><UserRoundCog /></div>
          <div className="Profile__title">Учётные данные</div>
        </div>
        <div className="Profile__wrapper">
          <div className="Profile__block">
              <div className="Profile__item">
                <div className="Profile__item-title">ФИО</div>
                {/* <div className='hr'></div> */}
                  <div className="Profile__item-subtitle">{firstName} {lastName}</div>
              </div>
          </div>
          <div className="Profile__block">
          <div className="Profile__item">
              <div className="Profile__item-title">Телефон</div>
              {/* <div className='hr'></div> */}
              <div className="Profile__item-subtitle">+7 (916) 288 68 13</div>
          </div>
          <div className="Profile__item">
              <div className="Profile__item-title">Почта</div>
              {/* <div className='hr'></div> */}
              <div className="Profile__item-subtitle">{email}</div>
          </div>
          </div>
        </div>

        <button className="Profile__leave" onClick={loguot}><LogOut />Выйти</button>
    </section>
  )
}

export default Profile