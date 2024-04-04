import React, { FC } from 'react'
import { FieldError, FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { RegistrationFormFields } from '../FeedbackForm';
import { IData } from '../data';

export interface ILabelProps {
    name: Path<RegistrationFormFields>
    register: UseFormRegister<RegistrationFormFields>
    errors?: FieldError | undefined
    placeholder: string;
    type?: 'text' | 'email';
    rules?: Record<string, string | number>
}

const Label: FC<ILabelProps> = ({name, register, errors,placeholder,rules,type }) => {

  return (
    <label>
        <input 
            type={type}
            className='FeedbackForm__input' 
            placeholder={placeholder}
            {...register(name, {
                ...rules
            })} 
        />
        <div className="Form-error">
            {errors && (
                <p>{errors?.message || 'Ошибка!'}</p>
            )}
        </div>
    </label>
  )
}

export default Label