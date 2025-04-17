import styles from './LoginPage.module.scss';
import LoginForm from '@app/features/Auth/LoginForm/LoginForm';
import Block from '@app/ui/Block/Block';
import Button from '@app/ui/Button/Button/Button';

export default function LoginPage() {
    return (
        <>
            <Block>
                <h2>Welcome!</h2>
                <div>Login to your account</div>
            </Block>
            <Block className={styles['block']} width={500}>
                <LoginForm />
            </Block>
            <Block width={500}>
                <Button href="/register">Register</Button>
            </Block>
        </>
    );
}
