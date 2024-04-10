import React, { useEffect, useState } from 'react'

import { ShoppingBasket } from 'lucide-react'
import './Cart.scss'
import { ICartItem, useCartOrderStore } from '@/stores/cartOrderStore'
import { CartOrderItem, List } from '@/components'
import { useAuth } from '@/stores/authStore'

import battary from '../../../../assets/img/battartyZag.jpg'
import { Link } from 'react-router-dom'
import { Paths } from '@/app/Routes/Types/paths'

const Cart = () => {

  const cartItems = useCartOrderStore(state => state.cartItems)
  const asyncDecreaseCartQuantity = useCartOrderStore(state => state.asyncDecreaseCartQuantity)
  const asyncIncreaseCartQuantity = useCartOrderStore(state => state.asyncIncreaseCartQuantity)
  const removeFromCart = useCartOrderStore(state => state.removeFromCart)
  const basketId = useAuth(state => state.basket.id);

  return (
    <section className='Cart'> 
      <div className="Cart__flex">
        <div className="Cart__icon"><ShoppingBasket /></div>
        <div className="Cart__title">Корзина</div>
      </div>
      <div className="Cart__list">
        {cartItems.length === 0? 
        <div className="Cart__empty">
            <div className="Cart__empty-title">Ваша корзина пуста</div>
            <div className="Cart__empty-img"><img src={battary} alt="battary" /></div>
            <Link to={Paths.Catalog} className="Cart__empty-link">К покупкам</Link>
        </div>
        :
        cartItems?.map(item => (
          <CartOrderItem 
          product={item} 
          basketId={basketId}
          asyncDecreaseCartQuantity={asyncDecreaseCartQuantity}
          asyncIncreaseCartQuantity={asyncIncreaseCartQuantity}
          removeFromCart={removeFromCart}
          key={item.id}/>
        ))
        }
      </div>
    </section>
  )
}





export default Cart