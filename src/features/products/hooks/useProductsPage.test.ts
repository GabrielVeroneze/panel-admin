import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { createProduct, deleteProduct, updateProduct } from '../store'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useProducts } from '../hooks'
import { useProductsPage } from './useProductsPage'
import type {
    CreateProductFormValues,
    UpdateProductFormValues,
} from '../schemas'
import type { Product, ProductListItem } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('@/shared/hooks', () => ({
    useFormModal: vi.fn(),
    usePaginationFilters: vi.fn(),
}))

vi.mock('../hooks', () => ({
    useProducts: vi.fn(),
}))

vi.mock('../store', () => ({
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
}))

vi.mock('../mappers', () => ({
    mapFormToCreatePayload: vi.fn(),
    mapFormToUpdatePayload: vi.fn(),
}))

const mockDispatch = vi.fn()

const product: Product = {
    id: 1,
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 100,
    description: 'Description',
    images: ['image.jpg'],
}

const secondProduct: Product = {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    brand: 'Brand 2',
    price: 200,
    description: 'Description 2',
    images: ['image-2.jpg'],
}

const productsList: ProductListItem[] = [
    {
        id: 1,
        name: 'Product',
        category: 'Category',
        brand: 'Brand',
        price: '$100',
        image: 'image.jpg',
    },
]

const filtersMock = {
    page: 1,
    search: '',
    setPage: vi.fn(),
    handleSearchChange: vi.fn(),
}

const modalMock = {
    modal: null,
    isCreateOpen: false,
    isEditOpen: false,
    editingItem: null,
    openCreate: vi.fn(),
    openEdit: vi.fn(),
    close: vi.fn(),
}

const createValues: CreateProductFormValues = {
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 100,
    details: 'Description',
    images: [],
}

const updateValues: UpdateProductFormValues = {
    name: 'Updated',
    category: 'Category',
    brand: 'Brand',
    price: 200,
    details: 'Updated description',
    images: [],
}

beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

    vi.mocked(usePaginationFilters).mockReturnValue(filtersMock)

    vi.mocked(useFormModal).mockReturnValue(modalMock)

    vi.mocked(useProducts).mockReturnValue({
        products: [product, secondProduct],
        productsList,
        total: 2,
        loading: false,
        page: 1,
        pageSize: 15,
    })
})

describe('useProductsPage', () => {
    it('returns products data', () => {
        const { result } = renderHook(() => useProductsPage())

        expect(result.current.productsList).toEqual(productsList)
        expect(result.current.total).toBe(2)
        expect(result.current.loading).toBe(false)
    })

    it('returns filters', () => {
        const { result } = renderHook(() => useProductsPage())

        expect(result.current.filters).toBe(filtersMock)
    })

    it('returns modal', () => {
        const { result } = renderHook(() => useProductsPage())

        expect(result.current.modal).toBe(modalMock)
    })

    it('uses page size 15', () => {
        const { result } = renderHook(() => useProductsPage())

        expect(result.current.pageSize).toBe(15)
    })

    it('calls useProducts with filters values', () => {
        renderHook(() => useProductsPage())

        expect(useProducts).toHaveBeenCalledWith(1, 15, '')
    })

    it('opens edit modal when product exists', () => {
        const { result } = renderHook(() => useProductsPage())

        act(() => {
            result.current.handleEdit(1)
        })

        expect(modalMock.openEdit).toHaveBeenCalledWith(product)
    })

    it('does not open edit modal when product does not exist', () => {
        const { result } = renderHook(() => useProductsPage())

        act(() => {
            result.current.handleEdit(999)
        })

        expect(modalMock.openEdit).not.toHaveBeenCalled()
    })

    it('creates a product', async () => {
        const payload = {
            name: 'Product',
        }

        const action = {
            type: 'products/createProduct',
        }

        vi.mocked(mapFormToCreatePayload).mockReturnValue(payload as never)

        vi.mocked(createProduct).mockReturnValue(action as never)

        mockDispatch.mockResolvedValue(undefined)

        const { result } = renderHook(() => useProductsPage())

        await act(async () => {
            await result.current.handleCreateSubmit(createValues)
        })

        expect(mapFormToCreatePayload).toHaveBeenCalledWith(createValues)

        expect(createProduct).toHaveBeenCalledWith({
            payload,
        })

        expect(mockDispatch).toHaveBeenCalledWith(action)

        expect(modalMock.close).toHaveBeenCalledTimes(1)
    })

    it('updates a product', async () => {
        const payload = {
            name: 'Updated',
        }

        const action = {
            type: 'products/updateProduct',
        }

        vi.mocked(useFormModal).mockReturnValue({
            ...modalMock,
            editingItem: product,
        })

        vi.mocked(mapFormToUpdatePayload).mockReturnValue(payload as never)

        vi.mocked(updateProduct).mockReturnValue(action as never)

        mockDispatch.mockResolvedValue(undefined)

        const { result } = renderHook(() => useProductsPage())

        await act(async () => {
            await result.current.handleUpdateSubmit(updateValues)
        })

        expect(mapFormToUpdatePayload).toHaveBeenCalledWith(updateValues)

        expect(updateProduct).toHaveBeenCalledWith({
            id: 1,
            payload,
        })

        expect(mockDispatch).toHaveBeenCalledWith(action)

        expect(modalMock.close).toHaveBeenCalled()
    })

    it('does not update when there is no editing item', async () => {
        const { result } = renderHook(() => useProductsPage())

        await act(async () => {
            await result.current.handleUpdateSubmit(updateValues)
        })

        expect(updateProduct).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
    })

    it('deletes a product', async () => {
        const action = {
            type: 'products/deleteProduct',
        }

        vi.mocked(useFormModal).mockReturnValue({
            ...modalMock,
            editingItem: product,
        })

        vi.mocked(deleteProduct).mockReturnValue(action as never)

        mockDispatch.mockResolvedValue(undefined)

        const { result } = renderHook(() => useProductsPage())

        await act(async () => {
            await result.current.handleDeleteProduct()
        })

        expect(deleteProduct).toHaveBeenCalledWith({
            id: 1,
        })

        expect(mockDispatch).toHaveBeenCalledWith(action)

        expect(modalMock.close).toHaveBeenCalled()
    })

    it('does not delete when there is no editing item', async () => {
        const { result } = renderHook(() => useProductsPage())

        await act(async () => {
            await result.current.handleDeleteProduct()
        })

        expect(deleteProduct).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
