import React from 'react'
import { useForm } from 'react-hook-form';
import { useActivateUserMutation } from '../../../services/auth';
import style from './ActivationForm.module.scss';
import { IActivationPayload } from '../../../models/auth';
import Button from '../../controls/Button/Button';
import Input from '../../controls/Input/Input';
export default function ActivationForm() {

    // Инициализация useForm
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting },} = useForm<IActivationPayload>({
      mode: 'onBlur',
    });

    const [ activateUser, error ] = useActivateUserMutation();
    const apiError = error?.error

    const handleSubmitActivationUserForm = async (formData: IActivationPayload) => {
      console.log(formData);
      try {
        const response = await activateUser(formData).unwrap();
        console.log("Ответ от сервера:", response);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };

    return (
            <form
                onSubmit={handleSubmit(handleSubmitActivationUserForm)}
                className={style['form']}
            >
                    <Input
                      name="code"
                      placeholder="Activation code"
                      register={register}
                      rules={{ required: 'Enter the code' }}
                      error={errors.code}
                    />
                    <Button
                      type='submit'
                      block
                      disabled={!isValid || isSubmitting}
                    >
                      Activate
                    </Button>
                    {apiError && (
                        <div className='error'>
                          {apiError?.data?.message}
                        </div>
                    )}
            </form>
      )
}
