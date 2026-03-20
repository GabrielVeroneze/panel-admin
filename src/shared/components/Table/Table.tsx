import type { ComponentProps, CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './Table.module.scss'

type TableProps = {
    columns?: string
    striped?: boolean
    borderedRows?: boolean
} & ComponentProps<'table'>

export const Table = ({
    children,
    columns,
    striped,
    borderedRows,
    className,
    ...props
}: TableProps) => {
    const style = { '--table-columns': columns } as CSSProperties

    return (
        <table
            className={clsx(
                styles.table,
                striped && styles.striped,
                borderedRows && styles.borderedRows,
                className,
            )}
            style={style}
            {...props}
        >
            {children}
        </table>
    )
}
