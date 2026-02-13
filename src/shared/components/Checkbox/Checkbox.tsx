import type { ComponentProps } from 'react'
import styles from './Checkbox.module.scss'

type CheckboxProps = {
    label?: string
    variant?: 'square' | 'circle'
} & ComponentProps<'input'>

export const Checkbox = ({
    label,
    variant = 'square',
    ...props
}: CheckboxProps) => {
    return (
        <label className={styles.container}>
            <input className={styles.input} type="checkbox" {...props} />
            <span
                className={`
                    ${styles.control}
                    ${styles[variant]}
                `}
            />
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
}
