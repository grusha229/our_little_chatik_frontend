import styles from "./Modal.module.scss"
import {useCallback} from "react";
import { closeModal, IModalsState } from "../../../store/features/modals";
import { useAppSelector, useAppDispatch } from "../../../store/store";

export type TModalSize = 'small' | 'medium' | 'large' | 'xlarge'

export interface IProps {
    children: React.ReactNode,
    header?: React.ReactNode,
    footer?: React.ReactNode,
    name: keyof IModalsState,
    size?: TModalSize,
}

const Modal = ({ 
    name,
    children,
    header,
    footer,
    size = 'medium',
} : IProps) => {

    const isModalVisible = useAppSelector(state => state.modals[name]);
    const dispatch = useAppDispatch();

    const toggleModalVisibility = useCallback(()=> {
            dispatch(closeModal(name))
        },[dispatch, name])

    const modalClassName = [
        styles['modal'],
        isModalVisible ? styles['visible'] : '',
    ].join(' ');

    const modalBlockClassName = [
        styles['modal-block'],
        styles[`modal--${size}`],
    ].join(' ');

    return (
        <div className={modalClassName} onClick={toggleModalVisibility}>
            <div className={modalBlockClassName} onClick={(e) => {e.stopPropagation()}}>
                {header && (
                    <div className={styles['modal-header']}>
                        {header}
                    </div>
                )}
                <div className={styles['modal-content']}>
                    {children}
                </div>
                {footer && (
                    <div className={styles['modal-footer']}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal
