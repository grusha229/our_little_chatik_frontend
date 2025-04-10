import { useForm } from 'react-hook-form';
import { useSignupUserMutation } from '@app/services/auth';
import style from './RegisterForm.module.scss';
import { ISignupPayload } from '@app/models/auth';
import Button from '@app/ui/Button/Button';
import Input from '@app/ui/Input/Input';
import { IErrorResponse } from '@app/services/baseQuery';

export default function LoginForm() {
    // Инициализация useForm
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<ISignupPayload>({
        mode: 'onBlur',
    });

    // Мутация для обновления пользователя
    const [registerUser, { error }] = useSignupUserMutation();

    const apiError = error as IErrorResponse;

    const apiErrorText = apiError?.data?.message;

    if (apiError?.status === 409) {
        // apiErrorText = apiError?.data?.properties?.description
    }

    const handleSubmitLinkForm = async (formData: ISignupPayload) => {
        console.log(formData);
        try {
            const response = await registerUser(formData).unwrap();
            console.log('Ответ от сервера:', response);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <div className={style['block']}>
            <form onSubmit={handleSubmit(handleSubmitLinkForm)} className={style['form']}>
                <Input
                    name="name"
                    placeholder="Name"
                    register={register}
                    rules={{ required: 'Enter your name' }}
                    error={errors.name}
                />
                <Input
                    name="surname"
                    placeholder="Surname"
                    register={register}
                    rules={{ required: 'Enter your surname' }}
                    error={errors.surname}
                />
                <Input
                    name="nickname"
                    placeholder="Nickname"
                    register={register}
                    rules={{
                        required: 'Enter your nickname',
                        minLength: {
                            value: 3,
                            message: 'Nickname min length is 3',
                        },
                    }}
                    error={errors.nickname}
                />
                <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    register={register}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'Invalid email address',
                        },
                    }}
                    error={errors.email}
                />
                <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    register={register}
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password min length is 8',
                        },
                    }}
                    error={errors.password}
                />
                <Button type="submit" block disabled={!isValid}>
                    Register
                </Button>
                {apiError && <div className="error">{apiErrorText}</div>}
            </form>
        </div>
    );
}
