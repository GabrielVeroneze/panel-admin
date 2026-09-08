import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const firstPageResponse = {
    list: [
        {
            id: 1,
            name: 'Gabriel Veroneze',
            email: 'gabriel@example.com',
            phone: '+5511999999999',
            image: 'gabriel.jpg',
            department: 'Engineering',
            company: 'Acme',
            country: 'Brazil',
            status: 'active' as const,
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+12025550123',
            image: 'john.jpg',
            department: 'Backend Developer',
            company: 'Tech Corp',
            country: 'United States',
            status: 'offline' as const,
        },
    ],
    total: 30,
    page: 1,
    pageSize: 15,
}

const secondPageResponse = {
    list: [
        {
            id: 16,
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+442071838750',
            image: 'jane.jpg',
            department: 'Design',
            company: 'Design Corp',
            country: 'United Kingdom',
            status: 'active' as const,
        },
        {
            id: 17,
            name: 'Michael Brown',
            email: 'michael@example.com',
            phone: '+12125551234',
            image: 'michael.jpg',
            department: 'Product',
            company: 'Product Corp',
            country: 'United States',
            status: 'offline' as const,
        },
    ],
    total: 30,
    page: 2,
    pageSize: 15,
}

describe('Users pagination integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()

        server.use(
            http.get('/api/users', ({ request }) => {
                const url = new URL(request.url)
                const page = url.searchParams.get('page')

                if (page === '2') {
                    return HttpResponse.json(secondPageResponse)
                }

                return HttpResponse.json(firstPageResponse)
            }),
        )
    })

    test('loads the second page when the user changes the page', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()

        const nextPageButton = screen.getByRole('button', {
            name: /next/i,
        })

        await user.click(nextPageButton)

        expect(await screen.findByText('Jane Smith')).toBeInTheDocument()
        expect(screen.getByText('Michael Brown')).toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    })

    test('sends the correct page and pageSize to the API', async () => {
        const user = userEvent.setup()

        let requestedPage: string | null = null
        let requestedPageSize: string | null = null

        server.use(
            http.get('/api/users', ({ request }) => {
                const url = new URL(request.url)

                requestedPage = url.searchParams.get('page')
                requestedPageSize = url.searchParams.get('pageSize')

                if (requestedPage === '2') {
                    return HttpResponse.json(secondPageResponse)
                }

                return HttpResponse.json(firstPageResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        await screen.findByText('Gabriel Veroneze')

        const nextPageButton = screen.getByRole('button', {
            name: /next/i,
        })

        await user.click(nextPageButton)

        await waitFor(() => {
            expect(requestedPage).toBe('2')
            expect(requestedPageSize).toBe('15')
        })
    })

    test('updates the pagination state with the page returned by the API', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        await screen.findByText('Gabriel Veroneze')

        const nextPageButton = screen.getByRole('button', {
            name: /next/i,
        })

        await user.click(nextPageButton)

        await screen.findByText('Jane Smith')

        expect(
            screen.getByRole('button', {
                name: /previous/i,
            }),
        ).toBeInTheDocument()

        expect(screen.getByText(/16.*30/i)).toBeInTheDocument()
    })
})
