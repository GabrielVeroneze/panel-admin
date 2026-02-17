import type { ComponentProps } from 'react'
import styles from './TableBody.module.scss'

type TableBodyProps = ComponentProps<'tbody'>

export const TableBody = ({ children, ...props }: TableBodyProps) => {
    return (
        <tbody className={styles.tableBody} {...props}>
            {children}
        </tbody>
    )
}
