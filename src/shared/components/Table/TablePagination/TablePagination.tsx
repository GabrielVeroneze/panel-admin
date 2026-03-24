import { Button } from '@/shared/components'
import { ChevronLeftIcon, ChevronRightIcon } from '@/shared/assets/icons'
import styles from './TablePagination.module.scss'

type TablePaginationProps = {
    label?: string
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
}

export const TablePagination = ({
    label,
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
                <Button
                    icon={<ChevronLeftIcon />}
                    iconPosition="left"
                    variant="transparent"
                    aria-label="Previous page"
                    onClick={() => canGoBack && onPageChange(page - 1)}
                    disabled={!canGoBack}
                >
                    <span className={styles.buttonText}>Previous</span>
                </Button>
                <Button
                    icon={<ChevronRightIcon />}
                    iconPosition="right"
                    variant="primary"
                    aria-label="Next page"
                    onClick={() => canGoNext && onPageChange(page + 1)}
                    disabled={!canGoNext}
                >
                    <span className={styles.buttonText}>Next</span>
                </Button>
            </div>
            <div className={styles.info}>
                <span>
                    Showing{' '}
                    <strong>
                        {start}-{end}
                    </strong>{' '}
                    of <strong>{total}</strong> {label}
                </span>
            </div>
        </div>
    )
}
