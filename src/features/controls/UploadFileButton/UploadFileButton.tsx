import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form';
import Input from '../Input/Input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
  register: UseFormRegister<any>; // Типизируем register для любых форм
  rules?: Record<string, any>; // Валидационные правила
  error?: FieldError | undefined; // Ошибка валидации
  className?: string;
  children: React.ReactNode;
}

export default function UploadFileButton({
    register,
    handleChange,
    name,
    children
}: IProps) {
  return (
    <div>
        <Input
            name={name}
            type="file"
            id={`fileInput--${name}`}
            style={{ display: "none" }}
            multiple
            onChange={handleChange}
            register={register}
        />
        <label
            htmlFor={`fileInput--${name}`}
            style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "16px",
            }}
        >
            {children}
        </label>
    </div>
  )
}
