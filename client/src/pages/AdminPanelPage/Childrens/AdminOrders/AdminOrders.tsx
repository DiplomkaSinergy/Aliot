import { SlidersHorizontal, UserX } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import './AdminOrders.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAuth } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'
import { changeColor } from '@/utils/helpers'
import moment from 'moment'
import { IOrderProduct } from '@/stores/orderStore'
import { Loading, ProductsInOrderForm } from '@/components'


const thead = ['Дата создания', 'Цена', 'Статус', 'email', 'ФИО', 'Товары']
const roles = ['Не оплачен', 'Оплачен', 'В сборке', 'Ожидают получения', 'Получен', 'Отмененные']


const AdminOrders = () => {


  const userId = useAuth(state => state.user.id)

  const orders = useAdminStore(state => state.orders)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)
  const activePage = useAdminStore(state => state._pageOrders)
  const totalCount = useAdminStore(state => state._totalCount)
  const limit = useAdminStore(state => state._limitOrders)

  const getOrders = useAdminStore(state => state.getOrders)
  const changeOrderStatus = useAdminStore(state => state.changeOrderStatus)
  const setPage = useAdminStore(state => state.setPage)

  const [activeWindow, setActiveWindow] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | null>(null);


  const pageCount = Math.ceil(totalCount / limit)
  const pages = []
  
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
}

  useEffect(() => {
    getOrders(1, 5)
  }, [getOrders]);

  useEffect(() => {
    getOrders(activePage, 5)
  }, [activePage, getOrders]);

  const handleWindowProductInfo = (id: number | null) => () => {
    setOrderId(id)
    setActiveWindow(!activeWindow)
  }


  return (
    <>
        <section className='AdminOrders'>
        <div className="AdminOrders__flex">
          <div className="AdminOrders__titleicon"><SlidersHorizontal /></div>
          <div className="AdminOrders__title">Заказы</div>
        </div>

        <div className="AdminOrders__count">Всего: {totalCount}</div>
          <table className="table">
            <thead>
              <tr>
                {thead.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TransitionGroup component={null}>
                  {orders.rows?.map((item, i) => ( 
                    <CSSTransition
                    key={i}
                    timeout={300}
                    classNames="Catalog__item"
                    >
                      <tr key={item.id}>
                        <td>{moment(item.createdAt).format('DD - MM - YYYY')}</td>
                        <td>{item.price} ₽</td>
                        <td>
                          <select 
                          className={'AdminOrders__select' } 
                          value={item.status} 
                          onChange={(event) => changeOrderStatus(item.id, event.target.value)}
                          > 
                            {roles.map(role => (
                              <option value={role}>{role}</option>
                            ))}
                          </select>
                        </td>
                        <td>{item.user?.email}</td>
                        <td>{item.user?.firstName} {item.user?.lastName}</td>
                        <td>
                          <button className='AdminOrders__product-btn' onClick={handleWindowProductInfo(item.id)}>Подробнее</button>
                       
                        </td>
                    </tr>
                    </CSSTransition>
                    
                  ))}
              </TransitionGroup>
            </tbody>
          </table>
          {loading 
          ? <Loading/> 
          :
          <div className="AdminOrders__pagination">
              {pages.map((page, i) =>
                  <div
                      key={page}
                      className={activePage === i + 1? 'pagination-item pagination-item-active': 'pagination-item'}
                      onClick={() => setPage(page, 'user')}
                  >
                      {page}
                  </div>
              )}
            </div>
          }
          {error && 
          <small className="error">{error}</small>
          }

    </section>


    {activeWindow
    ?
    <ProductsInOrderForm
      activeWindow={activeWindow}
      handleModal={handleWindowProductInfo}
      orderId={orderId}
    />
    : null
    }


    </>
  )
}

export default AdminOrders