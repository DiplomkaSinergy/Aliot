//@ts-nocheck

import React from 'react'

import './Contact.scss'
import { useForm, SubmitHandler } from 'react-hook-form';

export type IInputs = {
    firstName: string;
    phone: string; 
};

const Contact = () => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IInputs>({ mode: "onBlur" });

    const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data)

  return (
    <section className='Contact'>
        <div className='container'>
            <div className='Contact__wrapper'>
                <form className='Contact__form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="Contact__title">Необходимо что-то уточнить?</div>
                    <div className="Contact__description">Оставьте свои контактные данные, и мы свяжемся с вами в течении 10 минут</div>
                    <div className="Contact__inputs">
                        <div>
                            <input 
                                type="text" 
                                className='Contact__input' 
                                placeholder='Имя'
                                {...register('firstName', {
                                    min: 3, 
                                })}
                            />
                            <div className="Form-error">
                                {errors?.firstName && (
                                    <p>{errors?.firstName?.message || 'Ошибка!'}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <input 
                                type="tel" 
                                className='Contact__input'
                                placeholder='Номер телефона'
                                {...register('phone', {
                                    
                                })}
                            />
                            <div className="Form-error">
                                {errors?.phone && (
                                    <p>{errors?.phone?.message || 'Ошибка!'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="continue-application">
                        <div>
                            <div className="pencil"></div>
                            <div className="folder">
                                <div className="top">
                                    <svg viewBox="0 0 24 27">
                                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                                    </svg>
                                </div>
                                <div className="paper"></div>
                            </div>
                        </div>
                        ОСТАВИТЬ ЗАЯВКУ
                    </button>
                </form>
            </div>
        </div>
    </section>
  )
}

export {Contact}