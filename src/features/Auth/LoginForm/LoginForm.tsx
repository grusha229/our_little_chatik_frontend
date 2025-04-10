import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '@app/services/auth';
import style from './LoginForm.module.scss';
import { ILoginPayload } from '@app/models/auth';
import Button from '@app/ui/Button/Button';
import Input from '@app/ui/Input/Input';
import { IErrorResponse } from '@app/services/baseQuery';

export default function LoginForm() {
    // Инициализация useForm
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ILoginPayload>({
        mode: 'onBlur',
    });

    // Мутация для обновления пользователя
    const [loginUser, { error }] = useLoginUserMutation();

    const apiError = error as IErrorResponse;
    const apiErrorText = apiError?.data?.message;

    if (apiError?.status === 403) {
        // apiErrorText = apiError?.data?.properties?.description
    }

    const handleSubmitLinkForm = async (formData: ILoginPayload) => {
        console.log(formData);
        try {
            const response = await loginUser(formData).unwrap();
            console.log('Ответ от сервера:', response);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitLinkForm)} className={style['form']}>
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
                type="password"
            />
            <Button type="submit" block disabled={!isValid}>
                Login
            </Button>
            {apiError && <div className="error">{apiErrorText}</div>}
        </form>
    );
}
