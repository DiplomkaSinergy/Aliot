import React, { ChangeEvent, memo, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './AuthForm.scss';
import { Loading, Modal } from '@/components';
import {
  Forms,
  PasswordState,
  RegestrationFormValues,
} from '../types.interface';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/app/Routes/Types/paths';
import { useAuth } from '@/stores/authStore';
import InputMask from 'react-input-mask';

interface IAuthFormProps {
  activeAuthForm: Forms | null;
  handleAuthForm: (value: Forms | null) => void;
}

export type TabType = 'signin' | 'signup';

const AuthForm = memo(({ activeAuthForm, handleAuthForm }: IAuthFormProps) => {

  const {register, handleSubmit, formState: { errors }} = useForm<RegestrationFormValues>({ mode: 'onSubmit' });

  const [activeTab, setActiveTab] = useState<TabType>('signin');

  const setRegister = useAuth((state) => state.register)
  const setLogin = useAuth((state) => state.login)
  const error = useAuth((state) => state.error)
  const loading = useAuth((state) => state.loading)

  const [visionPasswordFirst, setVisionPasswordFirst] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async ({ firstName,  lastName, email, phone, password}: RegestrationFormValues) => {
    
    if (activeTab === 'signup') {
      
      const user = await setRegister({ firstName,lastName, email, password, phone });
      if (user && !error) {
        setActiveTab('signin')
      }
    } else {
      const user = await setLogin({ email, password });
      if (user && !error) {
        handleAuthForm(null)
        navigate(Paths.Home)
      } else {
        console.log(user);
        console.log(error);
      }
    }
  }
  
  const handleChangePasswordFirst = () => {
    setVisionPasswordFirst(!visionPasswordFirst);
  };

  const handleChangeTab = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveTab(e.target.id as TabType);
  };

  return (
    <>
      <Modal
        id={Forms.Auth}
        activeAuthForm={activeAuthForm}
        handleAuthForm={handleAuthForm}
      >
        <form className='AuthForm__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='AuthForm__wrapper'>
            <button
              type='button'
              onClick={() => handleAuthForm(null)}
              className='AuthForm__closed'
            >
              <X color='#466283' />
            </button>

            <div className='AuthForm__tabs'>
              <label htmlFor='signin' className='AuthForm__label'>
                <input
                  id='signin'
                  onChange={handleChangeTab}
                  name='tab'
                  type='radio'
                  className='AuthForm__tab'
                />
                <div
                  id='signin'
                  className={
                    activeTab == 'signin'
                      ? 'AuthForm__title active-tab'
                      : 'AuthForm__title'
                  }
                >
                  Вход
                </div>
              </label>
              <label htmlFor='signup' className='AuthForm__label'>
                <input
                  id='signup'
                  onChange={handleChangeTab}
                  name='tab'
                  type='radio'
                  className='AuthForm__tab'
                />
                <div
                  id='signup'
                  className={
                    activeTab == 'signup'
                      ? 'AuthForm__title active-tab'
                      : 'AuthForm__title'
                  }
                >
                  Регистрация
                </div>
              </label>
            </div>

 

            {activeTab === 'signup' ? (
              <>
                <div className='AuthForm__email'>
                  <div className='AuthForm__input-title'>Имя*</div>

                  <input
                    type='text'
                    className='AuthForm__input'
                    {...register('firstName', {
                        required: 'Обязательно к заполнению',
                        minLength: {
                          value: 3,
                          message: 'Минимум 3 символа.'
                        },
                    })}
                  />
                    <div className='Form-error'>
                        {errors.firstName && <small>{errors?.firstName?.message || 'Ошибка!'}</small>}
                    </div>
                </div>
                <div className='AuthForm__email'> 
                  <div className='AuthForm__input-title'>Фамилия</div>
                  <input
                    type='text'
                    className='AuthForm__input'
                    {...register('lastName', {
                        required: 'Обязательно к заполнению',
                        minLength: {
                          value: 3,
                          message: 'Минимум 3 символа.'
                        },
                    })}
                  />
                  <div className='Form-error'>
                        {errors.lastName && <small>{errors?.lastName?.message || 'Ошибка!'}</small>}
                    </div>
                </div>
              </>
            ) : null}
            <div className='AuthForm__email'>
              <div className='AuthForm__input-title'>Электронная почта*</div>
              <input
                type='text'
                className='AuthForm__input'
                {...register('email', {
                    required: 'Обязательно к заполнению',
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
              />
              <div className='Form-error'>
                    {errors.email && <small>{errors?.email?.message || 'Ошибка!'}</small>}
                </div>
            </div>


            {activeTab === 'signup' ? (
              <div className='AuthForm__repeatPassword'>
                <div className='AuthForm__input-title'>Телефон*</div>
                <InputMask
                  type='text'
                  className='AuthForm__input'
                  mask='8 (999) 999 99-99' 
                  {...register('phone', {
                    required: 'Обязательно к заполнению',
                })}
                  >
                </InputMask>
                <div className='Form-error'>
                    {errors.password && <small>{errors?.password?.message || 'Ошибка!'}</small>}
                </div>
              </div>
              
            ) : null}


            <div className='AuthForm__password'>
              <div className='AuthForm__input-title'>Пароль*</div>
              <input
                {...register('password', {
                    required: 'Обязательно к заполнению',
                    minLength: {
                      value: 3,
                      message: 'Минимум 3 символа.'
                    },

                })}
                type={visionPasswordFirst ? 'text' : 'password'}
                className='AuthForm__input'
              />

              <div
                className='AuthForm__vision'
                onClick={handleChangePasswordFirst}
              >
                {visionPasswordFirst ? (
                  <EyeOff size={30} color='#466283' />
                ) : (
                  <Eye size={30} color='#466283' />
                )}
              </div>
              <div className='Form-error'>
                    {errors.password && <small>{errors?.password?.message || 'Ошибка!'}</small>}
                </div>
            </div>


            <button type='submit' className='AuthForm__submitbtn' disabled={error ? true : false}>
              {loading ? <Loading/> : activeTab === 'signup' ? 'Зарегестрироваться' :  'Войти'}
              
            </button>

          </div>
        </form>
      </Modal>
    </>
  );
});

export { AuthForm };
