import s from './404.module.css'
import Button, {ButtonLink} from "../../components/button/Button";
import {Link, useRouteError} from "react-router-dom";

export default function NotFoundPage() {
    function handleclick(url) {
        window.location.assign(url)
    }

    const error = useRouteError();
    console.error(error);

    return (
        <>
            <div className={s.main} id="welcome">
                <h1>Ops!</h1>
                <h2>There is an error )</h2>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <ButtonLink href={'/'}>Вернуться назад</ButtonLink>
            </div>
        </>
    );
}
