import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import style from './Input.module.scss';
import { buildClassName } from '../../utils/styles';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>; // Типизируем register для любых форм
  rules?: Record<string, any>; // Валидационные правила
  error?: FieldError | undefined; // Ошибка валидации
  type?: string;
  className?: string;
}

export default function Input ({ name, placeholder, register, rules, error, className, ...props }: IProps) {

  const inputClassName = buildClassName(
    style['input'],
    error ? style['input--error'] : '',
    className ? className : '',
  );

  return (
    <div className={style['input-wrapper']}>
      <input
        className={inputClassName}
        placeholder={placeholder}
        {...register(name, rules)}
        {...props}
      />
      {error && <div className={style['error']}>{error.message}</div>}
    </div>
  );
};
