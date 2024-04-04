import { Modal } from '@/components'
import React, { memo } from 'react'

import './ChangePasswordFrom.scss'
import { X } from 'lucide-react'
import { Forms } from '../types.interface'

interface IChangePasswordFromProps {
    activeAuthForm: Forms | null
    handleAuthForm: (value: Forms | null) => void
}

const ChangePasswordFrom = memo(({activeAuthForm, handleAuthForm}: IChangePasswordFromProps) => {
  return (
    <Modal id={Forms.ChangePassword} activeAuthForm={activeAuthForm} handleAuthForm={handleAuthForm}>
        <form className='ForgotPasswordForm'>
            <div className="ForgotPasswordForm__wrapper">
                <button type='button' onClick={() => handleAuthForm(null)} className="ForgotPasswordForm__closed"><X color='#466283'/></button>
                <div className="ForgotPasswordForm__title">Забыли пароль</div>
                <div className="ForgotPasswordForm__subtitle">Введите вашу почту и мы пришлём вам инструкцию с дальнейшими шагами.</div>
                
                <div className="ForgotPasswordForm__email">
                    <div className="ForgotPasswordForm__email-title">Электронная почта</div>
                    <input className="ForgotPasswordForm__email-input" type="text" placeholder='Ваш email' />
                </div>

                <button className='ForgotPasswordForm__submitbtn' type='submit'>Отправить</button>
            </div>
        </form>
    </Modal>
  )
})

export {ChangePasswordFrom}