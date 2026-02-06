import type { ReactNode } from 'react'
import styles from './IconButton.module.scss'

type IconButtonProps = {
    icon: ReactNode
    ariaLabel: string
    size?: number
    onClick?: () => void
}

export const IconButton = ({
    icon,
    ariaLabel,
    size = 24,
    onClick,
}: IconButtonProps) => {
    return (
        <button
            className={styles.button}
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            style={{ height: size, width: size }}
        >
            {icon}
        </button>
    )
}
