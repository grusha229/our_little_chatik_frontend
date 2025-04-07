import React, { SyntheticEvent } from 'react';
import styles from './IconButton.module.scss';
import {Link} from "react-router-dom";
import plusIcon from './../../img/icons/icon--plus.svg';
import { buildClassName } from '../../utils/styles';

export interface IProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
    icon?: string,
    href?: string,
    onClick?: (event: SyntheticEvent) => void,
    disabled?: boolean,
    size?: 'default' | 'xsmall',
    className?: string,
}

export default function IconButton({ 
    icon = plusIcon,
    href,
    onClick,
    size = 'default',
    className,
    ...props
}: IProps){

    const buttonClassName = buildClassName(
        styles['button'],
        styles[`button--${size}`],
        className,
    );

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