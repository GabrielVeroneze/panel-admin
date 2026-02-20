import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './TableCell.module.scss'

type TableCellProps = {
    header?: boolean
} & ComponentProps<'td'>

export const TableCell = ({ children, header, ...props }: TableCellProps) => {
    if (header) {
        return (
            <th className={clsx(styles.tableCell, styles.header)} {...props}>
                {children}
            </th>
        )
    }

    return (
        <td className={styles.tableCell} {...props}>
            {children}
        </td>
    )
}
