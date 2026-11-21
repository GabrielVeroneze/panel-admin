import { useDataSelection } from '@/shared/hooks'
import { DataTableFooter, DataTableToolbar } from '@/shared/components'
import {
    CreateUserModal,
    EditUserModal,
    UsersFooterInfo,
    UsersTable,
} from '@/features/users/components'
import { useUsersPage } from '@/features/users/hooks'
import styles from '@/styles/layouts/page.module.scss'

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
        handleDeleteUser,
        handleDeleteUsers,
        createLoading,
        createError,
        updateLoading,
        updateError,
        deleteUserLoading,
        deleteUserError,
        deleteUsersLoading,
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
        onDelete: handleDeleteUsers,
    })

    return (
        <section className={styles.page}>
            <DataTableToolbar
                search={filters.search}
                searchPlaceholder="Search for users"
                createLabel="Add User"
                hasSelection={hasSelection}
                deleteLoading={deleteUsersLoading}
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
                    loading={createLoading}
                    error={createError}
                    onCreate={handleCreateSubmit}
                    onClose={modal.close}
                />
            )}
            {modal.isEditOpen && modal.editingItem && (
                <EditUserModal
                    open
                    user={modal.editingItem}
                    loading={updateLoading}
                    error={updateError}
                    deleteLoading={deleteUserLoading}
                    deleteError={deleteUserError}
                    onUpdate={handleUpdateSubmit}
                    onDelete={handleDeleteUser}
                    onClose={modal.close}
                />
            )}
        </section>
    )
}
