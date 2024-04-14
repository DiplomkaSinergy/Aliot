import React, { useEffect } from 'react'

import './AdminProducts.scss'
import { RotateCcw, ShoppingCart } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Loading } from '@/components'

const thead = ['Картинка', 'Название', 'Цена', 'Дата создания', 'Дата обновления']

const AdminProducts = () => {

  const getProducts = useAdminStore(state => state.getProducts)
  const products = useAdminStore(state => state.products)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)

  
  useEffect(() => {
    getProducts()
  }, [getProducts]);


  return (
    <section className='AdminProducts'>
        <div className="AdminProducts__flex">
          <div className="AdminProducts__titleicon"><ShoppingCart /></div>
          <div className="AdminProducts__title">Продукты</div>
        </div>

        <div className="AdminUsers__count">Всего: {products.count}</div>
          <table className="table">
            <thead>
              <tr>
                {thead.map((item, i) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.rows?.map((item) => ( 
                <tr key={item.id}>
                  <td><img src={import.meta.env.VITE_APP_API_URL + item.img} alt={item.name} /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.createdAt}</td>
                  <td>{item.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='AdminUsers__fetchbtn' onClick={getProducts}>
            {loading ? <Loading/> :
            <>
            <RotateCcw /> <span>Загрузить еще</span>
            </>
            }
          </button>


    </section>
  )
}

export default AdminProducts