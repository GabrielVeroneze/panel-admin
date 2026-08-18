import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { usePaginationFilters } from './usePaginationFilters'

describe('usePaginationFilters', () => {
    describe('initial state', () => {
        it('starts on the first page with an empty search', () => {
            const { result } = renderHook(() => usePaginationFilters())

            expect(result.current.page).toBe(1)
            expect(result.current.search).toBe('')
        })
    })

    describe('setPage', () => {
        it('changes the current page', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.setPage(3)
            })

            expect(result.current.page).toBe(3)
        })

        it('allows changing the page multiple times', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.setPage(2)
            })

            expect(result.current.page).toBe(2)

            act(() => {
                result.current.setPage(5)
            })

            expect(result.current.page).toBe(5)
        })
    })

    describe('handleSearchChange', () => {
        it('updates the search value', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.handleSearchChange('john')
            })

            expect(result.current.search).toBe('john')
        })

        it('resets the page to the first page when the search changes', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.setPage(3)
            })

            expect(result.current.page).toBe(3)

            act(() => {
                result.current.handleSearchChange('john')
            })

            expect(result.current.search).toBe('john')
            expect(result.current.page).toBe(1)
        })

        it('resets the page even when the search becomes empty', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.setPage(4)
            })

            act(() => {
                result.current.handleSearchChange('john')
            })

            expect(result.current.page).toBe(1)
            expect(result.current.search).toBe('john')

            act(() => {
                result.current.handleSearchChange('')
            })

            expect(result.current.page).toBe(1)
            expect(result.current.search).toBe('')
        })

        it('updates the search value multiple times', () => {
            const { result } = renderHook(() => usePaginationFilters())

            act(() => {
                result.current.handleSearchChange('john')
            })

            expect(result.current.search).toBe('john')

            act(() => {
                result.current.handleSearchChange('john doe')
            })

            expect(result.current.search).toBe('john doe')
            expect(result.current.page).toBe(1)
        })
    })
})
