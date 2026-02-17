import type { ComponentProps } from 'react'
import styles from './Table.module.scss'

type TableProps = {
    striped?: boolean
} & ComponentProps<'table'>

export const Table = ({ children, striped, ...props }: TableProps) => {
    return (
        <table
            className={`
                ${styles.table}
                ${striped ? styles.striped : ''}
            `}
            {...props}
        >
            {children}
        </table>
    )
}
