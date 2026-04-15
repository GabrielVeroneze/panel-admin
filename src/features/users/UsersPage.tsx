import {
    CreateUserModal,
    EditUserModal,
    UsersFooter,
    UsersTable,
    UsersToolbar,
} from './components'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
        page,
        pageSize,
        search,

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
