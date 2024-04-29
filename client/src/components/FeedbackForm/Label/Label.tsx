import React, { FC } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
  useController,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { RegistrationFormFields } from '../FeedbackForm';
import { IData } from '../data';

import './Label.scss'

interface LabelProps {
  name: string;
  label: string;
  defaultValue?: string;
  className?: string;
  type: string
  control: Control<IFeedbakFormValues, any, IFeedbakFormValues>;
  rules?:
    | Omit<
        RegisterOptions<IFeedbakFormValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
      >
    | undefined;
}

const Label: FC<LabelProps> = ({
  label,
  name,
  control,
  className,
  defaultValue,
  type,
  rules,
}) => {
  return (
    <label className={className}>
      <div>{label}</div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <>
            <input
              name={name}
              type={type}
              value={value}
              onChange={(value) => onChange(value)}
            />
            <div className="">
              {error && <span className='label-error'>{error.message}</span>}
            </div>
          </>
        )}
      />
    </label>
  );
};

export default Label;
