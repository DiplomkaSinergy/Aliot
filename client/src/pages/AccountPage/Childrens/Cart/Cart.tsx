import React, { MouseEvent, useEffect, useState } from 'react';

import { ShoppingBasket } from 'lucide-react';
import { ICartItem, useCartOrderStore } from '@/stores/cartOrderStore';
import { CartOrderItem, List } from '@/components';
import { useAuth } from '@/stores/authStore';

import battary from '../../../../assets/img/battartyZag.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '@/app/Routes/Types/paths';
import axios, { AxiosError, isAxiosError } from 'axios';
import { $host } from '@/services/instance';
import { AuthErrorType } from '@/utils/Types/Errors';
import { useOrderStore } from '@/stores/orderStore';
import './Cart.scss';
import { ToastContainer, toast } from 'react-toastify';

const arrAdreses = [
  'Мск. ул.Владыкино, д11, к2',
  'Мск. ул.Бочково, д5',
  'Мск. ул.Угрешская, д1, к1',
  'Мск. ул.Матвеевксая, д38, к2',
  'Мск. Ленинский проспект, 4',
];
const Cart = () => {
  const navigate = useNavigate()
  const basketId = useAuth((state) => state.basket.id);
  const userId = useAuth((state) => state.user.id);
  const cartItems = useCartOrderStore((state) => state.cartItems);
  const cartQuantity = useCartOrderStore((state) => state.cartQuantity);
  const clearBasket = useCartOrderStore((state) => state.clearBasket);
  const asyncDecreaseCartQuantity = useCartOrderStore(
    (state) => state.asyncDecreaseCartQuantity
  );
  const asyncIncreaseCartQuantity = useCartOrderStore(
    (state) => state.asyncIncreaseCartQuantity
  );
  const removeFromCart = useCartOrderStore((state) => state.removeFromCart);
  const getAllOrderCartItems = useCartOrderStore(
    (state) => state.getAllOrderCartItems
  );

  const creteOrder = useOrderStore((state) => state.creteOrder);
  const error = useOrderStore((state) => state.error);

  const [address, setAddress] = useState<string | null>(null);


  const [timeId, setTimeId] = useState<number | null>(null);

  useEffect(() => {
    getAllOrderCartItems(basketId);
  }, []);


  const handleCreateOrder =  (
    userId: number, 
    basketId: number, 
    cartQuantity: number, 
    address: string | null) => async () => {
      try {
        toast.promise(
          creteOrder(userId, basketId, cartQuantity, address),
          {
            pending: 'Создание продукта в процессе...',
            success: 'Заказ успешно создан!',
            error: error
          },
        )
        const timeId = setTimeout(() => {
          clearBasket(basketId)
          navigate('/my/orderlist')
          clearTimeout(timeId)
        }, 2000);
      } catch (e) {
        toast.error(error);
      }

  }




  return (
    <section className='Cart'>
      <div className='Cart__flex'>
        <div className='Cart__icon'>
          <ShoppingBasket />
        </div>
        <div className='Cart__title'>Корзина</div>
      </div>
      {cartItems.length === 0 ? (
        <div className='Cart__empty'>
          <div className='Cart__empty-title'>Ваша корзина пуста</div>
          <div className='Cart__empty-img'>
            <img src={battary} alt='battary' />
          </div>
          <Link to={Paths.Catalog} className='Cart__empty-link'>
            К покупкам
          </Link>
        </div>
      ) : (
        <div className='Cart__main'>
          <div className='Cart__list'>
            {cartItems.map((item) => (
              <CartOrderItem
                key={item.id}
                product={item}
                basketId={basketId}
                asyncDecreaseCartQuantity={asyncDecreaseCartQuantity}
                asyncIncreaseCartQuantity={asyncIncreaseCartQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
          <div className='Cart__widget'>
            <h3 className='Cart__widget-h3'>Адрес получения : </h3>
            <select
              className='Cart__widget-select'
              onChange={(e) => setAddress(e.target.value)}
            >
              <option value=''>Выберите Адрес</option>
              {arrAdreses.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <h3 className='Cart__widget-h3'>Итого : </h3>
            <div className='Cart__widget-flex'>
              <div className='Cart__widget-title'>
                Товары ({cartItems.length})
              </div>
              <div className='Cart__widget-price'>{cartQuantity}₽</div>
            </div>
            <button
              disabled={address === null || address === ''}
              type='button'
              className='Cart__widget-btn'
              onClick={handleCreateOrder(userId, basketId, cartQuantity, address)}
            >
               Перейти к оформлению
            </button>
            {/* <button onClick={() => getAllOrdersById(userId)}>fetch</button> */}
            {/* <Link to={Paths.Payment} className="Cart__widget-btn">Перейти к оформлению</Link> */}
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </section>
  );
};

export default Cart;
