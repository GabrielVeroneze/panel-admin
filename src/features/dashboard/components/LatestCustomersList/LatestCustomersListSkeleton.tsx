import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './LatestCustomersList.module.scss'
import userInfoStyles from '@/shared/components/UserInfo/UserInfo.module.scss'

export const LatestCustomersListSkeleton = () => {
    const items = Array.from({ length: 6 })

    return (
        <div className={clsx(styles.container, styles.skeleton)}>
            <Skeleton className={styles.titleSkeleton} />
            <ul className={styles.list}>
                {items.map((_, index) => (
                    <li key={index} className={styles.item}>
                        <div
                            className={clsx(
                                userInfoStyles.container,
                                userInfoStyles.sm,
                            )}
                        >
                            <div>
                                <Skeleton className={styles.avatarSkeleton} />
                            </div>
                            <div className={userInfoStyles.text}>
                                <Skeleton className={styles.nameSkeleton} />
                                <Skeleton className={styles.emailSkeleton} />
                            </div>
                        </div>
                        <Skeleton className={styles.valueSkeleton} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
