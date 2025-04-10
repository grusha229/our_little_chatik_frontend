import styles from './Loader.module.scss';
import { buildClassName } from '@app/utils/styles';

export type TLoaderSize = 'xsmall' | 'small' | 'default' | 'large';

export interface IProps {
    size?: TLoaderSize;
}

export default function Loader({ size = 'default' }: IProps) {
    const spinnerClassName = buildClassName(styles['spinner'], styles[`spinner--${size}`]);

    return (
        <div className={styles['container']}>
            <div className={spinnerClassName}></div>
        </div>
    );
}
