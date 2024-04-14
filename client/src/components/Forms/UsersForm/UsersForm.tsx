import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './UsersForm.scss';

interface UsersFormProps {
  handleModal: () => void
  activeModal: boolean
  isCreating: boolean
  currentItem: null
}


const UsersForm = ({ handleModal, activeModal, isCreating, currentItem }: UsersFormProps) => {
  const createProduct = useProducts((state) => state.createProduct);
  const updateProduct = useProducts((state) => state.updateProduct);
  const getProducts = useProducts((state) => state.getProducts);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      handleModal();
      getProducts()
    }
  }, [isSubmitSuccessful]);

  const onSubmit = async ({ name, price, description, type }) => {
    if (isCreating) {
      const product = await createProduct({ name, price, description, type });
    } else {
      const product = await updateProduct({id: currentItem.id ,name, price, description, type });
    }
    // console.log({ name, price, description, type });
  };

  return (
    <div className={activeModal ? 'overlay' : 'overlay__end'}>
      <div className='ProductForm'>
        <form className='ProductForm__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='ProductForm__wrapper'>
            <div className='ProductForm__title'>{isCreating ? 'Создание продукта' : `Обновление продукта`}</div>
            <div className='ProductForm__closed' onClick={handleModal}>
              X
            </div>
            <div className='ProductForm__wrapper'>
              <label className='ProductForm__label'>Название:</label>
              <input
                type='text'
                className='ProductForm__input'
                // value={isCreating ? ' ' : upItem.title}
                {...register('name', {
                  minLength: 3,
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
                {...register('price', {value: isCreating ? '' : currentItem.price})}
              />
              <div className='Form-error'>
                {errors?.price && <p>{errors?.price?.message || 'Ошибка!'}</p>}
              </div>
            </div>
            <div className='ProductForm__wrapper'>
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
            </div>

            <div className='ProductForm__selectedType'>
              <select name='types' {...register('type', {value: isCreating ? '' : currentItem.type})}>
                <option value=''>--Пожалуйста выбирите тип--</option>
                <option value='Обычное'>Обычное</option>
                <option value='Сладкое'>Сладкое</option>
                <option value='Солёное'>Солёное</option>
              </select>
            </div>
            <button className='AuthForm__submitbtn' type='submit'>
              {isCreating ? 'Создать' : 'Обновить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export {UsersForm};
