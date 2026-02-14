import type { ComponentProps, ReactNode } from 'react'
import styles from './Input.module.scss'

type InputProps = {
    size?: 'regular' | 'large'
    variant?: 'default' | 'success' | 'danger'
    icon?: ReactNode
} & Omit<ComponentProps<'input'>, 'size'>

export const Input = ({
    size = 'regular',
    variant = 'default',
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
                ${styles[variant]}
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
