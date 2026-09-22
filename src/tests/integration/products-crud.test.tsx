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

const initialProduct = {
    id: 1,
    name: 'iPhone 15',
    category: 'Smartphones',
    brand: 'Apple',
    price: 999.99,
    description: 'Premium smartphone.',
    images: ['iphone.jpg'],
}

const createdProduct = {
    id: 2,
    name: 'MacBook Air',
    category: 'Laptops',
    brand: 'Apple',
    price: 1299.99,
    description: 'Lightweight laptop for everyday use.',
    images: ['macbook.jpg'],
}

const updatedProduct = {
    id: 2,
    name: 'MacBook Air M4',
    category: 'Laptops',
    brand: 'Apple',
    price: 1499.99,
    description: 'Updated lightweight laptop with M4 chip.',
    images: ['macbook-m4.jpg'],
}

const productsResponse = {
    list: [initialProduct],
    total: 1,
    page: 1,
    pageSize: 15,
}

describe('Products CRUD integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('completes the product CRUD flow', async () => {
        const user = userEvent.setup()

        const file = new File(['product-image'], 'macbook-air.png', {
            type: 'image/png',
        })

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),

            http.post('/api/products', async ({ request }) => {
                const formData = await request.formData()

                expect(formData.get('name')).toBe('MacBook Air')
                expect(formData.get('category')).toBe('Laptops')
                expect(formData.get('brand')).toBe('Apple')
                expect(formData.get('price')).toBe('1299.99')
                expect(formData.get('description')).toBe(
                    'Lightweight laptop for everyday use.',
                )

                return HttpResponse.json(createdProduct, {
                    status: 201,
                })
            }),

            http.put('/api/products/2', async ({ request }) => {
                const formData = await request.formData()

                expect(formData.get('name')).toBe('MacBook Air M4')
                expect(formData.get('category')).toBe('Laptops')
                expect(formData.get('brand')).toBe('Apple')
                expect(formData.get('price')).toBe('1499.99')
                expect(formData.get('description')).toBe(
                    'Updated lightweight laptop with M4 chip.',
                )

                return HttpResponse.json(updatedProduct)
            }),

            http.delete('/api/products/2', () => {
                return new HttpResponse(null, {
                    status: 204,
                })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        // LIST
        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        expect(store.getState().products.data?.list).toEqual([initialProduct])

        expect(store.getState().products.data?.total).toBe(1)

        // CREATE
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
            'MacBook Air',
        )

        await user.type(
            screen.getByPlaceholderText('Enter category'),
            'Laptops',
        )

        await user.type(screen.getByPlaceholderText('Enter brand'), 'Apple')

        await user.type(
            screen.getByPlaceholderText('Enter product details'),
            'Lightweight laptop for everyday use.',
        )

        const createPriceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(createPriceInput)
        await user.type(createPriceInput, '1299.99')

        const fileInput = screen.getByLabelText('File upload')

        await user.upload(fileInput, file)

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        expect(await screen.findByText('MacBook Air')).toBeInTheDocument()

        expect(store.getState().products.data?.list).toEqual([
            createdProduct,
            initialProduct,
        ])

        expect(store.getState().products.data?.total).toBe(2)

        expect(
            screen.queryByRole('heading', {
                name: /create product/i,
            }),
        ).not.toBeInTheDocument()

        // UPDATE
        const editButtons = screen.getAllByRole('button', {
            name: /edit item/i,
        })

        await user.click(editButtons[0])

        expect(
            await screen.findByRole('heading', {
                name: /edit product/i,
            }),
        ).toBeInTheDocument()

        const updateNameInput =
            screen.getByPlaceholderText('Enter product name')

        await user.clear(updateNameInput)
        await user.type(updateNameInput, 'MacBook Air M4')

        const updatePriceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(updatePriceInput)
        await user.type(updatePriceInput, '1499.99')

        const detailsInput = screen.getByPlaceholderText(
            'Enter product details',
        )

        await user.clear(detailsInput)
        await user.type(
            detailsInput,
            'Updated lightweight laptop with M4 chip.',
        )

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        expect(await screen.findByText('MacBook Air M4')).toBeInTheDocument()

        expect(screen.queryByText('MacBook Air')).not.toBeInTheDocument()

        expect(store.getState().products.data?.list).toEqual([
            updatedProduct,
            initialProduct,
        ])

        expect(store.getState().products.data?.total).toBe(2)

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()

        // DELETE
        const updatedEditButtons = screen.getAllByRole('button', {
            name: /edit item/i,
        })

        await user.click(updatedEditButtons[0])

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
            expect(store.getState().products.data?.list).toEqual([
                initialProduct,
            ])
        })

        expect(store.getState().products.data?.total).toBe(1)

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()

        expect(screen.queryByText('MacBook Air M4')).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()
    }, 10000)
})
