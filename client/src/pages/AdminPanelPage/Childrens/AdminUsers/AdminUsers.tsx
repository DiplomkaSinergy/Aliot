import React, { ChangeEvent, useEffect } from 'react'

import './AdminUsers.scss'
import { PencilLine, RotateCcw, User, UserX } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Loading } from '@/components'
import { useAuth } from '@/stores/authStore'

const thead = ['Имя', 'Фамилия', 'Телефон', 'Email', 'Роль', "Действие"]
const roles = ['ADMIN', 'USER']

const AdminUsers = () => {

  const userId = useAuth(state => state.user.id)
  const getUsers = useAdminStore(state => state.getUsers)
  const updateRole = useAdminStore(state => state.updateRole)
  const users = useAdminStore(state => state.users)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)

  useEffect(() => {
    getUsers()
  }, [getUsers]);

  // const handleChangeRole = (id: number | string, role: string) => () => {
  //   await updateRole(.id, role)
  //   await getUsers()
  // }

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
              {users.rows?.map((item) => ( 
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
              ))}
            </tbody>
          </table>
          <button className='AdminUsers__fetchbtn' onClick={getUsers}>
            {loading ? <Loading/> :
            <>
            <RotateCcw /> <span>Загрузить еще</span>
            </>
            }
          </button>

    </section>
  )
}

export default AdminUsers