import { Loading, ProductSlider } from '@/components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {ProductWithInfo,useProductStore,} from '@/stores/productStore';
import { BaggageClaim, Heart, HeartOff } from 'lucide-react';
import { useCartOrderStore } from '@/stores/cartOrderStore';
import './ProdactPage.scss';



const ProdactPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductWithInfo | undefined>(
    {} as ProductWithInfo
  );
  const getOneProduct = useProductStore((state) => state.getOneProduct);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  
  const itemQuantity = useCartOrderStore(state => state.getItemQuantity(product?.id))
  const decreaseCartQuantity = useCartOrderStore(state => state.decreaseCartQuantity)
  const increaseCartQuantity = useCartOrderStore(state => state.increaseCartQuantity)
  const removeFromCart = useCartOrderStore(state => state.removeFromCart)
  

  console.log(itemQuantity);

  useEffect(() => {
    getOneProduct(id).then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <div className='ProdactPage'>
      <div className='container'>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className='ProdactPage__error'>{error}</div>
        ) : (
          <div className='ProdactPage__wrapper'>
            <div className='ProdactPage__wrapper-name'>{product?.name}</div>
            <hr />
            <div className='ProdactPage__wrapper-flex'>
              <div className='ProdactPage__wrapper-img'>
                <img
                  src={import.meta.env.VITE_APP_API_URL + product?.img}
                  alt='img'
                />
              </div>
              <div className='ProdactPage__wrapper-specifications'>
                {product?.info?.map((item) => (
                  <div className='dff'>
                    <div className=''>{item.title}</div>
                    <div className=''>{item.description}</div>
                  </div>
                ))}
              </div>
              <div className='ProdactPage__wrapper-price'>
                <span className='span-price'>{product?.price} ₽</span> за шт.
                <div className='bns-widget'>
                  <button className='ProdactPage__wrapper-likedbtn'>
                    <Heart color='red' /> {' '}
                  </button>
                  
                  {itemQuantity === 0 ? (
                    <button className='ProdactPage__wrapper-orderbtn' onClick={() => increaseCartQuantity(product?.id)}>
                      <span className='s' >Добавить в корзину</span>{' '}
                      <BaggageClaim color='white' />
                    </button>
                  )
                  : (
                    <div className="ProdactPage__orderSetting">
                      <div className="ProdactPage__orderSetting-flex">
                        <button className="ProdactPage__orderSetting-btn" onClick={() => increaseCartQuantity(product?.id)}>+</button>
                        <div className="ProdactPage__orderSetting-title">{itemQuantity} в корзине</div>
                        <button className="ProdactPage__orderSetting-btn" onClick={() => decreaseCartQuantity(product?.id)}>-</button>
                      </div>
                      <button className="ProdactPage__orderSetting-btnremove" onClick={() => removeFromCart(product?.id)}>Удалить</button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdactPage;
{/* <HeartOff color='red' /> */}