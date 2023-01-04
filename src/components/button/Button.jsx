import React from 'react';
import s from './Button.module.css';
import {Link} from "react-router-dom";


export default function Button(props){

    return(
        <button
            className={s.button}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export const ButtonLink = (props) => {

    return(
        <Link to={props.href} className={s.button}>
            <span className={s.text}>{props.children}</span>
        </Link>
    );
}
