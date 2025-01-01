import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import style from './Input.module.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>; // Типизируем register для любых форм
  rules?: Record<string, any>; // Валидационные правила
  error?: FieldError | undefined; // Ошибка валидации
  type?: string;
}

export default function Input ({ name, placeholder, register, rules, error, ...props }: IProps) {
  return (
    <div className={style['input-wrapper']}>
      <input
        className={`${style['input']} ${error ? style['input--error'] : ''}`}
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
      />
      {error && <div className={style['error']}>{error.message}</div>}
    </div>
  );
};
