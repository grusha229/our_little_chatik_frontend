import styles from './Header.module.scss';
import CurrentUserBadge from './CurrentUserBadge/CurrentUserBadge';

export default function Header() {
    return (
        <div className={styles['header']}>
            <div className={styles['header--container']}>
                <CurrentUserBadge />
            </div>
        </div>
    );
}
