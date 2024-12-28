import React from 'react'
import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '../../../services/auth';
import style from './RegisterForm.module.scss';
import { ISignupPayload } from '../../../models/auth';

export default function LoginForm() {

    // Инициализация useForm
    const { register, handleSubmit } = useForm<ISignupPayload>();

      // Мутация для обновления пользователя
    const [ registerUser ] = useSignupUserMutation();

    const handleSubmitLinkForm = async (formData: ISignupPayload) => {
      console.log(formData);
      try {
        const response = await registerUser(formData).unwrap();
        console.log("Ответ от сервера:", response);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };

    return (
        <div className={style['block']}>
            <div>Register</div>
            <form
                onSubmit={handleSubmit(handleSubmitLinkForm)}
                className={style['form']}
            >
                    <input
                        className={style['form--input']}
                        placeholder='name'
                        {...register('name')}
                    />
                    <input
                        className={style['form--input']}
                        placeholder='surname'
                        {...register('surname')}
                    />
                    <input
                        className={style['form--input']}
                        placeholder='nickname'
                        {...register('nickname')}
                    />
                    <input
                        className={style['form--input']}
                        placeholder='email'
                        {...register('email')}
                    />
                    <input
                        className={style['form--input']}
                        placeholder='password'
                        {...register('password')}
                    />
                <button
                  className={style['form--button']} 
                  type="submit"
                >
                  Register
                </button>
            </form>
        </div>
      )
}
