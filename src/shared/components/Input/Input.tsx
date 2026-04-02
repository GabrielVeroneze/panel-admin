import type { ReactNode } from 'react'
import type { FieldControlProps, FieldSize } from '@/shared/types'
import type { NativeInputProps } from './Input.types'
import clsx from 'clsx'
import styles from './Input.module.scss'

type InputProps = NativeInputProps & {
    size?: FieldSize
    icon?: ReactNode
} & FieldControlProps

export const Input = ({
    size = 'medium',
    status,
    icon,
    className,
    disabled,
    ...props
}: InputProps) => {
    return (
        <div
            className={clsx(
                styles.wrapper,
                styles[size],
                status && styles[status],
                icon && styles.withIcon,
                disabled && styles.disabled,
                className,
            )}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <input className={styles.input} disabled={disabled} {...props} />
        </div>
    )
}
