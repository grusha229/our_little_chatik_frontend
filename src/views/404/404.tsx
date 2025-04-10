import Button from '@app/ui/Button/Button';
import styles from './404.module.scss'
import {useRouteError, isRouteErrorResponse} from "react-router-dom";

export default function NotFoundPage() {
    const error = useRouteError();
    let errorMessage: string;
  
    if (isRouteErrorResponse(error)) {
      // error is type `ErrorResponse`
      errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      console.error(error);
      errorMessage = 'Unknown error';
    }
    
    return (
        <>
            <div className={styles['main']} id="welcome">
                <h1>Ops!</h1>
                <h2>There is an error </h2>
                <p>
                    <i>{errorMessage}</i>
                </p>
                <Button href={'/'}>Вернуться назад</Button>
            </div>
        </>
    );
}
