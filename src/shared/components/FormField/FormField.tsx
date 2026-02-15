import type { ReactNode } from 'react'
import styles from './FormField.module.scss'

type FormFieldProps = {
    children: ReactNode
    size?: 'regular' | 'large'
    status?: 'default' | 'success' | 'error'
    id: string
    label?: string
    message?: string
}

export const FormField = ({
    children,
    size = 'regular',
    status = 'default',
    id,
    label,
    message,
}: FormFieldProps) => {
    return (
        <div className={`${styles.field} ${styles[size]}`}>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            {children}
            {message && (
                <span className={`${styles.message} ${styles[status]}`}>
                    {message}
                </span>
            )}
        </div>
    )
}
