import type { TooltipItem } from './Tooltip.types'
import styles from './Tooltip.module.scss'

type TooltipProps = {
    title?: string
    items: TooltipItem[]
}

export const Tooltip = ({ title, items }: TooltipProps) => {
    return (
        <div className={styles.tooltip} role="tooltip">
            {title && <p className={styles.title}>{title}</p>}
            <ul className={styles.items}>
                {items.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.color && (
                            <span
                                className={styles.dot}
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        <span className={styles.label}>{item.label}: </span>
                        <span className={styles.value}>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
