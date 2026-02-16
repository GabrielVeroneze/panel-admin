import { IconButton } from '@/shared/components'
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/icons'
import styles from './TablePagination.module.scss'

type TablePaginationProps = {
    variant?: 'simple' | 'withTotal'
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
}

export const TablePagination = ({
    variant = 'simple',
    page,
    pageSize,
    total,
    onPageChange,
}: TablePaginationProps) => {
    const totalPages = Math.ceil(total / pageSize)

    const start = (page - 1) * pageSize + 1
    const end = Math.min(page * pageSize, total)

    const canGoBack = page > 1
    const canGoNext = page < totalPages

    return (
        <div className={styles.pagination}>
            <div className={styles.controls}>
                <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label="Previous page"
                    size={30}
                    onClick={() => canGoBack && onPageChange(page - 1)}
                    disabled={!canGoBack}
                />
                <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label="Next page"
                    size={30}
                    onClick={() => canGoNext && onPageChange(page + 1)}
                    disabled={!canGoNext}
                />
            </div>
            <div className={styles.info}>
                {variant === 'simple' && (
                    <span>
                        Show{' '}
                        <strong>
                            {start}-{end}
                        </strong>
                    </span>
                )}
                {variant === 'withTotal' && (
                    <span>
                        Show{' '}
                        <strong>
                            {start}-{end}
                        </strong>{' '}
                        of <strong>{total}</strong>
                    </span>
                )}
            </div>
        </div>
    )
}
