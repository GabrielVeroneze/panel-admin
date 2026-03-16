import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './LatestCustomersList.module.scss'
import userInfoStyles from '@/shared/components/UserInfo/UserInfo.module.scss'

export const LatestCustomersListSkeleton = () => {
    const items = Array.from({ length: 6 })

    return (
        <div className={styles.container}>
            <Skeleton width={140} height={20} />
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
                                <Skeleton width={28} height={28} />
                            </div>
                            <div className={userInfoStyles.text}>
                                <Skeleton width={120} height={18} />
                                <Skeleton width={180} height={15} />
                            </div>
                        </div>
                        <Skeleton width={50} height={18} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
