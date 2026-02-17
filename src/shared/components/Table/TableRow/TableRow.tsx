import type { ComponentProps } from 'react'
import styles from './TableRow.module.scss'

type TableRowProps = ComponentProps<'tr'>

export const TableRow = ({ children, ...props }: TableRowProps) => {
    return (
        <tr className={styles.tableRow} {...props}>
            {children}
        </tr>
    )
}
