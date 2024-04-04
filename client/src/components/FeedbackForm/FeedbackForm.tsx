import React from 'react'
import { useForm } from 'react-hook-form';

import Label from './Label/Label';
import './FeedbackForm.scss'

export type RegistrationFormFields = {
    'firstName': string;    
    'email': string; 
    'numberPhone': string;
    'companyName': string;
    'websiteAddress': string;
    'message': string;
};


const FeedbackForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors,isLoading },
    } = useForm<RegistrationFormFields>({ mode: "onBlur" });

    const onSubmit = handleSubmit((data) => {
        setTimeout(() => {
            console.log('submitting...', data);
        }, 2000)
      });


  return (
    <div className='FeedbackForm'>
        <form className='FeedbackForm__form' onSubmit={onSubmit}>
            <div className="FeedbackForm__title">ОТПРАВЬТЕ ВАШ ЗАПРОС</div>
            <div className="FeedbackForm__inputs">
                <Label name='firstName' placeholder='Полное имя' errors={errors.firstName} register={register} rules={{minLength: 3}}/>
                <Label name='email' placeholder='Адрес электронной почты' errors={errors.email} register={register} type='email' />
                <Label name='companyName' placeholder='Номер телефона' errors={errors.numberPhone} register={register} />
                <Label name='websiteAddress' placeholder='Название компании' register={register} />
                <Label name='numberPhone' placeholder='Адрес веб-сайта' register={register} />
                <textarea
                placeholder='Введите ваше сообщение'
                {...register('message')}
                ></textarea>
            </div>
            <button className='FeedbackForm__submitbtn'>
                ОТПРАВИТЬ ЗАПРОС
                <span></span>
            </button>

            {isLoading && <div>Loading</div>}
        </form>
    </div>
  )
}

export {FeedbackForm}