import type { TooltipContentProps } from 'recharts'
import styles from './Tooltip.module.scss'

export const Tooltip = ({
    active,
    payload,
    label,
    formatter,
    labelFormatter,
}: TooltipContentProps<number, string>) => {
    if (!active || !payload.length) return null

    const formattedLabel = labelFormatter
        ? labelFormatter(label, payload)
        : label

    const getFormattedValue = (
        item: (typeof payload)[number],
        index: number,
    ) =>
        formatter
            ? formatter(item.value, item.name, item, index, payload)
            : item.value

    return (
        <div className={styles.tooltip} role="tooltip">
            {formattedLabel && <p className={styles.title}>{formattedLabel}</p>}
            <ul className={styles.items}>
                {payload.map((item, index) => (
                    <li key={index} className={styles.item}>
                        {item.color && (
                            <span
                                className={styles.dot}
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        <span className={styles.label}>{item.name}: </span>
                        <span className={styles.value}>
                            {getFormattedValue(item, index)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
