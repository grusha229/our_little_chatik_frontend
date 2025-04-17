import Avatar from '@app/ui/Avatar/Avatar';
import styles from './UserBadge.module.scss';

export interface IProps {
    avatar: string;
    name?: string;
    surname?: string;
    id: string;
    nickname?: string;
}

export default function UserBadge({ avatar, name, surname, id: _id, nickname }: IProps) {
    return (
        <div className={styles['badge']}>
            <Avatar src={avatar} title={nickname ?? ''} size="medium" />
            <div className={styles['badge__info']}>
                {(name || surname) && (
                    <div className={styles['badge__name']}>
                        {name} {surname}
                    </div>
                )}
                {nickname && <div className={styles['badge__nickname']}>@{nickname}</div>}
            </div>
        </div>
    );
}
