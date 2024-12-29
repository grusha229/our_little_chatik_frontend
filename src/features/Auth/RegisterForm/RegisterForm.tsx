import React from 'react'
import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '../../../services/auth';
import style from './RegisterForm.module.scss';
import { ISignupPayload } from '../../../models/auth';
import Button from '../../controls/button/Button';

export default function LoginForm() {

    // Инициализация useForm
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<ISignupPayload>({
      mode: 'onBlur',
    });

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
            <form
                onSubmit={handleSubmit(handleSubmitLinkForm)}
                className={style['form']}
            >
                    <input
                        className={style['form--input']}
                        placeholder='Name'
                        {...register("name", 
                          { required: true }
                        )}
                    />
                    {errors.name && <div>{errors.name.message}</div>}
                    <input
                        className={style['form--input']}
                        placeholder='Surname'
                        {...register("surname", { 
                          required: true,
                        })}
                    />
                     {errors.surname && <div>{errors.surname.message}</div>}
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
                        placeholder='Email'
                        type='email'
                        {...register("email", { 
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email address"
                          },
                        })}
                    />
                    {errors.email && <div>{errors.email.message}</div>}
                    <input
                        className={style['form--input']}
                        placeholder='Password'
                        type='password'
                        {...register("password", {
                          required: "this is required",
                          minLength: {
                            value: 8,
                            message: "Password min length is 8",
                          },
                        })}
                    />
                    {errors.password && <div>{errors.password.message}</div>}
                <Button
                  type="submit"
                  block
                  disabled={!isValid}
                >
                  Register
                </Button>
            </form>
        </div>
      )
}
