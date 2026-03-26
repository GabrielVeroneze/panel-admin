import { TablePagination } from '@/shared/components'
import { EyeSolidIcon } from '@/shared/assets/icons'
import styles from './UsersFooter.module.scss'

type UsersFooterProps = {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
}

export const UsersFooter = ({
    page,
    pageSize,
    total,
    onPageChange,
}: UsersFooterProps) => {
    return (
        <div className={styles.footer}>
            <TablePagination
                label="users"
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={onPageChange}
            />
            <div className={styles.info}>
                <span className={styles.text}>
                    Last account activity:{' '}
                    <strong className={styles.time}>2 hours ago</strong>
                </span>
                <EyeSolidIcon className={styles.icon} />
            </div>
        </div>
    )
}
