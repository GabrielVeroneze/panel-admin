import type { ReactNode } from 'react'
import styles from './DropdownItem.module.scss'

type DropdownItemProps = {
    children: ReactNode
    icon?: ReactNode
    variant?: 'default' | 'danger'
    disabled?: boolean
    onClick?: () => void
}

export const DropdownItem = ({
    children,
    icon,
    variant = 'default',
    disabled,
    onClick,
}: DropdownItemProps) => {
    return (
        <li className={`${styles.item} ${styles[variant]}`}>
            <button
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span>{children}</span>
            </button>
        </li>
    )
}
