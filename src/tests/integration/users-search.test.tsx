import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const allUsersResponse = {
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
    total: 2,
    page: 1,
    pageSize: 15,
}

const searchResponse = {
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
    ],
    total: 1,
    page: 1,
    pageSize: 15,
}

describe('Users search integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()

        server.use(
            http.get('/api/users', ({ request }) => {
                const url = new URL(request.url)
                const search = url.searchParams.get('search')

                if (search === 'Gabriel') {
                    return HttpResponse.json(searchResponse)
                }

                return HttpResponse.json(allUsersResponse)
            }),
        )
    })

    test('searches users and updates the list with the API results', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()

        const searchInput = screen.getByPlaceholderText('Search for users')

        await user.type(searchInput, 'Gabriel')

        await waitFor(() => {
            expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
        })

        expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()
        expect(screen.getByText('gabriel@example.com')).toBeInTheDocument()
    })

    test('sends the search term to the API', async () => {
        const user = userEvent.setup()

        let requestedSearch: string | null = null

        server.use(
            http.get('/api/users', ({ request }) => {
                const url = new URL(request.url)
                requestedSearch = url.searchParams.get('search')

                if (requestedSearch === 'Gabriel') {
                    return HttpResponse.json(searchResponse)
                }

                return HttpResponse.json(allUsersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        await screen.findByText('Gabriel Veroneze')

        const searchInput = screen.getByPlaceholderText('Search for users')

        await user.type(searchInput, 'Gabriel')

        await waitFor(() => {
            expect(requestedSearch).toBe('Gabriel')
        })
    })

    test('displays the empty state when the search returns no users', async () => {
        const user = userEvent.setup()

        server.use(
            http.get('/api/users', ({ request }) => {
                const url = new URL(request.url)
                const search = url.searchParams.get('search')

                if (search === 'Unknown') {
                    return HttpResponse.json({
                        list: [],
                        total: 0,
                        page: 1,
                        pageSize: 15,
                    })
                }

                return HttpResponse.json(allUsersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        const searchInput = screen.getByPlaceholderText('Search for users')

        await user.type(searchInput, 'Unknown')

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    })
})
