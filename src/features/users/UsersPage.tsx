import { useAppDispatch } from '@/store'
import { PageToolbar } from '@/shared/components'
import {
    CreateUserModal,
    EditUserModal,
    UsersFooter,
    UsersTable,
} from './components'
import { deleteUsers } from './store'
import { useUsersPage, useUsersSelection } from './hooks'
import styles from '@/styles/layouts/page.module.scss'

export const UsersPage = () => {
    const dispatch = useAppDispatch()

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

    const {
        selectedIds,
        isSelectionMode,
        isSelected,
        toggleSelect,
        toggleSelectAll,
        handleDeleteClick,
    } = useUsersSelection({
        onDeleteUsers: (ids) => {
            dispatch(deleteUsers({ ids }))
        },
    })

    const handleToggleSelectAll = () => {
        toggleSelectAll(usersList.map((u) => u.id))
    }

    return (
        <section className={styles.page}>
            <PageToolbar
                search={filters.search}
                searchPlaceholder="Search for users"
                createLabel="Add User"
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
                isSelected={isSelected}
                onToggleSelect={toggleSelect}
                onToggleSelectAll={handleToggleSelectAll}
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
