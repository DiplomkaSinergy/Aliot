import React, { MouseEvent, useEffect, useState } from 'react';

import { ShoppingBasket } from 'lucide-react';
import { ICartItem, useCartOrderStore } from '@/stores/cartOrderStore';
import { CartOrderItem, List } from '@/components';
import { useAuth } from '@/stores/authStore';

import battary from '../../../../assets/img/battartyZag.jpg';
import { Link } from 'react-router-dom';
import { Paths } from '@/app/Routes/Types/paths';
import axios, { AxiosError, isAxiosError } from 'axios';
import { $host } from '@/services/instance';
import { AuthErrorType } from '@/utils/Types/Errors';
import { useOrderStore } from '@/stores/orderStore';
import './Cart.scss';

const arrAdreses = [
  'Мск. ул.Владыкино, д11, к2',
  'Мск. ул.Бочково, д5',
  'Мск. ул.Угрешская, д1, к1',
  'Мск. ул.Матвеевксая, д38, к2',
  'Мск. Ленинский проспект, 4',
];
const Cart = () => {
  const basketId = useAuth((state) => state.basket.id);
  const userId = useAuth((state) => state.user.id);
  const cartItems = useCartOrderStore((state) => state.cartItems);
  const cartQuantity = useCartOrderStore((state) => state.cartQuantity);
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
  const cretePayment = useCartOrderStore((state) => state.cretePayment);

  const creteOrder = useOrderStore((state) => state.creteOrder);
  const getAllOrders = useOrderStore((state) => state.getAllOrders);

  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    getAllOrderCartItems(basketId);
  }, []);

  // const fetcYouCassa = async (e: MouseEvent) => {
  //   e.preventDefault()

  //   try {
  //     const {data} = await axios.post(`
  //     ${import.meta.env.VITE_APP_API_YOOKASSA}`,
  //     {
  //       "amount": {
  //         "value": `${cartQuantity}`,
  //         "currency": "RUB"
  //       },
  //       "capture": true,
  //       "confirmation": {
  //         "type": "redirect",
  //         "return_url": "https://www.mvideo.ru"
  //       },
  //       "description": "Заказ №1"
  //     },
  //     {
  //       auth: {
  //         username: `${import.meta.env.VITE_APP_API_SHOP_ID}`,
  //         password: `${import.meta.env.VITE_APP_API_SECRETE_KEY_UMONEY}`
  //       },
  //       headers: {
  //         'Idempotence-Key': '123',
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': true,
  //       }
  //     })
  //     console.log(data);
  //   } catch (error) {
  //       if (isAxiosError(error)) {
  //         console.log(error);
  //       }
  //   } finally {
  //     console.log('final');

  //   }
  // }

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: cartQuantity }), // Сумма к оплате и валюта
      });

      if (response.ok) {
        console.log(response);
        const paymentData = await response.json();
        window.location.href = paymentData.confirmationUrl;
      } else {
        console.error('Failed to create payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

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
              onClick={() =>
                creteOrder(userId, basketId, cartQuantity, address)
              }
            >
              Перейти к оформлению
            </button>
            <button onClick={() => getAllOrders(userId)}>fetch</button>
            {/* <Link to={Paths.Payment} className="Cart__widget-btn">Перейти к оформлению</Link> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
