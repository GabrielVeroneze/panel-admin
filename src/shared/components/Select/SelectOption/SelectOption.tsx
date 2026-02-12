import type { ComponentProps, ReactNode } from 'react'
import styles from './SelectOption.module.scss'

type SelectOptionProps = {
    children: ReactNode
} & ComponentProps<'option'>

export const SelectOption = ({ children, ...props }: SelectOptionProps) => {
    return (
        <option className={styles.option} {...props}>
            {children}
        </option>
    )
}
