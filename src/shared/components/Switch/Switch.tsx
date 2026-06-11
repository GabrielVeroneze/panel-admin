import type { FieldControlProps, FieldSize } from '@/shared/types'
import type { NativeSwitchProps } from './Switch.types'
import clsx from 'clsx'
import styles from './Switch.module.scss'

type SwitchProps = NativeSwitchProps & {
    label?: string
    size?: FieldSize
} & FieldControlProps

export const Switch = ({
    label,
    size = 'medium',
    className,
    ...props
}: SwitchProps) => {
    return (
        <label className={clsx(styles.container, styles[size], className)}>
            <input className={styles.input} type="checkbox" {...props} />
            <span className={styles.track}>
                <span className={styles.thumb} />
            </span>
            {label && <span className={styles.label}>{label}</span>}
        </label>
    )
}
