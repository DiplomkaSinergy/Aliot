import React from 'react'

import './AdminMain.scss'
import { LogOut, UserRoundCog } from 'lucide-react'
import { useAuth } from '@/stores/authStore'

const AdminMain = () => {
  const firstName = useAuth(state => state.user.firstName)
  const email = useAuth(state => state.user.email)
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
                {/* <div className='hr'></div> */}
                  <div className="AdminMain__item-subtitle">{firstName}</div>
              </div>
              <div className="AdminMain__item">
                <div className="AdminMain__item-title">Дата рождения</div>
                {/* <div className='hr'></div> */}
                <div className="AdminMain__item-subtitle">5 Мая 2004</div>
              </div>
              <div className="AdminMain__item">
                <div className="AdminMain__item-title">Пол</div>
                {/* <div className='hr'></div> */}
                <div className="AdminMain__item-subtitle">Муж.</div>
              </div>
          </div>
          <div className="AdminMain__block">
          <div className="AdminMain__item">
              <div className="AdminMain__item-title">Телефон</div>
              {/* <div className='hr'></div> */}
              <div className="AdminMain__item-subtitle">+7 (916) 288 68 13</div>
          </div>
          <div className="AdminMain__item">
              <div className="AdminMain__item-title">Почта</div>
              {/* <div className='hr'></div> */}
              <div className="AdminMain__item-subtitle">{email}</div>
          </div>
          </div>
        </div>

        <button className="AdminMain__leave" onClick={loguot}><LogOut />Выйти</button>
    </section>
  )
}

export default AdminMain