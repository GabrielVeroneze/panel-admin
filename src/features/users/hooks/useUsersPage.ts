import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { Toast } from '@/shared/lib'
import { createUser, deleteUser, deleteUsers, updateUser } from '../store'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useUsers } from '../hooks'
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas'
import type { User } from '../types'

export const useUsersPage = () => {
    const dispatch = useAppDispatch()
    const filters = usePaginationFilters()
    const modal = useFormModal<User>()

    const pageSize = 15

    const {
        users,
        usersList,
        total,
        loading,
        createLoading,
        createError,
        updateLoading,
        updateError,
        deleteUserLoading,
        deleteUserError,
        deleteUsersLoading,
        deleteUsersError,
    } = useUsers(filters.page, pageSize, filters.search)

    const handleEdit = (userId: number) => {
        const user = users.find((user) => user.id === userId)
        if (!user) return

        modal.openEdit(user)
    }

    const handleCreateSubmit = async (data: CreateUserFormValues) => {
        try {
            await dispatch(
                createUser({
                    payload: mapFormToCreatePayload(data),
                }),
            ).unwrap()

            Toast.success('User created successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleUpdateSubmit = async (data: UpdateUserFormValues) => {
        if (!modal.editingItem) return

        try {
            await dispatch(
                updateUser({
                    id: modal.editingItem.id,
                    payload: mapFormToUpdatePayload(data),
                }),
            ).unwrap()

            Toast.success('User updated successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleDeleteUser = async () => {
        if (!modal.editingItem) return

        try {
            await dispatch(
                deleteUser({
                    id: modal.editingItem.id,
                }),
            ).unwrap()

            Toast.success('User deleted successfully')
            modal.close()
        } catch {
            return
        }
    }

    const handleDeleteUsers = async (ids: number[]) => {
        try {
            await dispatch(
                deleteUsers({
                    ids,
                }),
            ).unwrap()

            Toast.success(
                ids.length === 1
                    ? 'User deleted successfully'
                    : 'Users deleted successfully',
            )
        } catch (error) {
            Toast.error(
                typeof error === 'string'
                    ? error
                    : 'Unable to delete selected users. Please try again.',
            )

            throw error
        }
    }

    return {
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
        deleteUsersError,
    }
}
