import React from 'react'
import Modal from '../../../ui/Modal/Modal'
import styles from './PersonalInfoModal.module.scss'
import { useAppSelector } from '../../../store/hooks';
import Avatar from '../Avatar/Avatar';
import LogoutButton from '../../Header/LogoutButton/LogoutButton';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';

export interface IProps {
    user_id: string
}

export default function PersonalInfoModal() {
    const currentUser = useAppSelector((state) => state.users.current_user)

    const avatarSrc = currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name}+${currentUser?.surname}`;

    return (
        <Modal
            name='user_info'
        >
            <div className={styles['content']}>
                <Avatar src={avatarSrc} size="xlarge" />
                <PersonalInfoForm user={currentUser} />
                <div className={styles['content--footer']}>
                    <LogoutButton/>
                </div>
            </div>
        </Modal>
    )
}
