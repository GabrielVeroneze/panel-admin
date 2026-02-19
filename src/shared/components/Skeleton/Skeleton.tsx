import styles from './Skeleton.module.scss'

type SkeletonProps = {
    height?: string | number
    width?: string | number
}

export const Skeleton = ({ height = 16, width = '100%' }: SkeletonProps) => {
    return <div className={styles.skeleton} style={{ height, width }} />
}
