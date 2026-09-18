import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ProductsPage } from './ProductsPage'
import { useAppDispatch } from '@/store'
import { useProductsPage } from '@/features/products/hooks'
import { deleteProducts } from '@/features/products/store'
import type { Product, ProductListItem } from '@/features/products/types'

vi.mock('@/features/products/hooks', () => ({
    useProductsPage: vi.fn(),
}))

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('@/features/products/store', () => ({
    deleteProducts: vi.fn((payload: { ids: number[] }) => ({
        type: 'products/deleteProducts',
        payload,
    })),
}))

vi.mock('@/shared/components', async () => {
    const actual = await vi.importActual<typeof import('@/shared/components')>(
        '@/shared/components',
    )

    return {
        ...actual,

        DataTableFooter: ({
            label,
            page,
            pageSize,
            total,
            onPageChange,
        }: {
            label: string
            page: number
            pageSize: number
            total: number
            onPageChange: (page: number) => void
        }) => (
            <div data-testid="data-table-footer">
                <span data-testid="footer-label">{label}</span>
                <span data-testid="footer-page">{page}</span>
                <span data-testid="footer-page-size">{pageSize}</span>
                <span data-testid="footer-total">{total}</span>
                <button type="button" onClick={() => onPageChange(page + 1)}>
                    Next page
                </button>
            </div>
        ),
    }
})

vi.mock('@/features/products/components', async () => {
    const actual = await vi.importActual<
        typeof import('@/features/products/components')
    >('@/features/products/components')

    return {
        ...actual,

        CreateProductModal: ({
            open,
            onCreate,
            onClose,
        }: {
            open: boolean
            onCreate: (data: unknown) => void
            onClose: () => void
        }) => {
            if (!open) return null

            return (
                <div data-testid="create-product-modal">
                    <button type="button" onClick={() => onCreate({})}>
                        Create product
                    </button>
                    <button type="button" onClick={onClose}>
                        Close create
                    </button>
                </div>
            )
        },

        EditProductModal: ({
            open,
            product,
            onUpdate,
            onDelete,
            onClose,
        }: {
            open: boolean
            product: Product
            onUpdate: (data: unknown) => void
            onDelete: () => void
            onClose: () => void
        }) => {
            if (!open) return null

            return (
                <div data-testid="edit-product-modal">
                    <span data-testid="editing-product">{product.name}</span>
                    <button type="button" onClick={() => onUpdate({})}>
                        Update product
                    </button>
                    <button type="button" onClick={onDelete}>
                        Delete product
                    </button>
                    <button type="button" onClick={onClose}>
                        Close edit
                    </button>
                </div>
            )
        },
    }
})

type ProductsPageReturn = ReturnType<typeof useProductsPage>
type ProductsPageModal = ProductsPageReturn['modal']

const products: Product[] = [
    {
        id: 1,
        name: 'Product One',
        category: 'Category One',
        brand: 'Brand One',
        price: 100,
        description: 'Product one description',
        images: ['product-one.jpg'],
    },
    {
        id: 2,
        name: 'Product Two',
        category: 'Category Two',
        brand: 'Brand Two',
        price: 200,
        description: 'Product two description',
        images: ['product-two.jpg'],
    },
]

const productsList: ProductListItem[] = [
    {
        id: 1,
        name: 'Product One',
        category: 'Category One',
        brand: 'Brand One',
        price: '$100.00',
        image: 'product-one.jpg',
    },
    {
        id: 2,
        name: 'Product Two',
        category: 'Category Two',
        brand: 'Brand Two',
        price: '$200.00',
        image: 'product-two.jpg',
    },
]

const createModal = (
    overrides: Partial<ProductsPageModal> = {},
): ProductsPageModal => ({
    modal: {} as ProductsPageModal['modal'],
    isCreateOpen: false,
    isEditOpen: false,
    editingItem: null,
    openCreate: vi.fn(),
    openEdit: vi.fn(),
    close: vi.fn(),
    ...overrides,
})

const createFilters = (): ProductsPageReturn['filters'] => ({
    page: 1,
    search: '',
    setPage: vi.fn(),
    handleSearchChange: vi.fn(),
})

const mockUseProductsPage = (overrides: Partial<ProductsPageReturn> = {}) => {
    vi.mocked(useProductsPage).mockReturnValue({
        filters: createFilters(),
        pageSize: 15,
        productsList,
        total: 30,
        loading: false,
        modal: createModal(),
        handleEdit: vi.fn(),
        handleCreateSubmit: vi.fn(),
        handleUpdateSubmit: vi.fn(),
        handleDeleteProduct: vi.fn(),
        ...overrides,
    })
}

describe('ProductsPage', () => {
    const dispatch = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        mockUseProductsPage()
    })

    it('renders the page content', () => {
        render(<ProductsPage />)

        expect(
            screen.getByPlaceholderText('Search for products'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Add Product',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('Product One')).toBeInTheDocument()

        expect(screen.getByText('Product Two')).toBeInTheDocument()
    })

    it('passes the product list and loading state to ProductsTable', () => {
        render(<ProductsPage />)

        expect(screen.getByText('Product One')).toBeInTheDocument()

        expect(screen.getByText('Product Two')).toBeInTheDocument()
    })

    it('passes the pagination data to DataTableFooter', () => {
        const filters = createFilters()

        mockUseProductsPage({
            filters,
            pageSize: 15,
            total: 30,
        })

        render(<ProductsPage />)

        expect(screen.getByTestId('footer-label')).toHaveTextContent('products')

        expect(screen.getByTestId('footer-page')).toHaveTextContent('1')

        expect(screen.getByTestId('footer-page-size')).toHaveTextContent('15')

        expect(screen.getByTestId('footer-total')).toHaveTextContent('30')
    })

    it('passes the search value and handlers to DataTableToolbar', () => {
        const filters = createFilters()

        mockUseProductsPage({
            filters,
        })

        render(<ProductsPage />)

        const searchInput = screen.getByPlaceholderText('Search for products')

        fireEvent.change(searchInput, {
            target: {
                value: 'phone',
            },
        })

        expect(filters.handleSearchChange).toHaveBeenCalledTimes(1)

        expect(filters.handleSearchChange).toHaveBeenCalledWith('phone')
    })

    it('calls modal.openCreate when Add Product is clicked', () => {
        const openCreate = vi.fn()

        mockUseProductsPage({
            modal: createModal({
                openCreate,
            }),
        })

        render(<ProductsPage />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Add Product',
            }),
        )

        expect(openCreate).toHaveBeenCalledTimes(1)
    })

    it('opens the create modal when isCreateOpen is true', () => {
        mockUseProductsPage({
            modal: createModal({
                isCreateOpen: true,
            }),
        })

        render(<ProductsPage />)

        expect(screen.getByTestId('create-product-modal')).toBeInTheDocument()
    })

    it('does not render the create modal when isCreateOpen is false', () => {
        mockUseProductsPage({
            modal: createModal({
                isCreateOpen: false,
            }),
        })

        render(<ProductsPage />)

        expect(
            screen.queryByTestId('create-product-modal'),
        ).not.toBeInTheDocument()
    })

    it('passes the create handlers to CreateProductModal', () => {
        const handleCreateSubmit = vi.fn()
        const close = vi.fn()

        mockUseProductsPage({
            modal: createModal({
                isCreateOpen: true,
                close,
            }),
            handleCreateSubmit,
        })

        render(<ProductsPage />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Create product',
            }),
        )

        expect(handleCreateSubmit).toHaveBeenCalledTimes(1)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Close create',
            }),
        )

        expect(close).toHaveBeenCalledTimes(1)
    })

    it('opens the edit modal when editing is active', () => {
        mockUseProductsPage({
            modal: createModal({
                isEditOpen: true,
                editingItem: products[0],
            }),
        })

        render(<ProductsPage />)

        expect(screen.getByTestId('edit-product-modal')).toBeInTheDocument()

        expect(screen.getByTestId('editing-product')).toHaveTextContent(
            'Product One',
        )
    })

    it('does not render the edit modal when isEditOpen is false', () => {
        mockUseProductsPage({
            modal: createModal({
                isEditOpen: false,
                editingItem: products[0],
            }),
        })

        render(<ProductsPage />)

        expect(
            screen.queryByTestId('edit-product-modal'),
        ).not.toBeInTheDocument()
    })

    it('does not render the edit modal without an editing item', () => {
        mockUseProductsPage({
            modal: createModal({
                isEditOpen: true,
                editingItem: null,
            }),
        })

        render(<ProductsPage />)

        expect(
            screen.queryByTestId('edit-product-modal'),
        ).not.toBeInTheDocument()
    })

    it('passes the edit handlers to EditProductModal', () => {
        const handleUpdateSubmit = vi.fn()
        const handleDeleteProduct = vi.fn()
        const close = vi.fn()

        mockUseProductsPage({
            modal: createModal({
                isEditOpen: true,
                editingItem: products[0],
                close,
            }),
            handleUpdateSubmit,
            handleDeleteProduct,
        })

        render(<ProductsPage />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Update product',
            }),
        )

        expect(handleUpdateSubmit).toHaveBeenCalledTimes(1)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Delete product',
            }),
        )

        expect(handleDeleteProduct).toHaveBeenCalledTimes(1)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Close edit',
            }),
        )

        expect(close).toHaveBeenCalledTimes(1)
    })

    it('passes selection state and handlers to ProductsTable', () => {
        render(<ProductsPage />)

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes).toHaveLength(3)
    })

    it('calls toggleSelect when a product is selected', () => {
        render(<ProductsPage />)

        const checkboxes = screen.getAllByRole('checkbox')

        fireEvent.click(checkboxes[1])

        expect(checkboxes[1]).toBeChecked()
    })

    it('calls toggleSelectAll when select all is clicked', () => {
        render(<ProductsPage />)

        const checkboxes = screen.getAllByRole('checkbox')

        const selectAllCheckbox = checkboxes[0]

        fireEvent.click(selectAllCheckbox)

        expect(checkboxes[1]).toBeChecked()
        expect(checkboxes[2]).toBeChecked()
        expect(selectAllCheckbox).toBeChecked()
    })

    it('calls handleDelete when deleting selected products', () => {
        render(<ProductsPage />)

        const checkboxes = screen.getAllByRole('checkbox')

        fireEvent.click(checkboxes[1])

        const deleteButton = screen.getByRole('button', {
            name: 'Delete selected users',
        })

        fireEvent.click(deleteButton)

        expect(deleteProducts).toHaveBeenCalledWith({
            ids: [1],
        })

        expect(dispatch).toHaveBeenCalledWith({
            type: 'products/deleteProducts',
            payload: {
                ids: [1],
            },
        })
    })

    it('calls handleEdit with the product id when editing a product', () => {
        const handleEdit = vi.fn()

        mockUseProductsPage({
            handleEdit,
        })

        render(<ProductsPage />)

        fireEvent.click(
            screen.getAllByRole('button', {
                name: 'Edit Item',
            })[0],
        )

        expect(handleEdit).toHaveBeenCalledTimes(1)
        expect(handleEdit).toHaveBeenCalledWith(1)
    })

    it('calls setPage when changing the page', () => {
        const filters = createFilters()

        mockUseProductsPage({
            filters,
        })

        render(<ProductsPage />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Next page',
            }),
        )

        expect(filters.setPage).toHaveBeenCalledTimes(1)
        expect(filters.setPage).toHaveBeenCalledWith(2)
    })
})
