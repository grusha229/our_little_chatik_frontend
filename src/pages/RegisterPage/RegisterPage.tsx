import styles from './RegisterPage.module.scss';
import RegisterForm from '@app/features/Auth/RegistrationForm/RegistrationForm';
import Button from '@app/ui/Button/Button/Button';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/store/hooks';
import Block from '@app/ui/Block/Block';

export default function RegisterPage() {
    const token = useAppSelector(state => state.auth.token);
    const activated_email = useAppSelector(state => state.auth.activated_email);
    // const _activation_timestamp = useAppSelector(state => state.auth.activation_timestamp);

    if (activated_email && token) {
        return <Navigate to="/activation" replace />;
    }

    return (
        <>
            <Block>
                <h2>Welcome!</h2>
                <div>Register your account</div>
            </Block>
            <Block className={styles['block']} width={500}>
                <RegisterForm />
            </Block>
            <Block width={500}>
                <Button href="/login">Login</Button>
            </Block>
        </>
    );
}
