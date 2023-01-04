// @ts-ignore
import s from './skeleton.module.css';

type SkeletonProps = {
    fill?: boolean;
    width?: number;
};

export const Skeleton: React.FC<SkeletonProps> = (props) => {
    /* eslint-disable */
    return (
        <div className={s.box}
            style={props.width ? { '--skeleton-width': `${props.width}px` } : {} as any}
        />
    );
};
