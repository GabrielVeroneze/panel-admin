import { useState } from 'react'
import { UsersFooter, UsersTable, UsersToolbar } from './components'
import { useUsers } from './hooks'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    const [page, setPage] = useState<number>(1)
    const pageSize = 15

    const { users, total, loading } = useUsers(page, pageSize)

    return (
        <section className={styles.users}>
            <UsersToolbar />
            <UsersTable users={users} loading={loading} />
            <UsersFooter
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
            />
        </section>
    )
}
