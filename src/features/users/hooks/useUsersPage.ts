import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { createUser, deleteUser, updateUser } from '../store'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useUsers } from '../hooks'
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas'
import type { User } from '../types'

export const useUsersPage = () => {
    const dispatch = useAppDispatch()
    const filters = usePaginationFilters()
    const modal = useFormModal<User>()

    const pageSize = 15

    const { users, usersList, total, loading } = useUsers(
        filters.page,
        pageSize,
        filters.search,
    )

    const handleEdit = (userId: number) => {
        const user = users.find((user) => user.id === userId)
        if (!user) return

        modal.openEdit(user)
    }

    const handleCreateSubmit = async (data: CreateUserFormValues) => {
        await dispatch(
            createUser({
                payload: mapFormToCreatePayload(data),
            }),
        )

        modal.close()
    }

    const handleUpdateSubmit = async (data: UpdateUserFormValues) => {
        if (!modal.editingItem) return

        await dispatch(
            updateUser({
                id: modal.editingItem.id,
                payload: mapFormToUpdatePayload(data),
            }),
        )

        modal.close()
    }

    const handleDeleteUser = async () => {
        if (!modal.editingItem) return

        await dispatch(
            deleteUser({
                id: modal.editingItem.id,
            }),
        )

        modal.close()
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
    }
}
