import { formatTime } from '@app/utils/time';
import { useEffect, useState } from 'react';
import styles from './ResendActivation.module.scss';
import { useRenewActivationMutation } from '@app/services/auth';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { setActivationTimestamp } from '@app/store/features/auth';

const COOLDOWN = 1_000 * 60 * 0.25;

export default function ResendActivation() {
    const activationTime = useAppSelector(state => state.auth.activation_timestamp) || '';

    const [renewCode] = useRenewActivationMutation();
    const dispatch = useAppDispatch();

    const handleRenewClick = () => {
        renewCode({});
        dispatch(setActivationTimestamp(Date.now().toString()));
    };

    const [time, setTime] = useState(0);

    useEffect(() => {
        setTime(parseInt(activationTime) + COOLDOWN - Date.now());
        const interval = setInterval(() => {
            setTime(prev => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activationTime]);

    if (Date.now() <= parseInt(activationTime) + COOLDOWN) {
        return (
            <div className={styles['block']}>
                Still haven't received the code? <br /> You can send the code again in: {formatTime(time)}
            </div>
        );
    }

    return (
        <div className={styles['link']} onClick={handleRenewClick}>
            Resend code
        </div>
    );
}
