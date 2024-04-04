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

  const [visionPasswordFirst, setVisionPasswordFirst] = useState<PasswordState>(
    {
      first: false,
      second: false,
    }
  );
  const navigate = useNavigate();

  const onSubmit = async ({ firstName,  secondName, email, firstPassword}: RegestrationFormValues) => {
    
    if (activeTab === 'signup') {
      const user = await setRegister({ firstName,secondName, email, firstPassword });
      if (user && !error) {
        setActiveTab('signin')
      }
    } else {
      const user = await setLogin({ email, firstPassword });
      if (user && !error) {
        handleAuthForm(null)
        navigate(Paths.Account)
      } else {
        console.log(user);
        console.log(error);
      }
    }
  }
  
  const handleChangePasswordFirst = (value: keyof PasswordState) => {
    setVisionPasswordFirst((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
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
                  <div className='AuthForm__input-title'>Имя</div>
                  <input
                    {...register('firstName', {
                        required: true,
                        minLength: 3,
                    })}
                    type='text'
                    className='AuthForm__input'
                  />
                    <div className='Form-error'>
                        {errors.firstName && <p>{errors?.firstName?.message || 'Ошибка!'}</p>}
                    </div>
                </div>
                <div className='AuthForm__email'>
                  <div className='AuthForm__input-title'>Фамилия</div>
                  <input
                    {...register('secondName', {
                        required: true,
                        minLength: 3,
                    })}
                    type='text'
                    className='AuthForm__input'
                  />
                  <div className='Form-error'>
                        {errors.secondName && <p>{errors?.secondName?.message || 'Ошибка!'}</p>}
                    </div>
                </div>
              </>
            ) : null}
            <div className='AuthForm__email'>
              <div className='AuthForm__input-title'>Электронная почта</div>
              <input
                {...register('email', {
                    required: true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                })}
                type='text'
                className='AuthForm__input'
              />
              <div className='Form-error'>
                    {errors.email && <p>{errors?.email?.message || 'Ошибка!'}</p>}
                </div>
            </div>

            <div className='AuthForm__password'>
              <div className='AuthForm__input-title'>Пароль</div>
              <input
                {...register('firstPassword', {
                    required: true,
                    minLength: 3
                })}
                type={visionPasswordFirst.first ? 'text' : 'password'}
                className='AuthForm__input'
              />

              <div
                className='AuthForm__vision'
                onClick={() => handleChangePasswordFirst('first')}
              >
                {visionPasswordFirst.first ? (
                  <EyeOff size={30} color='#466283' />
                ) : (
                  <Eye size={30} color='#466283' />
                )}
              </div>
              <div className='Form-error'>
                    {errors.firstPassword && <p>{errors?.firstPassword?.message || 'Ошибка!'}</p>}
                </div>
            </div>

            {activeTab === 'signup' ? (
              <div className='AuthForm__repeatPassword'>
                <div className='AuthForm__input-title'>Повторить пароль</div>
                <input
                  required
                  type={visionPasswordFirst.second ? 'text' : 'password'}
                  className='AuthForm__input'
                />

                <div
                  className='AuthForm__vision'
                  onClick={() => handleChangePasswordFirst('second')}
                >
                  {visionPasswordFirst.second ? (
                    <EyeOff size={30} color='#466283' />
                  ) : (
                    <Eye size={30} color='#466283' />
                  )}
                </div>
              </div>
            ) : null}

            {activeTab === 'signup' ? (
              <div className='AuthForm__copyrate'>
                Нажимая «Зарегистрироваться», вы соглашаетесь с политикой
                конфиденциальности
              </div>
            ) : null}

            <button type='submit' className='AuthForm__submitbtn' disabled={error ? true : false}>
              {loading ? <Loading/> : activeTab === 'signup' ? 'Зарегестрироваться' :  'Войти'}
              
            </button>
            {activeTab === 'signin' ? (
              <div
                onClick={() => handleAuthForm(Forms.ChangePassword)}
                className='AuthForm__forgot'
              >
                Забыли пароль?
              </div>
            ) : null}

            <button
              type='button'
              onClick={() => handleAuthForm(Forms.ForgotPassword)}
            >
              change
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
});

export { AuthForm };
