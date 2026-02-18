import type { ComponentProps, CSSProperties } from 'react'
import styles from './Table.module.scss'

type TableProps = {
    columns?: string
    striped?: boolean
} & ComponentProps<'table'>

export const Table = ({ children, columns, striped, ...props }: TableProps) => {
    const style = { '--table-columns': columns } as CSSProperties

    return (
        <table
            className={`
                ${styles.table}
                ${striped ? styles.striped : ''}
            `}
            style={style}
            {...props}
        >
            {children}
        </table>
    )
}
