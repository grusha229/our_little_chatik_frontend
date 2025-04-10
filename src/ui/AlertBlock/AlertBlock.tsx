import styles from './AlertBlock.module.scss';

export interface IProps {
    img_src?: string;
    title: JSX.Element | string;
    description?: string;
}

export default function AlertBlock({ img_src, title, description }: IProps) {
    return (
        <div className={styles['block']}>
            <div className={styles['block-container']}>
                {img_src && (
                    <div className={styles['image-container']}>
                        <img className={styles['image']} src={img_src} alt="" />
                    </div>
                )}
                <div className={styles['title']}> {title} </div>
                {description && <div className={styles['description']}> {description} </div>}
            </div>
        </div>
    );
}
