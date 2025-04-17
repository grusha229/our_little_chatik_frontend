import styles from './Modal.module.scss';
import { useCallback, useEffect } from 'react';
import { closeModal, IModalsState } from '@app/store/features/modals';
import { useAppSelector, useAppDispatch } from '@app/store/hooks';
import iconClose from '@app/img/icons/icon--x-mark-white.svg';
import { buildClassName } from '@app/utils/styles';

export type TModalSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface IProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    name: keyof IModalsState;
    size?: TModalSize;
    onClose?: () => void;
}

const Modal = ({ name, children, header, footer, size = 'medium', onClose }: IProps) => {
    const isModalVisible = useAppSelector(state => state.modals[name].isVisible);
    const dispatch = useAppDispatch();

    const toggleModalVisibility = useCallback(() => {
        onClose && onClose();
        dispatch(closeModal(name));
    }, [dispatch, name, onClose]);

    const modalClassName = buildClassName(styles['modal'], isModalVisible ? styles['visible'] : '');

    const modalBlockClassName = buildClassName(styles['modal-block'], styles[`modal--${size}`]);

    useEffect(() => {
        return () => {
            dispatch(closeModal(name));
        };
    }, []);

    return (
        <div className={modalClassName} onClick={toggleModalVisibility}>
            <div
                className={modalBlockClassName}
                onClick={e => {
                    e.stopPropagation();
                }}
            >
                <div className={styles['modal-close']} onClick={toggleModalVisibility}>
                    <img src={iconClose} />
                </div>
                {header && <div className={styles['modal-header']}>{header}</div>}
                <div className={styles['modal-content']}>{children}</div>
                {footer && <div className={styles['modal-footer']}>{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;
