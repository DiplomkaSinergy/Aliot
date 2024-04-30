//@ts-nocheck

import React, { useEffect } from 'react'

import './PaymentPage.scss'
import { useParams } from 'react-router-dom'
import { useOrderStore } from '@/stores/orderStore'
import { useAuth } from '@/stores/authStore'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useCartOrderStore } from '@/stores/cartOrderStore'

const PaymentPage = () => {
  
  const {id} = useParams()
  const user = useAuth(state => state.user)
  const getOneOrdersById = useOrderStore(state => state.getOneOrdersById)
  const currentOrder = useOrderStore(state => state.currentOrder)
  const cretePayment = useOrderStore(state => state.cretePayment)
  const cartQuantity = useCartOrderStore((state) => state.cartQuantity);

  useEffect(() => {
    getOneOrdersById(id)
  }, [getOneOrdersById, id]);

  
  const handlePayment = async () => {
    try {
      const response = await cretePayment(currentOrder.price, id)
      
      console.log(response);

      if (response.status === 200) {
        console.log(response);
        window.location.href = response.data.confirmationUrl;
      } else {
        console.error('Failed to create payment:', response?.statusText);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };
  
  return (
    <section className='PaymentPage'>
      <div className="PaymentPage__id">Заказ № {id}</div>

      <div className="PaymentPage__info-flex">
            <div className="PaymentPage__list">
              {currentOrder.order_products?.map(item => (
                <div className="PaymentPage__item">
                      <div className="PaymentPage__item-img">
                        <img src={import.meta.env.VITE_APP_API_URL +  item.product.img} alt="" />
                      </div> 
                      <div className="PaymentPage__item-info">
                        <Link to={`/catalog/${item.product.id}`} className="PaymentPage__item-title">{item.product.name}</Link> 
                        <div className="PaymentPage__item-price">{item.product.price}  ₽ x {item.quantity}</div> 
                      </div>
                  </div>
              ))}
            </div>
        <div className="PaymentPage__info">
                <div className="PaymentPage__grid">
                    <div className="PaymentPage__info-block">
                      <div className="PaymentPage__info-title">Дата создания</div>
                      <div className="PaymentPage__info-description">{moment(currentOrder.createdAt).format('YYYY MM DD')}</div>
                    </div>
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

                {
                  currentOrder.status === 'Не оплачен' ?
                  <>
                  <div className="PaymentPage__info-block flex-block">
                    <div className="PaymentPage__info-title">Итого</div>
                    <div className="PaymentPage__info-description">{currentOrder.price} ₽</div>
                  </div>
                  <button className='PaymentPage__info-buybtn' onClick={() => handlePayment()}>Оплатить</button>
                  </>
                  : null
                }

          </div>
      </div>

    </section>
  )
}

export default PaymentPage