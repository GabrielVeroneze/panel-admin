import { beforeEach, describe, expect, test, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { ProductsPage } from '@/features/products'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/utils', async () => {
    const actual =
        await vi.importActual<typeof import('@/shared/utils')>('@/shared/utils')

    return {
        ...actual,
        toFormData: vi.fn((data: Record<string, unknown>) => {
            const formData = new FormData()

            Object.entries(data).forEach(([key, value]) => {
                if (value === undefined || value === null) {
                    return
                }

                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        if (item instanceof File) {
                            formData.append(key, item.name)
                        } else {
                            formData.append(key, String(item))
                        }
                    })
                    return
                }

                if (value instanceof File) {
                    formData.append(key, value.name)
                    return
                }

                formData.append(key, String(value))
            })

            return formData
        }),
    }
})

const productsResponse = {
    list: [
        {
            id: 1,
            name: 'iPhone 15',
            category: 'Smartphones',
            brand: 'Apple',
            price: 999.99,
            description: 'Premium smartphone.',
            images: ['iphone.jpg'],
        },
        {
            id: 2,
            name: 'Galaxy S24',
            category: 'Smartphones',
            brand: 'Samsung',
            price: 899.99,
            description: 'Premium Android smartphone.',
            images: ['galaxy.jpg'],
        },
    ],
    total: 2,
    page: 1,
    pageSize: 15,
}

describe('Products API errors integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('renders the empty state when loading products fails', async () => {
        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to fetch products',
                    },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('No products')).toBeInTheDocument()

        expect(
            screen.getByText('There are no products to display.'),
        ).toBeInTheDocument()

        expect(store.getState().products.data).toBeNull()
        expect(store.getState().products.loading).toBe(false)
    })

    test('does not add the product when the create request fails', async () => {
        const user = userEvent.setup()

        const file = new File(['image'], 'product.png', {
            type: 'image/png',
        })

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.post('/api/products', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to create product',
                    },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', {
                name: /add product/i,
            }),
        )

        expect(
            await screen.findByRole('heading', {
                name: /create product/i,
            }),
        ).toBeInTheDocument()

        await user.type(
            screen.getByPlaceholderText('Enter product name'),
            'MacBook Pro',
        )

        await user.type(
            screen.getByPlaceholderText('Enter category'),
            'Laptops',
        )

        await user.type(screen.getByPlaceholderText('Enter brand'), 'Apple')

        await user.type(
            screen.getByPlaceholderText('Enter product details'),
            'Professional laptop with advanced features.',
        )

        const priceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(priceInput)
        await user.type(priceInput, '1999.99')

        const fileInput = screen.getByLabelText('File upload')

        await user.upload(fileInput, file)

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        await waitFor(() => {
            expect(store.getState().products.data?.list).toEqual(
                productsResponse.list,
            )
        })

        expect(store.getState().products.data?.total).toBe(2)

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()
        expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
        expect(screen.queryByText('MacBook Pro')).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: /create product/i,
            }),
        ).not.toBeInTheDocument()
    })

    test('does not update the product when the update request fails', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.put('/api/products/1', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to update product',
                    },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const editButtons = screen.getAllByRole('button', {
            name: /edit item/i,
        })

        await user.click(editButtons[0])

        expect(
            await screen.findByRole('heading', {
                name: /edit product/i,
            }),
        ).toBeInTheDocument()

        const nameInput = screen.getByPlaceholderText('Enter product name')

        await user.clear(nameInput)
        await user.type(nameInput, 'iPhone 15 Pro')

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        await waitFor(() => {
            expect(store.getState().products.data?.list).toEqual(
                productsResponse.list,
            )
        })

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()

        expect(screen.queryByText('iPhone 15 Pro')).not.toBeInTheDocument()

        expect(store.getState().products.data?.total).toBe(2)

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()
    })

    test('does not remove the product when the delete request fails', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.delete('/api/products/1', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to delete product',
                    },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const editButtons = screen.getAllByRole('button', {
            name: /edit item/i,
        })

        await user.click(editButtons[0])

        expect(
            await screen.findByRole('heading', {
                name: /edit product/i,
            }),
        ).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', {
                name: /delete product/i,
            }),
        )

        await waitFor(() => {
            expect(store.getState().products.data?.list).toEqual(
                productsResponse.list,
            )
        })

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()

        expect(screen.getByText('Galaxy S24')).toBeInTheDocument()

        expect(store.getState().products.data?.total).toBe(2)

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()
    })

    test('does not remove selected products when the bulk delete request fails', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.delete('/api/products', async ({ request }) => {
                const body = (await request.json()) as {
                    ids: number[]
                }

                expect(body).toEqual({
                    ids: [1, 2],
                })

                return HttpResponse.json(
                    {
                        message: 'Unable to delete products',
                    },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const checkboxes = screen.getAllByRole('checkbox')

        await user.click(checkboxes[1])
        await user.click(checkboxes[2])

        const deleteButton = screen.getByRole('button', {
            name: /delete selected users/i,
        })

        expect(deleteButton).toBeEnabled()

        await user.click(deleteButton)

        await waitFor(() => {
            expect(store.getState().products.data?.list).toEqual(
                productsResponse.list,
            )
        })

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()

        expect(screen.getByText('Galaxy S24')).toBeInTheDocument()

        expect(store.getState().products.data?.total).toBe(2)

        expect(deleteButton).toBeDisabled()
    })
})
