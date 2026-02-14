import type { ComponentProps } from 'react'
import styles from './Switch.module.scss'

type SwitchProps = {
    label?: string
} & ComponentProps<'input'>

export const Switch = ({ label, ...props }: SwitchProps) => {
    return (
        <label className={styles.container}>
            <input className={styles.input} type="checkbox" {...props} />
            <span className={styles.track}>
                <span className={styles.thumb} />
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
}
