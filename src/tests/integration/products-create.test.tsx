import { beforeEach, describe, expect, test, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { fireEvent, screen, waitFor } from '@testing-library/react'
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
            price: 799.99,
            description: 'Apple smartphone.',
            images: ['iphone-15.jpg'],
        },
    ],
    total: 1,
    page: 1,
    pageSize: 15,
}

const createdProduct = {
    id: 2,
    name: 'Galaxy S24',
    category: 'Smartphones',
    brand: 'Samsung',
    price: 899.99,
    description: 'Premium Android smartphone.',
    images: ['product.jpg'],
}

const createFile = () =>
    new File(['image'], 'product.jpg', {
        type: 'image/jpeg',
    })

describe('Products create integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('creates a product through the form and displays it in the table', async () => {
        const user = userEvent.setup()
        const file = createFile()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.post('/api/products', async () => {
                return HttpResponse.json(createdProduct, {
                    status: 201,
                })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        await screen.findByText('iPhone 15')

        await user.click(
            screen.getByRole('button', {
                name: /add product/i,
            }),
        )

        const nameInput = screen.getByRole('textbox', {
            name: /product name/i,
        })

        const categoryInput = screen.getByRole('textbox', {
            name: /category/i,
        })

        const brandInput = screen.getByRole('textbox', {
            name: /brand/i,
        })

        const priceInput = screen.getByRole('textbox', {
            name: /price/i,
        })

        const detailsInput = screen.getByRole('textbox', {
            name: /details/i,
        })

        const fileInput = document.querySelector(
            'input[type="file"]',
        ) as HTMLInputElement

        await user.type(nameInput, 'Galaxy S24')
        await user.type(categoryInput, 'Smartphones')
        await user.type(brandInput, 'Samsung')
        await user.clear(priceInput)
        await user.type(priceInput, '899.99')
        await user.type(detailsInput, 'Premium Android smartphone.')

        fireEvent.change(fileInput, {
            target: {
                files: [file],
            },
        })

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        expect(await screen.findByText('Galaxy S24')).toBeInTheDocument()
        expect(screen.getByText('Samsung')).toBeInTheDocument()
        expect(screen.getByText('iPhone 15')).toBeInTheDocument()

        await waitFor(() => {
            const state = store.getState().products

            expect(state.loading).toBe(false)
            expect(state.data).not.toBeNull()
            expect(state.data?.list).toHaveLength(2)
            expect(state.data?.total).toBe(2)
            expect(state.data?.list[0]).toEqual(createdProduct)
            expect(state.data?.list[1]).toEqual(productsResponse.list[0])
        })
    })

    test('sends the product data to the API when creating a product', async () => {
        const user = userEvent.setup()
        const file = createFile()

        let requestBody: FormData | undefined

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.post('/api/products', async ({ request }) => {
                requestBody = await request.formData()

                return HttpResponse.json(createdProduct, {
                    status: 201,
                })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        await screen.findByText('iPhone 15')

        await user.click(
            screen.getByRole('button', {
                name: /add product/i,
            }),
        )

        const nameInput = screen.getByRole('textbox', {
            name: /product name/i,
        })

        const categoryInput = screen.getByRole('textbox', {
            name: /category/i,
        })

        const brandInput = screen.getByRole('textbox', {
            name: /brand/i,
        })

        const priceInput = screen.getByRole('textbox', {
            name: /price/i,
        })

        const detailsInput = screen.getByRole('textbox', {
            name: /details/i,
        })

        const fileInput = document.querySelector(
            'input[type="file"]',
        ) as HTMLInputElement

        await user.type(nameInput, 'Galaxy S24')
        await user.type(categoryInput, 'Smartphones')
        await user.type(brandInput, 'Samsung')
        await user.clear(priceInput)
        await user.type(priceInput, '899.99')
        await user.type(detailsInput, 'Premium Android smartphone.')

        fireEvent.change(fileInput, {
            target: {
                files: [file],
            },
        })

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        await waitFor(() => {
            expect(requestBody).not.toBeNull()
        })

        expect(requestBody?.get('name')).toBe('Galaxy S24')
        expect(requestBody?.get('category')).toBe('Smartphones')
        expect(requestBody?.get('brand')).toBe('Samsung')
        expect(requestBody?.get('price')).toBe('899.99')
        expect(requestBody?.get('description')).toBe(
            'Premium Android smartphone.',
        )
        expect(requestBody?.get('images')).toBe('product.jpg')
    })
})
