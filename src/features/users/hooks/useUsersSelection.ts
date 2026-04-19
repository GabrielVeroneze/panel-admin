import { useState } from 'react'
import { useAppDispatch } from '@/store'
import { deleteUser } from '../store'

export const useUsersSelection = () => {
    const dispatch = useAppDispatch()

    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false)

    const isSelected = (id: number) => selectedIds.includes(id)

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id],
        )
    }

    const toggleSelectAll = (ids: number[]) => {
        if (selectedIds.length === ids.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(ids)
        }
    }

    const handleDeleteClick = () => {
        if (!isSelectionMode) {
            setIsSelectionMode(true)
            return
        }

        if (selectedIds.length === 0) return

        selectedIds.forEach((id) => {
            dispatch(deleteUser({ id }))
        })

        setSelectedIds([])
        setIsSelectionMode(false)
    }

    return {
        selectedIds,
        isSelectionMode,
        isSelected,
        toggleSelect,
        toggleSelectAll,
        handleDeleteClick,
    }
}
