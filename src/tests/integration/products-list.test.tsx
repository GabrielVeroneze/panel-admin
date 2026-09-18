import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { ProductsPage } from '@/features/products'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

const products = [
    {
        id: 1,
        name: 'iPhone 15',
        category: 'Smartphones',
        brand: 'Apple',
        price: 799,
        description: 'Apple iPhone 15',
        images: ['iphone-15.jpg'],
    },
    {
        id: 2,
        name: 'Galaxy S24',
        category: 'Smartphones',
        brand: 'Samsung',
        price: 699,
        description: 'Samsung Galaxy S24',
        images: ['galaxy-s24.jpg'],
    },
]

const productsResponse = {
    list: products,
    total: products.length,
    page: 1,
    pageSize: 15,
}

describe('Products list integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('loads products from the API and displays them in the table', async () => {
        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()
        expect(screen.getByText('Apple')).toBeInTheDocument()

        expect(await screen.findByText('Galaxy S24')).toBeInTheDocument()
        expect(screen.getByText('Samsung')).toBeInTheDocument()

        expect(screen.getAllByText('Smartphones')).toHaveLength(2)
    })

    test('displays the loading state while fetching products', async () => {
        server.use(
            http.get('/api/products', async () => {
                await new Promise((resolve) => setTimeout(resolve, 100))

                return HttpResponse.json(productsResponse)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()
    })

    test('updates the store after products are loaded', async () => {
        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        await screen.findByText('iPhone 15')

        await waitFor(() => {
            const state = store.getState().products

            expect(state.loading).toBe(false)
            expect(state.data).not.toBeNull()
            expect(state.data?.list).toHaveLength(2)
            expect(state.data?.total).toBe(2)
        })
    })

    test('sends the default pagination parameters when loading products', async () => {
        let requestUrl: URL | undefined

        server.use(
            http.get('/api/products', ({ request }) => {
                requestUrl = new URL(request.url)

                return HttpResponse.json(productsResponse)
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        await screen.findByText('iPhone 15')

        await waitFor(() => {
            expect(requestUrl).toBeDefined()
        })

        expect(requestUrl?.searchParams.get('page')).toBe('1')
        expect(requestUrl?.searchParams.get('pageSize')).toBe('15')
        expect(requestUrl?.searchParams.get('search')).toBe('')
    })
})
