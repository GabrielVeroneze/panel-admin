import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
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
        {
            id: 3,
            name: 'MacBook Air',
            category: 'Laptops',
            brand: 'Apple',
            price: 1299.99,
            description: 'Lightweight laptop.',
            images: ['macbook.jpg'],
        },
    ],
    total: 3,
    page: 1,
    pageSize: 15,
}

describe('Products delete integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('deletes a product through the edit modal and removes it from the table', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.delete('/api/products/1', () => {
                return new HttpResponse(null, { status: 204 })
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
            expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()
        })

        expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
        expect(screen.getByText('MacBook Air')).toBeInTheDocument()

        expect(store.getState().products.data?.list).toEqual([
            productsResponse.list[1],
            productsResponse.list[2],
        ])

        expect(store.getState().products.data?.total).toBe(2)

        expect(
            screen.queryByRole('heading', {
                name: /edit product/i,
            }),
        ).not.toBeInTheDocument()
    })

    test('sends the product id to the API when deleting a product through the edit modal', async () => {
        const user = userEvent.setup()

        let requestReceived = false

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.delete('/api/products/2', () => {
                requestReceived = true

                return new HttpResponse(null, { status: 204 })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const editButtons = screen.getAllByRole('button', {
            name: /edit item/i,
        })

        await user.click(editButtons[1])

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
            expect(requestReceived).toBe(true)
        })

        expect(store.getState().products.data?.list).not.toContainEqual(
            productsResponse.list[1],
        )
    })

    test('deletes all selected products and removes them from the table', async () => {
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

                return new HttpResponse(null, { status: 204 })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes).toHaveLength(4)

        await user.click(checkboxes[1])
        await user.click(checkboxes[2])

        const deleteButton = screen.getByRole('button', {
            name: /delete selected users/i,
        })

        expect(deleteButton).toBeEnabled()

        await user.click(deleteButton)

        await waitFor(() => {
            expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()

            expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument()
        })

        expect(screen.getByText('MacBook Air')).toBeInTheDocument()

        expect(store.getState().products.data?.list).toEqual([
            productsResponse.list[2],
        ])

        expect(store.getState().products.data?.total).toBe(1)

        expect(deleteButton).toBeDisabled()
    })

    test('sends all selected product ids to the API when deleting multiple products', async () => {
        const user = userEvent.setup()

        let requestBody: { ids: number[] } | undefined

        server.use(
            http.get('/api/products', () => {
                return HttpResponse.json(productsResponse)
            }),
            http.delete('/api/products', async ({ request }) => {
                requestBody = (await request.json()) as {
                    ids: number[]
                }

                return new HttpResponse(null, { status: 204 })
            }),
        )

        renderWithProviders(<ProductsPage />, { store })

        expect(await screen.findByText('iPhone 15')).toBeInTheDocument()

        const checkboxes = screen.getAllByRole('checkbox')

        await user.click(checkboxes[1])
        await user.click(checkboxes[3])

        const deleteButton = screen.getByRole('button', {
            name: /delete selected users/i,
        })

        expect(deleteButton).toBeEnabled()

        await user.click(deleteButton)

        await waitFor(() => {
            expect(requestBody).toEqual({
                ids: [1, 3],
            })
        })

        expect(store.getState().products.data?.list).toEqual([
            productsResponse.list[1],
        ])

        expect(store.getState().products.data?.total).toBe(1)
    })
})
