import type { ReactNode } from 'react'
import type { FieldSize, FieldStatus } from '@/shared/types'
import type { NativeInputProps } from './Input.types'
import styles from './Input.module.scss'

type InputProps = {
    size?: FieldSize
    status?: FieldStatus
    icon?: ReactNode
} & NativeInputProps

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
