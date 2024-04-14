import React, { ReactNode } from 'react'

import './Modal.scss'
import { Forms } from '@/components/Forms/types.interface'


  
  
//   export type PasswordState = {
//     first: boolean;
//     second: boolean;
//   };

interface IModalProps {
    id?: string
    activeAuthForm?: Forms | null
    handleAuthForm?: (value: Forms | null) => void
    children: ReactNode
}

const Modal = ({id, activeAuthForm, handleAuthForm, children}: IModalProps) => {
  return (
    <div id={id} onClick={() => handleAuthForm?.(null)} className={activeAuthForm === id ? 'Modal Modal-active' : 'Modal'}>
        <div onClick={e => e.stopPropagation()} className="Modal__content">
            {children}
        </div>
    </div>
  )
}

export {Modal}