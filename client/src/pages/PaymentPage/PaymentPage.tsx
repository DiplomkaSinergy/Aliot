import React, { useEffect } from 'react'

import './PaymentPage.scss'
import { useParams } from 'react-router-dom'
import { useOrderStore } from '@/stores/orderStore'
import { useAuth } from '@/stores/authStore'

const PaymentPage = () => {
  
  const {id} = useParams()
  const user = useAuth(state => state.user)
  const getOneOrdersById = useOrderStore(state => state.getOneOrdersById)
  const currentOrder = useOrderStore(state => state.currentOrder)

  useEffect(() => {
    getOneOrdersById(id)
  }, [getOneOrdersById, id]);
  
  return (
    <section className='PaymentPage'>
      <div className="PaymentPage__id">Заказ № {id}</div>
      <div className="PaymentPage__createDate">{currentOrder.createdAt}</div>

      <div className="PaymentPage__info">
        <div className="PaymentPage__info-flex">
          <div>
                <div className="PaymentPage__info-block">
                  <div className="PaymentPage__info-title">Пункт получения</div>
                  <div className="PaymentPage__info-description">{currentOrder.address}</div>
                </div>
                <div className="PaymentPage__info-block">
                  <div className="PaymentPage__info-title">Получатель</div>
                  <div className="PaymentPage__info-description">{user.firstName} {user.lastName}</div>
                  <div className="PaymentPage__info-description">{user.email}</div>
                  <div className="PaymentPage__info-description">{user.phone}</div>
                </div>
          </div>
          <div>
                <div className="PaymentPage__info-block flex-block">
                  <div className="PaymentPage__info-title">Итого</div>
                  <div className="PaymentPage__info-description">{currentOrder.price} ₽</div>
                </div>
                <button className='PaymentPage__info-buybtn'>Оплатить</button>

          </div>
        </div>
      </div>

      <div className="PaymentPage__list">
        {currentOrder.order_products.map(item => (
          <div className="PaymentPage__item">
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default PaymentPage