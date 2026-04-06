import { useState } from 'react'
import { UsersFooter, UsersModal, UsersTable, UsersToolbar } from './components'
import { useUsers } from './hooks'
import type { User } from './types'
import type { UserFormValues } from './schemas'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    const [page, setPage] = useState<number>(1)
    const [open, setOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [search, setSearch] = useState<string>('')

    const pageSize = 15

    const { users, usersList, total, loading } = useUsers(
        page,
        pageSize,
        search,
    )

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const handleCreate = () => {
        setSelectedUser(null)
        setOpen(true)
    }

    const handleEdit = (userId: number) => {
        const user = users.find((user) => user.id === userId)

        if (!user) return

        setSelectedUser(user)
        setOpen(true)
    }

    const handleSubmit = (data: UserFormValues) => {
        if (selectedUser) {
            console.log('update user', data)
        } else {
            console.log('create user', data)
        }

        setOpen(false)
    }

    return (
        <section className={styles.users}>
            <UsersToolbar
                search={search}
                onSearchChange={handleSearchChange}
                onCreate={handleCreate}
            />
            <UsersTable
                users={usersList}
                loading={loading}
                onEdit={handleEdit}
            />
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
                onSubmit={handleSubmit}
                onDelete={(user) => console.log('delete', user)}
            />
        </section>
    )
}
