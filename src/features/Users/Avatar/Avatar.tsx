import React from 'react'
import styles from './Avatar.module.scss'

export type TAvatarSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface IProps {
    size?: TAvatarSize;
    src: string;
    alt?: string;
}

export default function Avatar({
    size = 'medium',
    alt = '',
    src,
}: IProps) {
    const avatarClassName = [styles['avatar'], styles[`avatar--${size}`]].join(' ');

    return (
        <div className={avatarClassName}>
        <div className={styles['avatar-container']}>
            <img className={styles['avatar-image']} alt={alt} src={src} />
        </div>
        </div>
    )
}
