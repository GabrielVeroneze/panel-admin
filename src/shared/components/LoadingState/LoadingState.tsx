import { Skeleton } from '@/shared/components'
import type { LoadingType, LoadingVariant } from './LoadingState.types'
import styles from './LoadingState.module.scss'

type LoadingStateProps = {
    type?: LoadingType
    variant?: LoadingVariant
    lines?: number
    columns?: number
}

export const LoadingState = ({
    type = 'text',
    variant = 'default',
    lines = 3,
    columns = 3,
}: LoadingStateProps) => {
    if (type === 'table') {
        return (
            <div
                className={`
                    ${styles.container}
                    ${styles.tableLayout}
                    ${styles[variant]}
                `}
            >
                {Array.from({ length: lines }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.tableRow}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton key={colIndex} height={44} />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    if (type === 'avatar') {
        return (
            <div
                className={`
                    ${styles.container}
                    ${styles.avatarLayout}
                    ${styles[variant]}
                `}
            >
                <Skeleton height={90} width={90} />
                <div className={styles.textBlock}>
                    <Skeleton height={20} />
                    <Skeleton height={16} />
                    <Skeleton height={32} />
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${styles[variant]}`}>
            {Array.from({ length: lines }).map((_, index) => (
                <Skeleton key={index} height={16} />
            ))}
        </div>
    )
}
