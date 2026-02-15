import { cloneElement, isValidElement, type ReactElement } from 'react'
import type { FieldSize, FieldStatus } from '@/shared/types'
import type { FieldComponentProps } from './FormField.types'
import styles from './FormField.module.scss'

type FormFieldProps = {
    children: ReactElement<FieldComponentProps>
    size?: FieldSize
    status?: FieldStatus
    id: string
    label?: string
    message?: string
}

export const FormField = ({
    children,
    size = 'regular',
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
        <div className={`${styles.field} ${styles[size]}`}>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            {enhancedChild}
            {message && (
                <span
                    className={`
                        ${styles.message}
                        ${status ? styles[status] : ''}
                    `}
                >
                    {message}
                </span>
            )}
        </div>
    )
}
