import { Skeleton } from '@/shared/components'
import styles from './SessionsByDevice.module.scss'

export const SessionsByDeviceSkeleton = () => {
    return (
        <div className={styles.container}>
            <Skeleton width={160} height={20} />
            <div className={styles.chartContainer}>
                <Skeleton width={182} height={182} />
            </div>
        </div>
    )
}
