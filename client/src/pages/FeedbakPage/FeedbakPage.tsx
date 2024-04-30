import { FeedbackForm, List } from '@/components';
import React, { useState } from 'react';

import './FeedbakPage.scss';
import Label from '@/components/FeedbackForm/Label/Label';
import { FormProvider, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { data } from './data';
import { toast } from 'react-toastify';
import { $authHost } from '@/services/instance';


interface IFeedbakFormValues {
  name: string
  phone: string,
  product: string,

}

const options: string[] = [
  'Автоматические резервные вводы', 
  'Главные распределительные щиты',
  'Автоматизированные щиты',
  'Силовые щиты',
  'Осветительные щиты',
  'Вводно-распределительные устройства',
]

const FeedbakPage = () => {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
} = useForm<IFeedbakFormValues>({ mode: "onBlur" });


  const onSubmit = async ({ name, phone,  product}: IFeedbakFormValues) => {
    console.log(name, phone, product);
    
    try {
      toast.promise(
        $authHost.post('api/tgReq/custom-products', {name, phone, product}),
        {
          pending: 'Заявка в процессе...',
          success: 'Успешная отправка! C вами скоро свяжутся.',
          error: 'Ошибка запроса !'
        },
      )
      reset()
    } catch (error) {
      console.log(error);
    } 
  }


  return (
    <div className='FeedbakPage'>
      <div className='container'>
        <div className='FeedbakPage__wrapper'>
          <form className='FeedbakPage__form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='FeedbakPage__form-title'>Оставьте заявку</h2>
              
              <Label
                control={control}
                className='FeedbakPage__form-label'
                defaultValue=''
                name='name' 
                type='text'
                label='Имя'
                rules={{
                  required: 'Обязательное поле'
                }}
              />
              
              <Label
                control={control}
                className='FeedbakPage__form-label'
                defaultValue=''
                name='phone' 
                type='text'
                label='Телефон'
                rules={{
                  required: 'Обязательное поле'
                }}
              />
              
        
              <div className="FeedbakPage__choise-title">Выбранный товар</div>
              <select 
              {...register('product', {
                required: 'Выберите товар!'
              })} 
              className='FeedbakPage__select'>
                <option value="">--Выберите товар--</option>
                <List
                  items={options}
                  renderItems={(item) => (
                    <option value={item}>{item}</option>
                  )}
                />
              </select>
              <div>
              {errors.product && <span className='label-error'>{errors.product.message}</span>}
              </div>
              <button className='FeedbakPage__submitbtn'>Отправить</button>
          </form>


          {/* <div className="FeedbakPage__list">
            {data.map((item, i) => (
              <div
              onClick={() => setCurrentProduct(item.title)}
               className={currentProduct === item.title ? "FeedbakPage__list-item active-product " : "FeedbakPage__list-item"}>
                <div className="FeedbakPage__list-img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="FeedbakPage__list-title">{item.title}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeedbakPage;
