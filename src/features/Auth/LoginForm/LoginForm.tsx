import React from 'react'
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../services/auth';
import style from './LoginForm.module.scss';
import { ILoginPayload } from '../../../models/auth';
import Button from '../../controls/button/Button';

export default function LoginForm() {

    // Инициализация useForm
    const { register, handleSubmit, formState: { errors, isValid },} = useForm<ILoginPayload>({
      mode: 'onBlur',
    });

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
            <form 
                onSubmit={handleSubmit(handleSubmitLinkForm)}
                className={style['form']}
            >
                    <input
                        className={style['form--input']}
                        placeholder='Nickname'
                        {...register("nickname", {
                          required: true,
                        })}
                    />
                    {errors.nickname && <div>{errors.nickname.message}</div>}
                    <input
                        className={style['form--input']}
                        placeholder='password'
                        type='password'
                        {...register("password", {
                          required: true,
                        })}
                    />
                    {errors.nickname && <div>{errors.nickname.message}</div>}
                    <Button
                      type='submit'
                      block
                      disabled={!isValid}
                    >
                      Login
                    </Button>
            </form>
      )
}
