import clsx from 'clsx'
import styles from './StatusBadge.module.scss'

type StatusBadgeProps = {
    status: 'active' | 'offline'
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const labelMap = {
        active: 'Active',
        offline: 'Offline',
    }

    return (
        <div className={clsx(styles.badge, styles[status])}>
            <span className={styles.dot} />
            {labelMap[status]}
        </div>
    )
}
