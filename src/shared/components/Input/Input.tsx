import type { ComponentProps, ReactNode } from 'react'
import styles from './Input.module.scss'

type InputProps = {
    size?: 'regular' | 'large'
    status?: 'success' | 'danger'
    icon?: ReactNode
} & Omit<ComponentProps<'input'>, 'size'>

export const Input = ({
    size = 'regular',
    status,
    icon,
    className,
    disabled,
    ...props
}: InputProps) => {
    return (
        <div
            className={`
                ${styles.wrapper}
                ${styles[size]}
                ${status ? styles[status] : ''}
                ${icon ? styles.withIcon : ''}
                ${disabled ? styles.disabled : ''}
                ${className}
            `}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <input className={styles.input} disabled={disabled} {...props} />
        </div>
    )
}
