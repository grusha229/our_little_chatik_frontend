import React from 'react'
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../../services/auth';
import style from './LoginForm.module.scss';
import { ILoginPayload } from '../../../models/auth';
import Button from '../../controls/Button/Button';
import InputComponent from '../../controls/Input/Input';
import Input from '../../controls/Input/Input';

export default function LoginForm() {

    // Инициализация useForm
    const { register, handleSubmit, formState: { errors, isValid },} = useForm<ILoginPayload>({
      mode: 'onBlur',
    });

      // Мутация для обновления пользователя
    const [ loginUser, error ] = useLoginUserMutation();
    const apiError = error?.error

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
                    <Input
                      name="nickname"
                      placeholder="Nickname"
                      register={register}
                      rules={{ required: 'Enter your nickname' }}
                      error={errors.nickname}
                    />
                    <Input
                      name="password"
                      placeholder="Password"
                      register={register}
                      rules={{ required: 'Enter the password' }}
                      error={errors.password}
                      type='password'
                    />
                    <Button
                      type='submit'
                      block
                      disabled={!isValid}
                    >
                      Login
                    </Button>
                    {apiError && (
                        <div className='error'>
                          {apiError?.data?.message}
                        </div>
                    )}
            </form>
      )
}
