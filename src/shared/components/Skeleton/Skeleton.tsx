import clsx from 'clsx'
import styles from './Skeleton.module.scss'

type SkeletonProps = {
    height?: string | number
    width?: string | number
    className?: string
}

export const Skeleton = ({ height, width, className }: SkeletonProps) => {
    return (
        <div
            className={clsx(styles.skeleton, className)}
            style={{
                height,
                width,
                maxWidth: '100%',
            }}
        />
    )
}
