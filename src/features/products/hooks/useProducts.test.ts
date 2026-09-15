import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useProducts } from './useProducts'
import { fetchProducts, selectProductsList } from '../store'
import { useAppDispatch, useAppSelector } from '@/store'
import type { Product, ProductListItem } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchProducts: vi.fn(),
    selectProductsList: vi.fn(),
}))

const mockDispatch = vi.fn()

const products: Product[] = [
    {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        brand: 'Brand 1',
        price: 100,
        description: 'Product description 1',
        images: ['image-1.jpg'],
    },
    {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        brand: 'Brand 2',
        price: 200,
        description: 'Product description 2',
        images: ['image-2.jpg'],
    },
]

const productsList: ProductListItem[] = [
    {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        brand: 'Brand 1',
        price: '$100.00',
        image: 'image-1.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        category: 'Category 2',
        brand: 'Brand 2',
        price: '$200.00',
        image: 'image-2.jpg',
    },
]

const mockProductsState = (
    data: {
        list: Product[]
        total: number
        page: number
        pageSize: number
    } | null,
    loading = false,
) => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
        if (selector === selectProductsList) {
            return productsList as never
        }

        return {
            data,
            loading,
        } as never
    })
}

describe('useProducts', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
        vi.mocked(fetchProducts).mockReturnValue({
            type: 'products/fetchProducts',
        } as never)
    })

    it('returns products data from the store', () => {
        mockProductsState({
            list: products,
            total: 2,
            page: 1,
            pageSize: 10,
        })

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.products).toEqual(products)
        expect(result.current.productsList).toEqual(productsList)
        expect(result.current.total).toBe(2)
        expect(result.current.page).toBe(1)
        expect(result.current.pageSize).toBe(10)
        expect(result.current.loading).toBe(false)
    })

    it('returns the loading state from the store', () => {
        mockProductsState(null, true)

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.loading).toBe(true)
    })

    it('returns an empty products list when data is null', () => {
        mockProductsState(null)

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.products).toEqual([])
    })

    it('returns zero total when data is null', () => {
        mockProductsState(null)

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.total).toBe(0)
    })

    it('uses the requested page when data is null', () => {
        mockProductsState(null)

        const { result } = renderHook(() => useProducts(3, 20))

        expect(result.current.page).toBe(3)
    })

    it('uses the requested page size when data is null', () => {
        mockProductsState(null)

        const { result } = renderHook(() => useProducts(3, 20))

        expect(result.current.pageSize).toBe(20)
    })

    it('uses pagination data from the store when available', () => {
        mockProductsState({
            list: products,
            total: 50,
            page: 4,
            pageSize: 15,
        })

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.total).toBe(50)
        expect(result.current.page).toBe(4)
        expect(result.current.pageSize).toBe(15)
    })

    it('returns the productsList provided by the selector', () => {
        mockProductsState({
            list: products,
            total: 2,
            page: 1,
            pageSize: 10,
        })

        const { result } = renderHook(() => useProducts(1, 10))

        expect(result.current.productsList).toEqual(productsList)
    })

    it('dispatches fetchProducts with pagination and search parameters on mount', () => {
        const action = {
            type: 'products/fetchProducts',
        }

        mockProductsState(null)

        vi.mocked(fetchProducts).mockReturnValue(action as never)

        renderHook(() => useProducts(2, 15, 'phone'))

        expect(fetchProducts).toHaveBeenCalledTimes(1)
        expect(fetchProducts).toHaveBeenCalledWith({
            page: 2,
            pageSize: 15,
            search: 'phone',
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('dispatches fetchProducts with undefined search when search is omitted', () => {
        const action = {
            type: 'products/fetchProducts',
        }

        mockProductsState(null)

        vi.mocked(fetchProducts).mockReturnValue(action as never)

        renderHook(() => useProducts(1, 15))

        expect(fetchProducts).toHaveBeenCalledWith({
            page: 1,
            pageSize: 15,
            search: undefined,
        })

        expect(mockDispatch).toHaveBeenCalledWith(action)
    })

    it('fetches products again when page changes', () => {
        mockProductsState(null)

        const { rerender } = renderHook(
            ({ page, pageSize, search }) => useProducts(page, pageSize, search),
            {
                initialProps: {
                    page: 1,
                    pageSize: 15,
                    search: '',
                },
            },
        )

        expect(fetchProducts).toHaveBeenCalledTimes(1)

        rerender({
            page: 2,
            pageSize: 15,
            search: '',
        })

        expect(fetchProducts).toHaveBeenCalledTimes(2)
        expect(fetchProducts).toHaveBeenLastCalledWith({
            page: 2,
            pageSize: 15,
            search: '',
        })
    })

    it('fetches products again when page size changes', () => {
        mockProductsState(null)

        const { rerender } = renderHook(
            ({ page, pageSize, search }) => useProducts(page, pageSize, search),
            {
                initialProps: {
                    page: 1,
                    pageSize: 10,
                    search: '',
                },
            },
        )

        expect(fetchProducts).toHaveBeenCalledTimes(1)

        rerender({
            page: 1,
            pageSize: 20,
            search: '',
        })

        expect(fetchProducts).toHaveBeenCalledTimes(2)
        expect(fetchProducts).toHaveBeenLastCalledWith({
            page: 1,
            pageSize: 20,
            search: '',
        })
    })

    it('fetches products again when search changes', () => {
        mockProductsState(null)

        const { rerender } = renderHook(
            ({ page, pageSize, search }) => useProducts(page, pageSize, search),
            {
                initialProps: {
                    page: 1,
                    pageSize: 15,
                    search: 'phone',
                },
            },
        )

        expect(fetchProducts).toHaveBeenCalledTimes(1)

        rerender({
            page: 1,
            pageSize: 15,
            search: 'laptop',
        })

        expect(fetchProducts).toHaveBeenCalledTimes(2)
        expect(fetchProducts).toHaveBeenLastCalledWith({
            page: 1,
            pageSize: 15,
            search: 'laptop',
        })
    })

    it('does not fetch products again when parameters do not change', () => {
        mockProductsState(null)

        const { rerender } = renderHook(
            ({ page, pageSize, search }) => useProducts(page, pageSize, search),
            {
                initialProps: {
                    page: 1,
                    pageSize: 15,
                    search: 'phone',
                },
            },
        )

        rerender({
            page: 1,
            pageSize: 15,
            search: 'phone',
        })

        expect(fetchProducts).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
})
