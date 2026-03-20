import type { ComponentProps } from 'react'
import styles from './TableRow.module.scss'
import clsx from 'clsx'

type TableRowProps = {
    size?: 'sm' | 'md' | 'lg'
} & ComponentProps<'tr'>

export const TableRow = ({
    children,
    size = 'md',
    ...props
}: TableRowProps) => {
    return (
        <tr className={clsx(styles.tableRow, styles[size])} {...props}>
            {children}
        </tr>
    )
}
