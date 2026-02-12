import type { ComponentProps, ReactNode } from 'react'
import styles from './Select.module.scss'

type SelectProps = {
    children: ReactNode
} & ComponentProps<'select'>

export const Select = ({ children, ...props }: SelectProps) => {
    return (
        <select className={styles.select} {...props}>
            {children}
        </select>
    )
}
