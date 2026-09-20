import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { ProductsPage } from '@/features/products'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

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

const updatedProduct = {
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'Smartphones',
    brand: 'Apple',
    price: 1199.99,
    description: 'Professional smartphone with advanced features.',
    images: ['iphone-pro.jpg'],
}

describe('Products update integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('updates a product through the form and displays the updated data in the table', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.put('/api/products/1', () => {
                return HttpResponse.json(updatedProduct)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const productRow = screen.getByRole('row', {
            name: /iPhone 15/i,
        })

        await user.click(
            within(productRow).getByRole('button', {
                name: /edit item/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit product/i,
            }),
        ).toBeInTheDocument()

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

        expect(nameInput).toHaveValue('iPhone 15')
        expect(categoryInput).toHaveValue('Smartphones')
        expect(brandInput).toHaveValue('Apple')
        expect(priceInput).toHaveValue('$999.99')
        expect(detailsInput).toHaveValue('Premium smartphone.')

        await user.clear(nameInput)
        await user.type(nameInput, 'iPhone 15 Pro')

        await user.clear(priceInput)
        await user.type(priceInput, '1199.99')

        await user.clear(detailsInput)
        await user.type(
            detailsInput,
            'Professional smartphone with advanced features.',
        )

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        await waitFor(() => {
            expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument()
        })

        expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()

        expect(screen.getAllByText('Smartphones')).toHaveLength(2)
        expect(screen.getByText('Apple')).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()

        await waitFor(() => {
            const state = store.getState().products

            expect(state.loading).toBe(false)
            expect(state.data).not.toBeNull()
            expect(state.data?.list).toHaveLength(2)
            expect(state.data?.total).toBe(2)
            expect(state.data?.list[0]).toEqual(updatedProduct)
            expect(state.data?.list[1]).toEqual(productsResponse.list[1])
        })
    })

    test('sends the updated product data to the API', async () => {
        const user = userEvent.setup()

        let requestBody: FormData | undefined

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.put('/api/products/1', async ({ request }) => {
                requestBody = await request.formData()

                return HttpResponse.json(updatedProduct)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const productRow = screen.getByRole('row', {
            name: /iPhone 15/i,
        })

        await user.click(
            within(productRow).getByRole('button', {
                name: /edit item/i,
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

        await user.clear(nameInput)
        await user.type(nameInput, 'iPhone 15 Pro')

        await user.clear(categoryInput)
        await user.type(categoryInput, 'Professional Smartphones')

        await user.clear(brandInput)
        await user.type(brandInput, 'Apple')

        await user.clear(priceInput)
        await user.type(priceInput, '1199.99')

        await user.clear(detailsInput)
        await user.type(
            detailsInput,
            'Professional smartphone with advanced features.',
        )

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        await screen.findByText('iPhone 15 Pro')

        await waitFor(() => {
            expect(requestBody).toBeDefined()
        })

        expect(requestBody?.get('name')).toBe('iPhone 15 Pro')
        expect(requestBody?.get('category')).toBe('Professional Smartphones')
        expect(requestBody?.get('brand')).toBe('Apple')
        expect(requestBody?.get('price')).toBe('1199.99')
        expect(requestBody?.get('description')).toBe(
            'Professional smartphone with advanced features.',
        )
        expect(requestBody?.get('images')).toBeNull()
    })
})
