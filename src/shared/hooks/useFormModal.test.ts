import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFormModal } from './useFormModal'

type User = {
    id: number
    name: string
}

describe('useFormModal', () => {
    describe('initial state', () => {
        it('starts with the modal closed', () => {
            const { result } = renderHook(() => useFormModal<User>())

            expect(result.current.modal).toBeNull()
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })
    })

    describe('openCreate', () => {
        it('opens the modal in create mode', () => {
            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openCreate()
            })

            expect(result.current.modal).toEqual({
                type: 'create',
            })
            expect(result.current.isCreateOpen).toBe(true)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })

        it('replaces the edit state with the create state', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openEdit(user)
            })

            expect(result.current.isEditOpen).toBe(true)

            act(() => {
                result.current.openCreate()
            })

            expect(result.current.modal).toEqual({
                type: 'create',
            })
            expect(result.current.isCreateOpen).toBe(true)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })
    })

    describe('openEdit', () => {
        it('opens the modal in edit mode', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openEdit(user)
            })

            expect(result.current.modal).toEqual({
                type: 'edit',
                item: user,
            })
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(true)
            expect(result.current.editingItem).toEqual(user)
        })

        it('keeps the reference to the item being edited', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openEdit(user)
            })

            expect(result.current.editingItem).toBe(user)
        })

        it('replaces the create state with the edit state', () => {
            const user: User = {
                id: 2,
                name: 'Jane Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openCreate()
            })

            expect(result.current.isCreateOpen).toBe(true)

            act(() => {
                result.current.openEdit(user)
            })

            expect(result.current.modal).toEqual({
                type: 'edit',
                item: user,
            })
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(true)
            expect(result.current.editingItem).toEqual(user)
        })

        it('updates the editing item when opening another item', () => {
            const firstUser: User = {
                id: 1,
                name: 'John Doe',
            }

            const secondUser: User = {
                id: 2,
                name: 'Jane Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openEdit(firstUser)
            })

            expect(result.current.editingItem).toBe(firstUser)

            act(() => {
                result.current.openEdit(secondUser)
            })

            expect(result.current.modal).toEqual({
                type: 'edit',
                item: secondUser,
            })
            expect(result.current.editingItem).toBe(secondUser)
        })
    })

    describe('close', () => {
        it('closes the modal from create mode', () => {
            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openCreate()
            })

            act(() => {
                result.current.close()
            })

            expect(result.current.modal).toBeNull()
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })

        it('closes the modal from edit mode', () => {
            const user: User = {
                id: 1,
                name: 'John Doe',
            }

            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.openEdit(user)
            })

            act(() => {
                result.current.close()
            })

            expect(result.current.modal).toBeNull()
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })

        it('remains closed when called while already closed', () => {
            const { result } = renderHook(() => useFormModal<User>())

            act(() => {
                result.current.close()
            })

            expect(result.current.modal).toBeNull()
            expect(result.current.isCreateOpen).toBe(false)
            expect(result.current.isEditOpen).toBe(false)
            expect(result.current.editingItem).toBeNull()
        })
    })
})
