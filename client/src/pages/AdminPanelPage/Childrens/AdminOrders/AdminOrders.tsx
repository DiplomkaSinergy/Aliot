import { SlidersHorizontal, UserX } from 'lucide-react'
import React, { useEffect } from 'react'

import './AdminOrders.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useAuth } from '@/stores/authStore'
import { useAdminStore } from '@/stores/adminStore'
import { changeColor } from '@/utils/helpers'
import moment from 'moment'


const thead = ['Дата создания', 'Цена', 'Статус', 'Товары', 'email', 'ФИО']
const roles = ['Не оплачен', 'Купленные', 'В сборке', 'Ожидают получения', 'Отмененные']


const AdminOrders = () => {


  const userId = useAuth(state => state.user.id)
  const getOrders = useAdminStore(state => state.getOrders)
  const updateRole = useAdminStore(state => state.updateRole)
  const orders = useAdminStore(state => state.orders)
  const changeOrderStatus = useAdminStore(state => state.changeOrderStatus)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)
  const activePage = useAdminStore(state => state._pageUsers)
  const totalCount = useAdminStore(state => state._totalCount)
  const limit = useAdminStore(state => state._limitUsers)
  const setPage = useAdminStore(state => state.setPage)


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


  return (
    <section className='AdminOrders'>
        <div className="AdminOrders__flex">
          <div className="AdminOrders__titleicon"><SlidersHorizontal /></div>
          <div className="AdminOrders__title">Заказы</div>
        </div>

        <div className="AdminOrders__count">Всего: {orders.count}</div>
          <table className="table">
            <thead>
              <tr>
                {thead.map((item, i) => (
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
                        <td>
                          {item.order_products.map(item => (
                            <div className="">{item.product.name} x {item.quantity}</div>
                          ))}
                        </td>
                        <td>{item.user.email}</td>
                        <td>{item.user.firstName} {item.user.lastName}</td>
                        {/* <td>
                          <div className="AdminOrders__actions">
                            <div className="AdminOrders__icon"><UserX color='red'/></div>
                          </div>
                        </td> */}
                    </tr>
                    </CSSTransition>
                    
                  ))}
              </TransitionGroup>
            </tbody>
          </table>
          <div className="AdminUsers__pagination">
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

    </section>
  )
}

export default AdminOrders