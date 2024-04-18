import React, { ChangeEvent, useEffect } from 'react'

import './AdminUsers.scss'
import { PencilLine, RotateCcw, User, UserX } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Loading } from '@/components'
import { useAuth } from '@/stores/authStore'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const thead = ['Имя', 'Фамилия', 'Телефон', 'Email', 'Роль', "Действие"]
const roles = ['ADMIN', 'USER']

const AdminUsers = () => {

  const userId = useAuth(state => state.user.id)
  const getUsers = useAdminStore(state => state.getUsers)
  const updateRole = useAdminStore(state => state.updateRole)
  const users = useAdminStore(state => state.users)
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
    getUsers(1, 5)
  }, [getUsers]);

  useEffect(() => {
    getUsers(activePage, 5)
  }, [activePage, getUsers]);



  return (
    
    <section className='AdminUsers'>
        <div className="AdminUsers__flex">
          <div className="AdminUsers__titleicon"><User /></div>
          <div className="AdminUsers__title">Пользователи</div>
        </div>
        <div className="AdminUsers__count">Всего: {users.count}</div>
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
                  {users.rows?.map((item, i) => ( 
                    <CSSTransition
                    key={i}
                    timeout={300}
                    classNames="Catalog__item"
                    >
                      <tr key={item.id}>
                        <td>{item.firstName}</td>
                        <td>{!item.lastName ? '-': item.lastName}</td>
                        <td>{!item.phone ? '-': item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                          {userId === item.id ? 
                          <div>{item.role}</div>
                          :
                          <select className='AdminUsers__select' value={item.role} onChange={(event) => updateRole(item.id, event.target.value)} > 
                            {roles.map(role => (
                              <option value={role}>{role}</option>
                            ))}
                          </select>
                          }
                        </td>
                        <td>
                          <div className="AdminUsers__actions">
                            <div className="AdminUsers__icon"><UserX color='red'/></div>
                            {/* <div className="AdminUsers__icon"><PencilLine color='blue'/></div> */}
                          </div>
                        </td>
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
          {/* <button className='AdminUsers__fetchbtn' onClick={() => getUsers()}>
            {loading ? <Loading/> :
            <>
            <RotateCcw /> <span>Загрузить еще</span>
            </>
            }
          </button> */}

    </section>
  )
}

export default AdminUsers