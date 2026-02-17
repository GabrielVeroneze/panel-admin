import type { ComponentProps } from 'react'
import styles from './TableHead.module.scss'

type TableHeadProps = ComponentProps<'thead'>

export const TableHead = ({ children, ...props }: TableHeadProps) => {
    return (
        <thead className={styles.tableHead} {...props}>
            {children}
        </thead>
    )
}
