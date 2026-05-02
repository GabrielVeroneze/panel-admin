import { useState } from 'react'

type CreateState = {
    type: 'create'
}

type EditState<T> = {
    type: 'edit'
    item: T
}

type ModalState<T> = CreateState | EditState<T> | null

export const useFormModal = <T>() => {
    const [modal, setModal] = useState<ModalState<T>>(null)

    const openCreate = () => {
        setModal({ type: 'create' })
    }

    const openEdit = (item: T) => {
        setModal({ type: 'edit', item })
    }

    const close = () => {
        setModal(null)
    }

    const isCreateOpen = modal?.type === 'create'
    const isEditOpen = modal?.type === 'edit'
    const editingItem = modal?.type === 'edit' ? modal.item : null

    return {
        modal,
        isCreateOpen,
        isEditOpen,
        editingItem,
        openCreate,
        openEdit,
        close,
    }
}
