import { useState } from 'react'
import { useAppDispatch } from '@/store'
import {
    CreateUserModal,
    EditUserModal,
    UsersFooter,
    UsersTable,
    UsersToolbar,
} from './components'
import { deleteUser } from './store'
import { useUsersPage } from './hooks'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    const {
        filters,
        pageSize,
        usersList,
        total,
        loading,
        modal,
        handleEdit,
        handleCreateSubmit,
        handleUpdateSubmit,
    } = useUsersPage()

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleDeleteClick = () => {
        if (!isSelectionMode) {
            setIsSelectionMode(true)
            return
        }

        if (selectedIds.length === 0) return

        selectedIds.forEach((id) => {
            dispatch(deleteUser({ id }))
        })

        setSelectedIds([])
        setIsSelectionMode(false)
    }

    const handleToggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id],
        )
    }

    return (
        <section className={styles.users}>
            <UsersToolbar
                search={filters.search}
                onSearchChange={filters.handleSearchChange}
                onCreate={modal.openCreate}
                onDelete={handleDeleteClick}
            />
            <UsersTable
                users={usersList}
                loading={loading}
                onEdit={handleEdit}
                selectedIds={selectedIds}
                isSelectionMode={isSelectionMode}
                onToggleSelect={handleToggleSelect}
            />
            <UsersFooter
                page={filters.page}
                pageSize={pageSize}
                total={total}
                onPageChange={filters.setPage}
            />
            {modal.isCreateOpen && (
                <CreateUserModal
                    open
                    onCreate={handleCreateSubmit}
                    onClose={modal.close}
                />
            )}
            {modal.isEditOpen && modal.editingUser && (
                <EditUserModal
                    open
                    user={modal.editingUser}
                    onUpdate={handleUpdateSubmit}
                    onClose={modal.close}
                    onDelete={() => console.log('delete', modal.editingUser)}
                />
            )}
        </section>
    )
}
