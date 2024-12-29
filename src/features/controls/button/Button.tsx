import React from 'react';
import styles from './Button.module.scss';
import {Link} from "react-router-dom";

export interface IProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    children: React.ReactNode,
    href?: string,
    block?: boolean,
    onClick?: () => void
    disabled?: boolean
}

export default function Button({ 
    children,
    href,
    onClick,
    block,
    ...props
}: IProps){

    const buttonClassName = [styles['button'], block && styles['button--block']].join(' ');

    if (href) {

        return(
            <Link
                to={href}
                className={buttonClassName}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return(
        <button
            className={buttonClassName}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}