import styles from './Avatar.module.scss';
import Skeleton from '@mui/material/Skeleton';
import { buildClassName } from '@app/utils/styles';
import avatarFallbackIcon from '@app/img/icons/icon--avatar.svg';

export type TAvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface IProps {
    size?: TAvatarSize;
    src?: string;
    alt?: string;
}

export default function Avatar({ size = 'medium', alt = '', src = avatarFallbackIcon }: IProps) {
    const avatarClassName = buildClassName(styles['avatar'], styles[`avatar--${size}`]);

    return (
        <div className={avatarClassName}>
            <div className={styles['avatar-container']}>
                {!src ? (
                    <Skeleton variant="circular" animation="pulse" width={40} height={40} />
                ) : (
                    <img className={styles['avatar-image']} alt={alt} src={src} />
                )}
            </div>
        </div>
    );
}
