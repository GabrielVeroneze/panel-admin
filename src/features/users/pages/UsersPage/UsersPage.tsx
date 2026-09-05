import { useAppDispatch } from '@/store'
import { useDataSelection } from '@/shared/hooks'
import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import {
    CreateUserModal,
    EditUserModal,
    UsersFooterInfo,
    UsersTable,
} from '@/features/users/components'
import { deleteUsers } from '@/features/users/store'
import { useUsersPage } from '@/features/users/hooks'
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
        handleDeleteUser,
    } = useUsersPage()

    const {
        isSelected,
        toggleSelect,
        toggleSelectAll,
        handleDelete,
        allSelected,
        hasSelection,
    } = useDataSelection({
        items: usersList,
        getId: (user) => user.id,
        onDelete: (ids) => dispatch(deleteUsers({ ids })),
    })

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={filters.search}
                searchPlaceholder="Search for users"
                createLabel="Add User"
                hasSelection={hasSelection}
                onSearchChange={filters.handleSearchChange}
                onCreate={modal.openCreate}
                onDelete={handleDelete}
            />
            <UsersTable
                users={usersList}
                loading={loading}
                onEdit={handleEdit}
                isSelected={isSelected}
                onToggleSelect={toggleSelect}
                onToggleSelectAll={toggleSelectAll}
                allSelected={allSelected}
            />
            <DataTableFooter
                label="users"
                page={filters.page}
                pageSize={pageSize}
                total={total}
                onPageChange={filters.setPage}
                info={<UsersFooterInfo />}
            />
            {modal.isCreateOpen && (
                <CreateUserModal
                    open
                    onCreate={handleCreateSubmit}
                    onClose={modal.close}
                />
            )}
            {modal.isEditOpen && modal.editingItem && (
                <EditUserModal
                    open
                    user={modal.editingItem}
                    onUpdate={handleUpdateSubmit}
                    onDelete={handleDeleteUser}
                    onClose={modal.close}
                />
            )}
        </section>
    )
}
