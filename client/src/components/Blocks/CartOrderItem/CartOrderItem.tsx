import { IProduct } from '@/stores/productStore';
import './CartOrderItem.scss';
import { ICartItem, useCartOrderStore } from '@/stores/cartOrderStore';
import { useEffect, useState } from 'react';

interface CartOrderItemProps {
  product: ICartItem;
  asyncDecreaseCartQuantity: (
    productId: number | undefined,
    basketId: number
  ) => Promise<void>;
  asyncIncreaseCartQuantity: (
    productId: number | undefined,
    basketId: number
  ) => Promise<void>;
  removeFromCart: (
    productId: number | undefined,
    basketId: number
  ) => Promise<ICartItem | undefined>;
  basketId: number;
}

export const CartOrderItem = ({
  product,
  basketId,
  asyncDecreaseCartQuantity,
  asyncIncreaseCartQuantity,
  removeFromCart,
}: CartOrderItemProps) => {
  return (
    <div className='CartOrderItem'>
      <div className='CartOrderItem__wrapper'>
        <div className='CartOrderItem__left'>
          <div className='CartOrderItem__img'>
            <img
              src={import.meta.env.VITE_APP_API_URL + product.product?.img}
              alt='asdas'
            />
          </div>
        </div>
        <div className="CartOrderItem__middle">
          <div className='CartOrderItem__title'>{product.product?.name}</div>
          <div className='CartOrderItem__price'>
            <div className='CartOrderItem__price-total'>
              {product.product?.price * product.quantity} ₽
            </div>
            <div className='CartOrderItem__price-oneItem'>
              {product.product?.price} ₽ за Шт.
            </div>
          </div>
        </div>
        <div className='CartOrderItem__right'>
          <div className='CartOrderItem__counter'>
            <div className='CartOrderItem__orderSetting-flex'>
              <button
                className='CartOrderItem__orderSetting-btn'
                onClick={() =>
                  asyncIncreaseCartQuantity(product.productId, basketId)
                }
              >
                +
              </button>
              <div className='CartOrderItem__orderSetting-title'>
                {product?.quantity}
              </div>
              <button
                className='CartOrderItem__orderSetting-btn'
                disabled={product?.quantity === 1}
                onClick={() => asyncDecreaseCartQuantity(product.productId, basketId)}
              >
                -
              </button>
            </div>
            <button className='CartOrderItem__orderSetting-btnremove' onClick={() => removeFromCart(product.productId, basketId)}>
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
