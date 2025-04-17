import CurrentUserBadge from '@app/features/Users/CurrentUserBadge/CurrentUserBadge';
import styles from './Header.module.scss';

export default function Header() {
    return (
        <div className={styles['header']}>
            <div className={styles['header--container']}>
                <CurrentUserBadge />
            </div>
        </div>
    );
}
