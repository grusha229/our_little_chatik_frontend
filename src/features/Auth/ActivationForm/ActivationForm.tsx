import { useForm } from 'react-hook-form';
import { useActivateUserMutation } from '@app/services/auth';
import style from './ActivationForm.module.scss';
import { IActivationPayload } from '@app/models/auth';
import Button from '@app/ui/Button/Button/Button';
import Input from '@app/ui/Input/Input';
import { IErrorResponse } from '@app/services/baseQuery';
import ResendActivation from '../ResendActivationBlock/ResendActivationBlock';
export default function ActivationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<IActivationPayload>({
        mode: 'onBlur',
    });

    const [activateUser, { error }] = useActivateUserMutation();

    const apiError = error as IErrorResponse;

    const handleSubmitActivationUserForm = async (formData: IActivationPayload) => {
        console.log(formData);
        try {
            const response = await activateUser(formData).unwrap();
            console.log('Ответ от сервера:', response);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitActivationUserForm)} className={style['form']}>
            <Input name="code" placeholder="Activation code" register={register} rules={{ required: 'Enter the code' }} error={errors.code} />
            <Button type="submit" block disabled={!isValid || isSubmitting}>
                Activate
            </Button>
            <ResendActivation />
            {apiError && <div className="error">{apiError?.data?.message}</div>}
        </form>
    );
}
