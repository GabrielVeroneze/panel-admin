import { ArrowDownSolidIcon, ArrowUpSolidIcon } from '@/shared/assets/icons'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './MetricCard.module.scss'

export type MetricCardProps = {
    title: string
    value: string | number
    variation?: number
    children: ReactNode
}

export const MetricCard = ({
    title,
    value,
    variation,
    children,
}: MetricCardProps) => {
    const isPositive = variation !== undefined && variation >= 0

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{title}</h2>
                    <strong className={styles.value}>{value}</strong>
                </div>
                {variation && (
                    <span
                        className={clsx(
                            styles.variation,
                            isPositive && styles.positive,
                            !isPositive && styles.negative,
                        )}
                    >
                        {variation}%
                        {isPositive ? (
                            <ArrowUpSolidIcon />
                        ) : (
                            <ArrowDownSolidIcon />
                        )}
                    </span>
                )}
            </header>
            <div className={styles.chartContainer}>{children}</div>
        </div>
    )
}
