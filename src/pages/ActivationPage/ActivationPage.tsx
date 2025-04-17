import styles from './ActivationPage.module.scss';
import { useAppSelector } from '@app/store/hooks';
import { Navigate } from 'react-router-dom';
import ActivationForm from '@app/features/Auth/ActivationForm/ActivationForm';
import Block from '@app/ui/Block/Block';

export default function ActivationPage() {
    const token = useAppSelector(state => state.auth.token);
    const refresh_token = useAppSelector(state => state.auth.refresh_token);
    const activated_email = useAppSelector(state => state.auth?.activated_email);

    if (!token && !refresh_token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Block>
                <h2>Activation</h2>
                <div>Activate your account</div>
                <div>Code was sent to {activated_email}</div>
            </Block>
            <Block className={styles['block']} width={500}>
                <ActivationForm />
            </Block>
        </>
    );
}
