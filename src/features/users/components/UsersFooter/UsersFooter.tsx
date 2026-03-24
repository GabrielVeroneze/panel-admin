import { TablePagination } from '@/shared/components'
import { EyeSolidIcon } from '@/shared/assets/icons'
import styles from './UsersFooter.module.scss'

export const UsersFooter = () => {
    return (
        <div className={styles.footer}>
            <TablePagination
                label="users"
                page={1}
                pageSize={15}
                total={987}
                onPageChange={() => {}}
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
