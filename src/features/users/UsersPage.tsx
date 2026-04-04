import { useState } from 'react'
import { UsersFooter, UsersModal, UsersTable, UsersToolbar } from './components'
import { useUsers } from './hooks'
import type { UserEntity } from './types'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    const [page, setPage] = useState<number>(1)
    const [open, setOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<UserEntity | null>(null)

    const pageSize = 15

    const { users, total, loading } = useUsers(page, pageSize)

    const handleCreate = () => {
        setSelectedUser(null)
        setOpen(true)
    }

    const handleEdit = (user: UserEntity) => {
        setSelectedUser(user)
        setOpen(true)
    }

    return (
        <section className={styles.users}>
            <UsersToolbar onCreate={handleCreate} />
            <UsersTable users={users} loading={loading} onEdit={handleEdit} />
            <UsersFooter
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
            />
            <UsersModal
                open={open}
                user={selectedUser}
                onClose={() => setOpen(false)}
                onSubmit={() => setOpen(false)}
                onDelete={() => setOpen(false)}
            />
        </section>
    )
}
