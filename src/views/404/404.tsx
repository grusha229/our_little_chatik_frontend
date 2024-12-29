import Button from '../../features/controls/button/Button';
import styles from './404.module.scss'
import {useRouteError} from "react-router-dom";

export default function NotFoundPage() {

    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className={styles['main']} id="welcome">
                <h1>Ops!</h1>
                <h2>There is an error </h2>
                <p>
                    <i>{error?.statusText || error?.message}</i>
                </p>
                <Button href={'/'}>Вернуться назад</Button>
            </div>
        </>
    );
}
