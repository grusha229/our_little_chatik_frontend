import { formatTime } from '@app/utils/time';
import styles from './ResendActivationBlock.module.scss';
import { useRenewActivationMutation } from '@app/services/auth';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { setActivationTimestamp } from '@app/store/features/auth';
import { useTimer } from './ResendActivationBlock.utils';

export default function ResendActivationBlock() {
    const activationTime = useAppSelector(state => state.auth.activation_timestamp) || '';

    const time = useTimer(activationTime);

    const [renewCode] = useRenewActivationMutation();
    const dispatch = useAppDispatch();

    const handleRenewClick = () => {
        renewCode({});
        dispatch(setActivationTimestamp(Date.now().toString()));
    };

    if (time > 0) {
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
