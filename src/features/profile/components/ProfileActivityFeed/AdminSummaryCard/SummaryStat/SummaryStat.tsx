import { ArrowDownSolidIcon, ArrowUpSolidIcon } from '@/shared/assets/icons'
import type { ReactNode } from 'react'
import styles from './SummaryStat.module.scss'

type SummaryStatProps = {
    icon: ReactNode
    label: string
    value: string | number
    variation: number
}

export const SummaryStat = ({
    icon,
    label,
    value,
    variation,
}: SummaryStatProps) => {
    const isPositive = variation !== undefined && variation >= 0

    return (
        <article className={styles.stat}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
                <span className={styles.label}>{label}</span>
                <strong className={styles.value}>{value}</strong>
                {variation && (
                    <span className={styles.variation}>
                        {variation > 0 && '+'}
                        {variation} this month
                        {isPositive ? (
                            <ArrowUpSolidIcon />
                        ) : (
                            <ArrowDownSolidIcon />
                        )}
                    </span>
                )}
            </div>
        </article>
    )
}
