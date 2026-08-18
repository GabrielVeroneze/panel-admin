import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDataSelection } from './useDataSelection'

type Item = {
    id: number
    name: string
}

const items: Item[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
]

describe('useDataSelection', () => {
    describe('initial state', () => {
        it('starts with no selected items', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            expect(result.current.selectedIds).toEqual([])
            expect(result.current.hasSelection).toBe(false)
            expect(result.current.allSelected).toBe(false)
        })

        it('returns false from isSelected for an unselected item', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            expect(result.current.isSelected(1)).toBe(false)
        })
    })

    describe('toggleSelect', () => {
        it('selects an item', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(2)
            })

            expect(result.current.selectedIds).toEqual([2])
            expect(result.current.hasSelection).toBe(true)
            expect(result.current.isSelected(2)).toBe(true)
        })

        it('selects multiple items', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
                result.current.toggleSelect(3)
            })

            expect(result.current.selectedIds).toEqual([1, 3])
            expect(result.current.isSelected(1)).toBe(true)
            expect(result.current.isSelected(2)).toBe(false)
            expect(result.current.isSelected(3)).toBe(true)
        })

        it('deselects an already selected item', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(2)
            })

            act(() => {
                result.current.toggleSelect(2)
            })

            expect(result.current.selectedIds).toEqual([])
            expect(result.current.isSelected(2)).toBe(false)
            expect(result.current.hasSelection).toBe(false)
        })
    })

    describe('toggleSelectAll', () => {
        it('selects all items when not all items are selected', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelectAll()
            })

            expect(result.current.selectedIds).toEqual([1, 2, 3])

            expect(result.current.allSelected).toBe(true)
            expect(result.current.hasSelection).toBe(true)
        })

        it('selects all items using getId', () => {
            const customItems = [
                { value: 10, name: 'Item 10' },
                { value: 20, name: 'Item 20' },
            ]

            const { result } = renderHook(() =>
                useDataSelection({
                    items: customItems,
                    getId: (item) => item.value,
                }),
            )

            act(() => {
                result.current.toggleSelectAll()
            })

            expect(result.current.selectedIds).toEqual([10, 20])
        })

        it('clears all items when all items are already selected', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelectAll()
            })

            expect(result.current.allSelected).toBe(true)

            act(() => {
                result.current.toggleSelectAll()
            })

            expect(result.current.selectedIds).toEqual([])
            expect(result.current.allSelected).toBe(false)
            expect(result.current.hasSelection).toBe(false)
        })

        it('selects all remaining items when only some are selected', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
            })

            expect(result.current.selectedIds).toEqual([1])

            act(() => {
                result.current.toggleSelectAll()
            })

            expect(result.current.selectedIds).toEqual([1, 2, 3])

            expect(result.current.allSelected).toBe(true)
        })
    })

    describe('selection state', () => {
        it('sets hasSelection to true when at least one item is selected', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
            })

            expect(result.current.hasSelection).toBe(true)
        })

        it('sets allSelected to false when only some items are selected', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
            })

            expect(result.current.allSelected).toBe(false)
        })

        it('returns allSelected as false when there are no items', () => {
            const emptyItems: Item[] = []

            const { result } = renderHook(() =>
                useDataSelection({
                    items: emptyItems,
                    getId: (item) => item.id,
                }),
            )

            expect(result.current.allSelected).toBe(false)
            expect(result.current.hasSelection).toBe(false)
        })
    })

    describe('handleDelete', () => {
        it('calls onDelete with the selected ids', () => {
            const handleDelete = vi.fn()

            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                    onDelete: handleDelete,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
                result.current.toggleSelect(3)
            })

            act(() => {
                result.current.handleDelete()
            })

            expect(handleDelete).toHaveBeenCalledTimes(1)
            expect(handleDelete).toHaveBeenCalledWith([1, 3])
        })

        it('clears the selection after deleting', () => {
            const handleDelete = vi.fn()

            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                    onDelete: handleDelete,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
                result.current.toggleSelect(2)
            })

            act(() => {
                result.current.handleDelete()
            })

            expect(result.current.selectedIds).toEqual([])
            expect(result.current.hasSelection).toBe(false)
            expect(result.current.allSelected).toBe(false)
        })

        it('does not call onDelete when there are no selected items', () => {
            const handleDelete = vi.fn()

            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                    onDelete: handleDelete,
                }),
            )

            act(() => {
                result.current.handleDelete()
            })

            expect(handleDelete).not.toHaveBeenCalled()
        })

        it('does nothing when onDelete is not provided', () => {
            const { result } = renderHook(() =>
                useDataSelection({
                    items,
                    getId: (item) => item.id,
                }),
            )

            act(() => {
                result.current.toggleSelect(1)
            })

            act(() => {
                result.current.handleDelete()
            })

            expect(result.current.selectedIds).toEqual([1])
            expect(result.current.hasSelection).toBe(true)
        })
    })
})
