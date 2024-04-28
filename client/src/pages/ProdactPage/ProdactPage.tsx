import { Loading } from '@/components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductWithInfo, useProductStore } from '@/stores/productStore';
import { BaggageClaim, Heart, HeartOff } from 'lucide-react';
import { ICartItem, useCartOrderStore } from '@/stores/cartOrderStore';
import './ProdactPage.scss';
import { useAuth } from '@/stores/authStore';
import { useCartLikedStore } from '@/stores/cartLikedStore';

const ProdactPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductWithInfo | undefined>(
    {} as ProductWithInfo
  );
  const [currentItem, setCurrentItem] = useState<ICartItem | undefined>(
    {} as ICartItem
  );

  const basketId = useAuth((state) => state.basket.id);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const getOneProduct = useProductStore((state) => state.getOneProduct);

  const getOneCartItem = useCartOrderStore((state) => state.getOneCartItem);
  const asyncDecreaseCartQuantity = useCartOrderStore((state) => state.asyncDecreaseCartQuantity);
  const asyncIncreaseCartQuantity = useCartOrderStore((state) => state.asyncIncreaseCartQuantity);
  const removeFromCart = useCartOrderStore((state) => state.removeFromCart);

  const toggleLikedItmes = useCartLikedStore((state) => state.toggleLikedItmes);
  const hasLike = useCartLikedStore((state) => state.getItemQuantity(product?.id));

  const fetchOneCartItem = async () => {
    const data = await getOneCartItem(id, basketId);
    setCurrentItem(data);
  };
  const incresseOneCartItem = async () => {
    await asyncIncreaseCartQuantity(id, basketId);
    fetchOneCartItem();
  };
  const decreaseOneCartItem = async () => {
    await asyncDecreaseCartQuantity(id, basketId);
    fetchOneCartItem();
  };
  const deleteOneCartItem = async () => {
    const data = await removeFromCart(id, basketId);
    setCurrentItem(data);
  };

  useEffect(() => {
    getOneProduct(id).then((data) => {
      setProduct(data);
    });
    fetchOneCartItem();
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
            <div className='ProdactPage__wrapper-flex'>
              <div className='ProdactPage__wrapper-img'>
                <img
                  src={import.meta.env.VITE_APP_API_URL + product?.img}
                  alt='img'
                />
              </div>
              <div className='ProdactPage__wrapper-specifications'>
                {product?.info?.map((item) => (
                  <div className='specifications-wrap'>
                    <div className='specifications-title'>{item.title}: </div>
                    <div className='specifications-subtitle'>{item.description}</div>
                  </div>
                ))}
              </div>
              <div className='ProdactPage__wrapper-price'>
                <span className='span-price'>{product?.price} ₽</span> за шт.
                <div className='bns-widget'>
                  <button
                    className={
                      hasLike
                        ? 'ProdactPage__wrapper-likedbtn-active '
                        : 'ProdactPage__wrapper-likedbtn'
                    }
                    onClick={() => toggleLikedItmes(product)}
                  >
                    {hasLike ? <Heart color='red' /> : <Heart color='black' />}
                  </button>

                  {!currentItem?.quantity ? (
                    <button
                      className='ProdactPage__wrapper-orderbtn'
                      onClick={incresseOneCartItem}
                    >
                      <span className='s'>Добавить в корзину</span>{' '}
                      <BaggageClaim color='white' />
                    </button>
                  ) : (
                    <div className='ProdactPage__orderSetting'>
                      <div className='ProdactPage__orderSetting-flex'>
                        <button
                          className='ProdactPage__orderSetting-btn'
                          onClick={incresseOneCartItem}
                        >
                          +
                        </button>
                        <div className='ProdactPage__orderSetting-title'>
                          {currentItem?.quantity} в корзине
                        </div>
                        <button
                          className='ProdactPage__orderSetting-btn'
                          onClick={decreaseOneCartItem}
                        >
                          -
                        </button>
                      </div>
                      <button
                        className='ProdactPage__orderSetting-btnremove'
                        onClick={deleteOneCartItem}
                      >
                        Удалить
                      </button>
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
