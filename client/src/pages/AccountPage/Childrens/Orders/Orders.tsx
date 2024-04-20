import React, { useEffect, useState } from 'react'
import './Orders.scss'
import { ToastContainer } from 'react-toastify'
import { ShoppingBag, ShoppingBasket } from 'lucide-react'
import { IOrderProducts, useOrderStore } from '@/stores/orderStore'
import { useAuth } from '@/stores/authStore'
import { Link } from 'react-router-dom'
import { changeColor } from '@/utils/helpers'
import moment from 'moment'
import { Paths } from '@/app/Routes/Types/paths'
import { OrderItem } from '@/components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

type tabOrder = {
  title: string,
  value: string
}

const tabs: tabOrder[] = [
  {
    title: 'Все',
    value: 'all',
  },
  {
    title: 'Не оплачен',
    value: 'notBuy',
  },
  {
    title: 'Купленные',
    value: 'bought',
  },
  {
    title: 'В сборке',
    value: 'in process',
  },
  {
    title: 'Ожидают получения',
    value: 'waiting',
  },
  {
    title: 'Отмененные',
    value: 'reject',
  },
]

const Orders = () => {

  const userId = useAuth(state => state.user.id)
  const orders = useOrderStore(state => state.orders)
  const getAllOrdersById = useOrderStore(state => state.getAllOrdersById)
  const [activeTab, setActiveTab] = useState<string>('Все');


  useEffect(() => {
    getAllOrdersById(userId)
  }, []);

  const filtredOrders = orders.filter((item) => {
    if (activeTab === 'Все') {
      return orders
    }

    return item.status.toLowerCase() === activeTab.toLowerCase()
  })



  return (
    <div className='Orders'>
      <div className='Orders__flex'>
        <div className='Orders__icon'>
          <ShoppingBag />
        </div>
        <div className='Orders__title'>Заказы</div>
      </div>

      <select className='Orders__select' onChange={(e) => setActiveTab(e.target.value)}>
        {tabs.map(item => (
          <option value={item.title}>{item.title}</option>
        ))}
      </select>


      <div className="Orders__list">
        <TransitionGroup  component={null}>
          {filtredOrders.map((item, i) => (
            <CSSTransition
            key={i}
            timeout={300}
            classNames="Catalog__item"
            >
              <OrderItem item={item}/>
            </CSSTransition>
          ))}
        </TransitionGroup>
        
      </div>

    </div>
  )
}

export default Orders