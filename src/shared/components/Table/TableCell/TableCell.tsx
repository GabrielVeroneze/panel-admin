import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './TableCell.module.scss'

type TableCellProps = {
    header?: boolean
} & ComponentProps<'td'>

export const TableCell = ({
    children,
    header,
    className,
    ...props
}: TableCellProps) => {
    if (header) {
        return (
            <th
                className={clsx(styles.tableCell, styles.header, className)}
                {...props}
            >
                {children}
            </th>
        )
    }

    return (
        <td className={clsx(styles.tableCell, className)} {...props}>
            {children}
        </td>
    )
}
