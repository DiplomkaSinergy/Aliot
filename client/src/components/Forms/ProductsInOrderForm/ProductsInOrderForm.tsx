  import React, { useEffect, useState } from 'react';

  import './ProductsInOrderForm.scss';
  import { useAdminStore } from '@/stores/adminStore';
  import { X } from 'lucide-react';
  import { ToastContainer, toast } from 'react-toastify';
import { IOrderProduct } from '@/stores/orderStore';

  interface ProductsInOrderFormProps {
    handleModal: (orderId: number | null) => () => void;
    activeWindow: boolean;
    orderId: number | null;
  }


  const ProductsInOrderForm = ({
    handleModal,
    activeWindow,
    orderId
  }: ProductsInOrderFormProps) => {
    const getProductsInOrder = useAdminStore(state => state.getProductsInOrder)
  const [productsInOrder, setProductsInOrder] = useState<IOrderProduct[] | undefined>();


  const fetchProducts = async () => {
    const products = await getProductsInOrder(orderId)
    setProductsInOrder(products)
  }

  useEffect(() => {
    toast.promise(
      fetchProducts(),
      {

      }
    )
  }, []);

  

    return (
      <div className={activeWindow ? 'overlay' : 'overlay__end'}>
        <div className='ProductsInOrderForm'>
          <form className='ProductsInOrderForm__form'>
            <div className='ProductsInOrderForm__wrapper'>
              <div className='ProductsInOrderForm__closed' onClick={handleModal(null)}>
                <X color='black' />
              </div>
                <div className="ProductsInOrderForm__list">

                {productsInOrder?.map(item => (
                <div className="ProductsInOrderForm_item">
                  <div className=""><img src={import.meta.env.VITE_APP_API_URL +  item.product.img} alt="img" /></div>
                  <div className="">{item.product.name}</div>
                  <div className="">{item.product.price} x {item.quantity}</div>
                </div>      

                ))}
                </div>


              <ToastContainer/>            
            </div>
          </form>
        </div>
      </div>
      
    );
  };



  export { ProductsInOrderForm };
