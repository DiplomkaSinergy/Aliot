import React, { ChangeEvent, useEffect, useState } from 'react'

import './AdminUsers.scss'
import { User as UserLucide,UserX } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { useAuth } from '@/stores/authStore'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { User } from '@/utils/Types/User'
import { ToastContainer, toast } from 'react-toastify'

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
  const deleteUser = useAdminStore(state => state.deleteUser)
  
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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


  const handleMenu = (user: User | null) => () => {
    setActiveModal(value => !value)
    setCurrentUser(user)
  }

  const handleDeleteUser = (
    userId: number | undefined
  ) =>  async () => {
    try {
      toast.promise(
        deleteUser(userId),
        {
          pending: 'Удаление пользователя в процессе...',
          success: 'Пользователь удален!',
          error: error
        },
      )
      setActiveModal(false)
      getUsers(activePage, 5)
    } catch (e) {
      toast.error(error);
    }
  }


  return (
    
    <section className='AdminUsers'>
        <div className="AdminUsers__flex">
          <div className="AdminUsers__titleicon"><UserLucide /></div>
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
                          {userId === item.id ?
                            <div className="">---</div>                          
                          :
                          <div className="AdminUsers__actions">
                            <div className="AdminUsers__icon" onClick={handleMenu(item)}><UserX color='red'/></div>
                          </div>
                          }
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
            <MoadlConfitmDelete 
            handleDeleteUser={handleDeleteUser}
            activeModal={activeModal} 
            handleMenu={handleMenu} 
            user={currentUser}/>
            <ToastContainer/>
    </section>
  )
}



function MoadlConfitmDelete({
  user,
  handleMenu,
  activeModal,
  handleDeleteUser
}: {
  user: User | null,
  handleMenu: (user: User | null) => () => void
  activeModal: boolean,
  handleDeleteUser: (userId: number | undefined) => () => Promise<void>
}) {
  return (
    <div onClick={handleMenu(null)} className={activeModal ? 'Modal Modal-active' : 'Modal'}>
      <div onClick={e => e.stopPropagation()} className="Modal__content">
          <h3 className="modal-title">Вы точно хотите удалить пользователя {user?.firstName} {user?.lastName}?</h3>
          <div className="modal-flex">
            <button className='modal-btn btn-back' onClick={handleMenu(null)}>Назад</button>
            <button className='modal-btn btn-del' onClick={handleDeleteUser(user?.id)}>Удалить</button>
          </div>
      </div>
  </div>
  )
}


export default AdminUsers