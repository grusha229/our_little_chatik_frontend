import React from 'react'
import Modal from '../../controls/Modal/Modal'
import styles from './PersonalInfoModal.module.scss'
import { useAppSelector } from '../../../store/store';
import { useGetUserInfoByIdQuery } from '../../../services/users';
import Avatar from '../Avatar/Avatar';

export interface IProps {
    user_id: string
}

export default function PersonalInfoModal() {
    const { isVisible, current_id } = useAppSelector(state => state.modals['user_info']);

    const { data } = useGetUserInfoByIdQuery({ user_id: current_id }, {
        skip: !isVisible
    });

    const avatarSrc = data?.avatar || `https://ui-avatars.com/api/?name=${data?.name}+${data?.surname}`;

    return (
        <Modal
            name='user_info'
        >
            <div className={styles['content']}>
                <Avatar src={avatarSrc} size="xlarge" />
                <div>
                    <h2>{data?.name} {data?.surname}</h2>
                    <div>{data?.nickname}</div>
                    <div>{data?.email}</div>
                </div>
            </div>
        </Modal>
    )
}
