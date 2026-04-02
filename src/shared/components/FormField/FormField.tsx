import { cloneElement, isValidElement, type ReactElement } from 'react'
import type { FieldSize, FieldStatus } from '@/shared/types'
import type { FieldComponentProps } from './FormField.types'
import clsx from 'clsx'
import styles from './FormField.module.scss'

type FormFieldProps = {
    children: ReactElement<FieldComponentProps>
    className?: string
    size?: FieldSize
    status?: FieldStatus
    id: string
    label?: string
    message?: string
}

export const FormField = ({
    children,
    className,
    size = 'medium',
    status,
    id,
    label,
    message,
}: FormFieldProps) => {
    const enhancedChild = isValidElement(children)
        ? cloneElement(children, {
              id,
              status,
          })
        : children

    return (
        <div className={clsx(styles.field, styles[size], className)}>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            {enhancedChild}
            {message && (
                <span
                    className={clsx(styles.message, status && styles[status])}
                >
                    {message}
                </span>
            )}
        </div>
    )
}
