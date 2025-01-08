import React from 'react';
import styles from './IconButton.module.scss';
import {Link} from "react-router-dom";
import plusIcon from './icon--plus.svg';

export interface IProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    icon?: string,
    href?: string,
    onClick?: () => void
    disabled?: boolean
}

export default function IconButton({ 
    icon = plusIcon,
    href,
    onClick,
    ...props
}: IProps){

    const buttonClassName = [styles['button']].join(' ');

    if (href) {

        return(
            <Link
                to={href}
                className={buttonClassName}
                {...props}
            >
                <img src={icon} alt='' />
            </Link>
        );
    }

    return(
        <button
            className={buttonClassName}
            onClick={onClick}
            {...props}
        >
            <img src={icon} alt='' />
        </button>
    );
}