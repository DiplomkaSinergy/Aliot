//@ts-nocheck


import { Modal } from '@/components'
import React, { memo, useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { useForm, SubmitHandler } from "react-hook-form"
import { PasswordState } from '../forms'
import './ForgotPasswordForm.scss'
import { Forms } from '../types.interface'

interface IChangePasswordFromProps {
    activeAuthForm: Forms | null
    handleAuthForm: (value: Forms | null) => void
}

interface IForgotPasswordForm {
    firstPassword: string
    secondPassword: string
  }

const ForgotPasswordForm = memo(({activeAuthForm, handleAuthForm}: IChangePasswordFromProps) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<IForgotPasswordForm>({ mode: 'onSubmit' })

    // const [error, setError] = useState<string | null>('');
    const [visionPasswordFirst, setVisionPasswordFirst] = useState<PasswordState>({
        first: false,
        second: false
    });

    const password = watch('firstPassword', '');

    const handleChangePasswordFirst = (value: keyof PasswordState) => {
        setVisionPasswordFirst(prevState => ({
            ...prevState,
            [value]: !prevState[value]
        }))
    } 

    const onSubmit: SubmitHandler<IForgotPasswordForm> = ({firstPassword, secondPassword}) => {
        // if (firstPassword !== secondPassword) {
        //     setError('Пороли не совподают')
        //     return
        // }
        // setError(null)
        console.log(firstPassword, secondPassword);
    }

  return (
    <Modal id={Forms.ForgotPassword} activeAuthForm={activeAuthForm} handleAuthForm={handleAuthForm}>
        <form className='ForgotPasswordForm' onSubmit={handleSubmit(onSubmit)}>
            <div className="ForgotPasswordForm__wrapper">
                <button type='button' onClick={() => handleAuthForm(null)} className="ForgotPasswordForm__closed"><X color='#466283'/></button>
                <div className="ForgotPasswordForm__title">Смена пароля</div>
                <div className="ForgotPasswordForm__subtitle">Введите новый пароль от аккаунта.</div>
                

                <div className="ForgotPasswordForm__password">
                    <div className="ForgotPasswordForm__input-title">Пароль</div>
                    <input 
                    type={visionPasswordFirst.first ? 'text' : 'password'} 
                    className={errors.firstPassword ? 'ForgotPasswordForm__input ForgotPasswordForm__input-error' : 'ForgotPasswordForm__input'} placeholder='Ваш пароль'
                    {...register('firstPassword', {
                        minLength: 3,
                        required: 'Пароль обезателен'
                      })}
                    />
                    {errors.firstPassword && <div className="form-error-title">{errors.firstPassword.message}</div>}

                    <div className='ForgotPasswordForm__vision' onClick={() => handleChangePasswordFirst('first')}>
                        {visionPasswordFirst.first ? (
                            <EyeOff size={30} color='#466283' />
                            ) : (
                            <Eye size={30} color='#466283' />
                        )}
                    </div>
                </div>

                <div className="ForgotPasswordForm__repeatPassword">
                    <div className="ForgotPasswordForm__input-title">Повторить пароль</div>
                    <input 
                    type={visionPasswordFirst.second ? 'text' : 'password'} 
                    className={errors.secondPassword ? 'ForgotPasswordForm__input ForgotPasswordForm__input-error' : 'ForgotPasswordForm__input'} placeholder='Ваш пароль'
                    {...register('secondPassword', {
                        minLength: 3,
                        required: 'Пароль обезателен',
                        validate: (value) => value === password || 'Пароль не совподает',
                      })}
                    />

                    <div className='ForgotPasswordForm__vision' onClick={() => handleChangePasswordFirst('second')}>
                        {visionPasswordFirst.second ? (
                            <EyeOff size={30} color='#466283' />
                            ) : (
                            <Eye size={30} color='#466283' />
                        )}
                    </div>
                </div> 
                {errors.secondPassword && <div className="form-error-title">{errors.secondPassword.message}</div>}
                <button className='ForgotPasswordForm__submitbtn' type='submit'>Отправить</button>
            </div>
        </form>
    </Modal>
  )
})

export {ForgotPasswordForm}