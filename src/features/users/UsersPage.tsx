import { useState } from 'react'
import {
    CreateUserModal,
    EditUserModal,
    UsersFooter,
    UsersTable,
    UsersToolbar,
} from './components'
import { useUsers } from './hooks'
import type { User } from './types'
import type { CreateUserFormValues, UpdateUserFormValues } from './schemas'
import styles from './UsersPage.module.scss'

type ModalState =
    | { type: 'create' }
    | {
          type: 'edit'
          user: User
      }
    | null

export const UsersPage = () => {
    const [page, setPage] = useState<number>(1)
    const [modal, setModal] = useState<ModalState>(null)
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
        setModal({ type: 'create' })
    }

    const handleEdit = (userId: number) => {
        const user = users.find((user) => user.id === userId)

        if (!user) return

        setModal({ type: 'edit', user: user })
    }

    const handleSubmit = (data: UserFormValues) => {
        if (selectedUser) {
            console.log('update user', data)
        } else {
    const handleClose = () => {
        setModal(null)
    }

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
            {modal?.type === 'create' && (
                <CreateUserModal
                    open
                    onCreate={handleCreateSubmit}
                    onClose={handleClose}
                />
            )}
            {modal?.type === 'edit' && (
                <EditUserModal
                    open
                    user={modal.user}
                    onUpdate={handleUpdateSubmit}
                    onClose={handleClose}
                    onDelete={() => console.log('delete', modal.user)}
                />
            )}
        </section>
    )
}
