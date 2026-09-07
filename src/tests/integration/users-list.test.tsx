import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

const usersResponse = {
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

describe('Users list integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('loads users from the API and displays them in the table', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(usersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()
        expect(screen.getByText('gabriel@example.com')).toBeInTheDocument()
        expect(screen.getByText('Engineering')).toBeInTheDocument()
        expect(screen.getByText('Brazil')).toBeInTheDocument()

        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('john@example.com')).toBeInTheDocument()
        expect(screen.getByText('Backend Developer')).toBeInTheDocument()
        expect(screen.getByText('United States')).toBeInTheDocument()
    })

    test('displays the total number of users returned by the API', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(usersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        await screen.findByText('Gabriel Veroneze')

        expect(
            screen.getByText((_, element) => {
                if (element?.tagName !== 'SPAN') return false

                return (
                    element.textContent?.replace(/\s+/g, ' ').trim() ===
                    'Showing 1-2 of 2 users'
                )
            }),
        ).toBeInTheDocument()
    })

    test('displays the loading state while fetching users', async () => {
        server.use(
            http.get('/api/users', async () => {
                await new Promise((resolve) => setTimeout(resolve, 100))

                return HttpResponse.json(usersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()
    })

    test('renders the empty state when the API returns no users', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json({
                    list: [],
                    total: 0,
                    page: 1,
                    pageSize: 15,
                })
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()
    })

    test('sends the default pagination parameters when loading users', async () => {
        let requestUrl: URL | undefined

        server.use(
            http.get('/api/users', ({ request }) => {
                requestUrl = new URL(request.url)

                return HttpResponse.json(usersResponse)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        await screen.findByText('Gabriel Veroneze')

        await waitFor(() => {
            expect(requestUrl).toBeDefined()
        })

        expect(requestUrl?.searchParams.get('page')).toBe('1')
        expect(requestUrl?.searchParams.get('pageSize')).toBe('15')
        expect(requestUrl?.searchParams.get('search')).toBe('')
    })
})
