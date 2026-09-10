import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

describe('Users errors integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()
    })

    test('handles an error when loading users', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(
                    { message: 'Internal server error' },
                    { status: 500 },
                )
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()
    })

    test('handles an unauthorized response when loading users', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(
                    { message: 'Unauthorized' },
                    { status: 401 },
                )
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()
    })

    test('handles a not found response when loading users', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(
                    { message: 'Users not found' },
                    { status: 404 },
                )
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()
    })

    test('handles a service unavailable response when loading users', async () => {
        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(
                    { message: 'Service unavailable' },
                    { status: 503 },
                )
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('No users')).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()
    })
})
