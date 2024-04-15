import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './AdminProducts.scss'
import { RotateCcw, ShoppingCart } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Loading, ProductForm } from '@/components'

const thead = ['Картинка', 'Название', 'Цена', 'Дата создания', 'Дата обновления']

const AdminProducts = () => {

  const getProducts = useAdminStore(state => state.getProducts)
  const products = useAdminStore(state => state.products)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)
  
  const [currentItem, setCurrentItem] = useState(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(true);
  
  useEffect(() => {
    getProducts()
  }, [getProducts]);
  

  const handleModal = () => {
    setActiveModal(!activeModal);
    setIsCreating(true);
  };


  return (
    <>
      <section className='AdminProducts'>
          <div className="AdminProducts__flex">
            <div className="AdminProducts__titleicon"><ShoppingCart /></div>
            <div className="AdminProducts__title">Продукты</div>
          </div>

          <div className="AdminProducts__bar">
          <div className="AdminProducts__count">Всего: {products.count}</div>
          <button className='AdminProducts__createbtn' onClick={handleModal}>Создать продукт</button>
          </div>
            <table className="tableProducts">
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
                    <td>
                      <div className="tableProducts__img">
                        <img src={import.meta.env.VITE_APP_API_URL + item.img} alt={item.name} />
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}₽</td>
                    <td>Дата: {moment(item.createdAt).format('YYYY-MM-DD')}
                    <br />
                    <br />
                        Время: {moment(item.createdAt).format('HH:mm:ss')}
                    </td>
                    <td>Дата: {moment(item.updatedAt).format('YYYY-MM-DD')}
                    <br />
                    <br />
                        Время: {moment(item.updatedAt).format('HH:mm:ss')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className='AdminProducts__fetchbtn' onClick={getProducts}>
              {loading ? <Loading/> :
              <>
              <RotateCcw /> <span>Загрузить еще</span>
              </>
              }
            </button>


      </section>

    {activeModal ? 
    <>
    <div className="">asdasdsd</div>
    <ProductForm
    currentItem={currentItem}
    isCreating={isCreating}
    activeModal={activeModal}
    handleModal={handleModal}
    />
    </>
      :
        null
      }
    </>
  )
}

export default AdminProducts