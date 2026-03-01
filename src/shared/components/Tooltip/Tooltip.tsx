import type { ReactNode } from 'react'
import type { TooltipItem } from './Tooltip.types'
import clsx from 'clsx'
import styles from './Tooltip.module.scss'

type TooltipProps = {
    title?: ReactNode
    items: TooltipItem[]
    showArrow?: boolean
}

export const Tooltip = ({ title, items, showArrow = false }: TooltipProps) => {
    return (
        <div
            className={clsx(styles.tooltip, showArrow && styles.withArrow)}
            role="tooltip"
        >
            {title && <div className={styles.title}>{title}</div>}
            <ul className={styles.items}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.color && (
                            <span
                                className={styles.dot}
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        <span className={styles.label}>{item.name}: </span>
                        <span className={styles.value}>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
