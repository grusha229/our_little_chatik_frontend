import Modal from '@app/ui/Modal/Modal';
import styles from './PersonalInfoModal.module.scss';
import { useAppSelector } from '@app/store/hooks';
import Avatar from '@app/features/Users/Avatar/Avatar';
import LogoutButton from '@app/features/Header/LogoutButton/LogoutButton';
import PersonalInfoForm from '@app/features/Users/PersonalInfoForm/PersonalInfoForm';
import Loader from '@app/ui/Loader/Loader';

export interface IProps {
    user_id: string;
}

export default function PersonalInfoModal() {
    const currentUser = useAppSelector(state => state.users.current_user);

    const avatarSrc = currentUser?.avatar;

    return (
        <Modal name="user_info">
            <div className={styles['content']}>
                {currentUser ? (
                    <>
                        <Avatar src={avatarSrc} title="It`s you!" size="xlarge" />
                        <PersonalInfoForm user={currentUser} />
                        <div className={styles['content--footer']}>
                            <LogoutButton />
                        </div>
                    </>
                ) : (
                    <>
                        <Loader />
                    </>
                )}
            </div>
        </Modal>
    );
}
