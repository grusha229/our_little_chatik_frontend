import s from './root.module.css'
import Button from "../../components/button/Button";
import {useEffect, useState} from "react";
import {fetchFunc} from "../../utils/utils.ts";
import { redirect } from "react-router-dom";
import {useNavigate} from "react-router";

const CREATE_USER_API_URL = 'http://localhost:8080/api/gateway/signup';
const AUTH_USER_API_URL = '';

export default function Root(props) {

    const navigate = useNavigate()

    let url = (props.isRegistration ?  CREATE_USER_API_URL : AUTH_USER_API_URL)

    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    function handleChange (setFunction,event) {
        event.preventDefault()
        setFunction(event.target.value)
    }

    function handleSubmit (event) {
        event.preventDefault()
        let body = JSON.stringify({
            nickname: nickname,
            password: password
        })
        fetchFunc(url,"POST", body)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => console.log(data))
            .then(() => {
                navigate("/messages")
            })
            .catch((error) => {
                setError(true)
                console.log(error)
            });
        console.log(nickname,';',password,';',email)
    }

    const heading =  (props.isRegistration) ? 'Привет, новый пользователь' : 'Привет, зарегистрированный пользователь';
    return (
        <>
            <div className={s.main} id="welcome">
                <h1 className={s.heading}>{heading}</h1>
                <div className={s.form}>
                    <form id="welcome-form" onSubmit={handleSubmit}>
                        <input
                            placeholder="Nickname"
                            type="text"
                            onChange={(e) => handleChange(setNickname,e)}
                        />

                        {props.isRegistration && (
                            <input
                                placeholder="Your email"
                                type="email"
                                onChange={(e) => handleChange(setEmail,e)}
                            />
                        )}

                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => handleChange(setPassword,e)}
                        />
                        <div className={`${s.alert} ${ !error ? s.disabled : ''}`}>
                            <p> Упс! Что-то пошло не так </p>
                        </div>
                        <button
                            type="submit"
                        >
                            {!props.isRegistration && (
                                "Sign in"
                            )}
                            {props.isRegistration && (
                                "Log in"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
