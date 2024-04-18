import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './AdminProducts.scss'
import { RotateCcw, ShoppingCart } from 'lucide-react'
import { useAdminStore } from '@/stores/adminStore'
import { Loading, ProductForm } from '@/components'
import { ToastContainer } from 'react-toastify'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const thead = ['Картинка', 'Название', 'Цена', 'Дата создания', 'Дата обновления']

const AdminProducts = () => {

  const getProducts = useAdminStore(state => state.getProducts)
  const products = useAdminStore(state => state.products)
  const error = useAdminStore(state => state.error)
  const loading = useAdminStore(state => state.loading)
  const totalCount = useAdminStore(state => state._totalCount)
  const pageProduct = useAdminStore(state => state._pageProduct)
  const limit = useAdminStore(state => state._limitProducts)
  const setPage = useAdminStore(state => state.setPage)
  
  const [currentItem, setCurrentItem] = useState(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(true);
  
  const pageCount = Math.ceil(totalCount / limit)
  const pages = []
  
  for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1)
  }

  useEffect(() => {
    getProducts(1, 3)
  }, [getProducts]);
  
  useEffect(() => {
    getProducts(pageProduct, 3)
  }, [pageProduct, getProducts]);

  const handleModal = () => {
    setActiveModal(!activeModal);
    setIsCreating(true);
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [activeModal]);


  return (
    <>
      <section className='AdminProducts'>
          <div className="AdminProducts__flex">
            <div className="AdminProducts__titleicon"><ShoppingCart /></div>
            <div className="AdminProducts__title">Продукты</div>
          </div>

          <div className="AdminProducts__bar">
          <div className="AdminProducts__count">Всего: {totalCount}</div>
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
              <TransitionGroup  component={null}>
                {products?.rows?.map((item, i) => ( 
                  <CSSTransition
                      key={i}
                      timeout={300}
                      classNames="Catalog__item"
                      >
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
                  </CSSTransition>
                    
                  ))}
              </TransitionGroup>

              </tbody>
            </table>
            <div className="AdminProducts__pagination">
              {pages.map((page, i) =>
                  <div
                      key={page}
                      className={pageProduct === i + 1? 'pagination-item pagination-item-active': 'pagination-item'}
                      onClick={() => setPage(page, 'product')}
                  >
                      {page}
                  </div>
              )}
            </div>
            {/* <button className='AdminProducts__fetchbtn' onClick={() => getProducts(1, 3)}>
              {loading ? <Loading/> :
              <>
              <RotateCcw /> <span>Загрузить еще</span>
              </>
              }
            </button> */}

      </section>

    {activeModal ? 
    <>
    {/* <div className="">asdasdsd</div> */}
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