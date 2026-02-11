import type { ReactNode } from 'react'
import type { BadgeColor, BadgeSize } from './Badge.types'
import styles from './Badge.module.scss'

type BadgeProps = {
    color?: BadgeColor
    size?: BadgeSize
    children: ReactNode
}

export const Badge = ({
    children,
    color = 'gray',
    size = 'md',
}: BadgeProps) => {
    return (
        <span
            className={`
                ${styles.badge}
                ${styles[color]}
                ${styles[size]}
            `}
        >
            {children}
        </span>
    )
}
