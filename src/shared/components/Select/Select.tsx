import type { ReactNode } from 'react'
import type { FieldControlProps, FieldSize } from '@/shared/types'
import type { NativeSelectProps } from './Select.types'
import clsx from 'clsx'
import styles from './Select.module.scss'

type SelectProps = NativeSelectProps & {
    children: ReactNode
    size?: FieldSize
} & FieldControlProps

export const Select = ({
    children,
    size = 'medium',
    className,
    ...props
}: SelectProps) => {
    return (
        <select
            className={clsx(styles.select, styles[size], className)}
            {...props}
        >
            {children}
        </select>
    )
}
