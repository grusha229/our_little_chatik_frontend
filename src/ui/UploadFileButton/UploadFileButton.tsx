import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form';
import Input from '../Input/Input';
import styles from './UploadFileButton.module.scss';
import { isMobile, useWindowSize } from '../../utils/responsives';
import AttachmentIcon from '../../img/icons/icon--attachments.svg'
import { buildClassName } from '../../utils/styles';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
  register: UseFormRegister<any>; // Типизируем register для любых форм
  rules?: Record<string, any>; // Валидационные правила
  error?: FieldError | undefined; // Ошибка валидации
  className?: string;
  children: React.ReactNode;
  multiple?: boolean;
}

export default function UploadFileButton({
    register,
    handleChange,
    name,
    children,
    multiple = true,
    className,
}: IProps) {
  const blockClassName = buildClassName(
    className && className
  )

  const {width} = useWindowSize();
  const isMobileDevice = isMobile(width)
  const buttonContent = isMobileDevice
    ? (
      <div className={styles['icon']}>
        <img src={AttachmentIcon} alt=''/>
      </div>
    )
    : children

  return (
    <div className={blockClassName}>
        <Input
            name={name}
            type="file"
            id={`fileInput--${name}`}
            style={{ display: "none" }}
            multiple={multiple}
            onChange={handleChange}
            register={register}
        />
        <label
            htmlFor={`fileInput--${name}`}
            className={styles['button']}
        >
            {buttonContent}
        </label>
    </div>
  )
}
