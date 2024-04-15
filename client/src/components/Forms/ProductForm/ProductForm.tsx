import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './ProductForm.scss';
import { useAdminStore } from '@/stores/adminStore';
import { CreateProductFormValues } from '../types.interface';
import { X } from 'lucide-react';

interface UsersFormProps {
  handleModal: () => void
  activeModal: boolean
  isCreating: boolean
  currentItem: null
}


const ProductForm = ({ handleModal, activeModal, isCreating, currentItem }: UsersFormProps) => {
  const createProduct = useAdminStore((state) => state.createProduct);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CreateProductFormValues>({ mode: 'onSubmit' });

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //     handleModal();
  //     getProducts()
  //   }
  // }, [isSubmitSuccessful]);

  const onSubmit = async ({ name, count, img }: {name: string, count: string, img: string}) => {

    const formData = new FormData();
    formData.append('name', name)
    formData.append('count', count)
    formData.append('img', img[0])

    if (isCreating) {
      createProduct(formData);
    } else {
      // const product = await updateProduct({id: currentItem.id ,name, price, description, type });
      return
    }
  };

  return (
    <div className={activeModal ? 'overlay' : 'overlay__end'}>
      <div className='ProductForm'>
        <form className='ProductForm__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='ProductForm__wrapper'>
            <div className='ProductForm__title'>{isCreating ? 'Создание продукта' : `Обновление продукта`}</div>
            <div className='ProductForm__closed' onClick={handleModal}>
              <X color='black'/>
            </div>

            <div className="flex-container">
                
                <div className="flex-right">

                  <div className="flex-title">Основная информация</div>

                  <div className='ProductForm__wrapper'>
                    <label className='ProductForm__label'>Название:</label>
                    <input
                      type='text'
                      className={errors?.name ? 'ProductForm__input input-red' : 'ProductForm__input '}
                      {...register('name', {
                        required: 'Обязательное поле',
                        minLength: {
                          value: 3,
                          message: 'Минимум 3 символа'
                        },
                        value: isCreating ? '' : currentItem.name,
                      })}
                    />
                    <div className='Form-error'>
                      {errors?.name && <p>{errors?.name?.message || 'Ошибка!'}</p>}
                    </div>
                  </div>


                  <div className='ProductForm__wrapper'>
                    <label className='ProductForm__label'>Цена:</label>
                    <input
                      type='number'
                      className='ProductForm__input'
                      {...register('count', {value: isCreating ? '' : currentItem.price})}
                    />
                    <div className='Form-error'>
                      {errors?.count && <p>{errors?.count?.message || 'Ошибка!'}</p>}
                    </div>
                  </div>


                  <div className='ProductForm__wrapper'>
                    <label className='ProductForm__label'>Картинка:</label>
                    <input
                      type="file"
                      id="img"
                      name='img'
                      className='ProductForm__input'
                      {...register("img")}
                    />
                    <div className='Form-error'>
                      {errors?.name && <p>{errors?.name?.message || 'Ошибка!'}</p>}
                    </div>
                  </div>



                </div>

                <div className="barch"></div>
                <div className="flex-left"> 
                  <div className="flex-title">Характеристики</div>

                  <div className="grid-container">
                  
                    <div className="grid-item">
                      <div className="grid-item-title">Fdnjvfns</div>
                      <select className="grid-item-select">
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                      </select>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item-title">Fdnjvfns</div>
                      <select className="grid-item-select">
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                      </select>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item-title">Fdnjvfns</div>
                      <select className="grid-item-select">
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                      </select>
                    </div>
                    <div className="grid-item">
                      <div className="grid-item-title">Fdnjvfns</div>
                      <select className="grid-item-select">
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                        <option value="ффф">ффф</option>
                      </select>
                    </div>



                  
                  </div>
                  

                </div>

            </div>











            {/* <div className='ProductForm__wrapper'>
              <label className='ProductForm__label'>Описание:</label>
              <textarea
                type='text'
                className='ProductForm__input'
                {...register('description', {value: isCreating ? '' : currentItem.description})}
              />
              <div className='Form-error'>
                {errors?.description && (
                  <p>{errors?.description?.message || 'Ошибка!'}</p>
                )}
              </div>
            </div> */}
{/* 
            <div className='ProductForm__selectedType'>
              <select name='types' {...register('type', {value: isCreating ? '' : currentItem.type})}>
                <option value=''>--Пожалуйста выбирите тип--</option>
                <option value='Обычное'>Обычное</option>
                <option value='Сладкое'>Сладкое</option>
                <option value='Солёное'>Солёное</option>
              </select>
            </div> */}
            <button className='AuthForm__submitbtn' type='submit'>
              {isCreating ? 'Создать' : 'Обновить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export {ProductForm};
