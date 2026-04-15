import {
    CreateUserModal,
    EditUserModal,
    UsersFooter,
    UsersTable,
    UsersToolbar,
} from './components'
import { useUsersPage } from './hooks'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    const {
        page,
        pageSize,
        search,
        usersList,
        total,
        loading,
        modal,
        setPage,
        handleSearchChange,
        handleEdit,
        handleCreateSubmit,
        handleUpdateSubmit,
    } = useUsersPage()

    return (
        <section className={styles.users}>
            <UsersToolbar
                search={search}
                onSearchChange={handleSearchChange}
                onCreate={modal.openCreate}
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
