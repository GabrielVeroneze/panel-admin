import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './TableCell.module.scss'

type TableCellProps = {
    header?: boolean
    size?: 'md' | 'lg'
} & ComponentProps<'td'>

export const TableCell = ({
    children,
    header,
    size = 'md',
    className,
    ...props
}: TableCellProps) => {
    const classes = clsx(
        styles.tableCell,
        styles[size],
        header && styles.header,
        className,
    )

    if (header) {
        return (
            <th className={classes} {...props}>
                {children}
            </th>
        )
    }

    return (
        <td className={classes} {...props}>
            {children}
        </td>
    )
}
