import { TablePagination } from '@/shared/components'
import type { ReactNode } from 'react'
import styles from './DataTableFooter.module.scss'

type DataTableFooterProps = {
    label: string
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
    info?: ReactNode
}

export const DataTableFooter = ({
    label,
    page,
    pageSize,
    total,
    onPageChange,
    info,
}: DataTableFooterProps) => {
    return (
        <div className={styles.footer}>
            <TablePagination
                label={label}
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={onPageChange}
            />
            {info && <div className={styles.info}>{info}</div>}
        </div>
    )
}
