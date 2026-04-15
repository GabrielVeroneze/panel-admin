import { useState } from 'react'
import type { User } from '../types'

type CreateModalState = {
    type: 'create'
}

type EditModalState = {
    type: 'edit'
    user: User
}

type ModalState = CreateModalState | EditModalState | null

export const useUsersModal = () => {
    const [modal, setModal] = useState<ModalState>(null)

    const openCreate = () => {
        setModal({ type: 'create' })
    }

    const openEdit = (user: User) => {
        setModal({ type: 'edit', user: user })
    }

    const close = () => {
        setModal(null)
    }

    const isCreateOpen = modal?.type === 'create'
    const isEditOpen = modal?.type === 'edit'
    const editingUser = modal?.type === 'edit' ? modal.user : null

    return {
        modal,
        isCreateOpen,
        isEditOpen,
        editingUser,
        openCreate,
        openEdit,
        close,
    }
}
