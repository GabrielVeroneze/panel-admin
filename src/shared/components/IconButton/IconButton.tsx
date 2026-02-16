import type { ComponentProps, ReactNode } from 'react'
import styles from './IconButton.module.scss'

type IconButtonProps = {
    icon: ReactNode
    size?: number
} & ComponentProps<'button'>

export const IconButton = ({ icon, size = 24, ...props }: IconButtonProps) => {
    return (
        <button
            className={styles.button}
            type="button"
            style={{ height: size, width: size }}
            {...props}
        >
            {icon}
        </button>
    )
}
