import { useState } from 'react'

type UseDataSelectionProps<T> = {
    items: T[]
    getId: (item: T) => number
    onDelete?: (ids: number[]) => Promise<void>
}

export const useDataSelection = <T>({
    items,
    getId,
    onDelete,
}: UseDataSelectionProps<T>) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const isSelected = (id: number) => selectedIds.includes(id)

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id],
        )
    }

    const toggleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(items.map(getId))
        }
    }

    const handleDelete = async () => {
        if (!onDelete || selectedIds.length === 0) return

        try {
            await onDelete(selectedIds)

            setSelectedIds([])
        } catch {
            return
        }
    }

    const allSelected = items.length > 0 && selectedIds.length === items.length

    const hasSelection = selectedIds.length > 0

    return {
        selectedIds,
        isSelected,
        toggleSelect,
        toggleSelectAll,
        handleDelete,
        allSelected,
        hasSelection,
    }
}
