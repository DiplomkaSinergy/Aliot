import React from 'react'

import './OrderItem.scss'
import { Link } from 'react-router-dom'
import { IOrder, OrderWithProducts } from '@/stores/orderStore'
import moment from 'moment'
import { changeColor } from '@/utils/helpers'

interface IOrderItemProps {
  item: OrderWithProducts
}

const OrderItem = ({item}: IOrderItemProps) => {
  return (
    
    <div className="OrderItem">
        <div className="OrderItem__header">
          <div className="OrderItem__left">
            {/* <div className="OrderItem__title">{moment(item.createdAt).locale('ru').format('YYYY-MM-DD')}</div> */}
            <Link to={`/my/order/${item.id}`} className="OrderItem__title">Посмотреть подробнее № {item.id}</Link>
          </div>
          <div ><span className={changeColor(item.status)}>{item.status}</span></div>
          <div className="OrderItem__title">{item.price} ₽</div>
        </div>

        <div className="OrderItem__productlist">
          {item.order_products.map(item => (
            <div className="OrderItem__productlist-item">
              <div className="OrderItem__productlist-left">
                <div className="OrderItem__productlist-title"><span>{item.product.name}</span></div>
                {/* <div className="OrderItem__productlist-title">Дата создания: {moment(item.createdAt).format('YYYY-MM-DD')}</div> */}
              </div>
              <div className="OrderItem__productlist-rifht">
                <img src={import.meta.env.VITE_APP_API_URL + item.product.img} alt="item" />
              </div>
            </div>
          ))}
        </div>
      </div>
    
  )
}

export {OrderItem}