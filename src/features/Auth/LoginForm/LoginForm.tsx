import React from 'react'
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../services/auth';
import style from './LoginForm.module.scss';
import { ILoginPayload } from '../../../models/auth';

export default function LoginForm() {

    // Инициализация useForm
    const { register, handleSubmit } = useForm<ILoginPayload>();

      // Мутация для обновления пользователя
    const [ loginUser ] = useLoginUserMutation();

    const handleSubmitLinkForm = async (formData: ILoginPayload) => {
      console.log(formData);
      try {
        const response = await loginUser(formData).unwrap();
        console.log("Ответ от сервера:", response);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };

    return (
        <div className={style['block']}>
            <div>Login</div>
            <form 
                onSubmit={handleSubmit(handleSubmitLinkForm)}
                className={style['form']}
            >
                    <input
                        className={style['form--input']}
                        placeholder='Nickname'
                        {...register('nickname')}
                    />
                    <input
                        className={style['form--input']}
                        placeholder='password'
                        security='q'
                        {...register('password')}
                    />
                <button 
                className={style['form--button']} 
                type="submit"
                >
                Login
                </button>
            </form>
        </div>
      )
}
