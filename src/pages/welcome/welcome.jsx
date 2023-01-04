import s from './welcome.module.css'
import {ButtonLink} from "../../components/button/Button";
import {Link} from "react-router-dom";
import Modal from "../../components/modal/Modal.jsx";

export default function Welcome() {
    const heading =  'Привет!';


    return (
        <>
            <div className={s.main} id="welcome">
                {/*<Modal*/}
                {/*    active={true}*/}
                {/*    children={*/}
                {/*        <h1 className={s.heading}>{heading}</h1>*/}
                {/*    }*/}
                {/*/>*/}
                {/*<h1 className={s.heading}>{heading}</h1>*/}
                <ButtonLink
                    href={'reg'}
                    children={'Регистрация'}
                />
                <ButtonLink
                    href={'auth'}
                    children={'Авторизация'}
                />
                <ButtonLink
                    href={'messages'}
                    children={'Сообщения'}
                />
            </div>
        </>
    );
}
