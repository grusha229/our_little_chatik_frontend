
import styles from './Block.module.scss';
import { buildClassName } from '@app/utils/styles';

export interface IProps {
    children: React.ReactNode,
    className?: string,
    width?: string | number
}

export default function Block({ children, className, width}: IProps) {
  const containerClassName = buildClassName(
    styles['block'],
    className ?? className,
  )

  const containerStyle = { maxWidth: width };

  return (
    <div 
      className={containerClassName}
      style={containerStyle}
    >
      {children}
    </div>
  )
}
