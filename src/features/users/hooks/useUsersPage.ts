import { useAppDispatch } from '@/store'
import { createUser, updateUser } from '../store'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useUsers } from '../hooks'
import { useUsersModal } from './useUsersModal'
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas'

export const useUsersPage = () => {
    const dispatch = useAppDispatch()
    const pageSize = 15

    const { users, usersList, total, loading } = useUsers(
        page,
        pageSize,
        search,
    )

    const modal = useUsersModal()

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
        if (!modal.editingUser) return

        await dispatch(
            updateUser({
                id: modal.editingUser.id,
                payload: mapFormToUpdatePayload(data),
            }),
        )

        modal.close()
    }

    return {
        pageSize,
        usersList,
        total,
        loading,
        modal,
        handleEdit,
        handleCreateSubmit,
        handleUpdateSubmit,
    }
}
