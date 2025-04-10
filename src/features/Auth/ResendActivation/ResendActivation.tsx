import { formatTime } from '@app/utils/time';
import { useCallback, useEffect, useState } from 'react';
import styles from './ResendActivation.module.scss';
import { useRenewActivationMutation } from '@app/services/auth';

export default function ResendActivation() {
    const coolDown = 20_000;

    const activationTime = parseInt(localStorage.getItem('activation_timestamp') || '');
    const nowTime = new Date().getTime();

    const [renewCode] = useRenewActivationMutation();

    const handleRenewClick = useCallback(() => {
        renewCode({});
    }, [renewCode]);

    const [time, setTime] = useState(activationTime + coolDown - Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => {
                if (prev <= 1000) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);

        return () => clearInterval(interval); // cleanup on unmount
    }, [activationTime]);

    if (nowTime <= activationTime + coolDown) {
        return (
            <div className={styles['block']}>
                Не пришёл код? Отправить код повторно можно будет через:
                <div>{formatTime(time)}</div>
            </div>
        );
    }

    return (
        <div className={styles['link']} onClick={handleRenewClick}>
            Отправить код повторно
        </div>
    );
}
