import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const users = [
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
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+5511888888888',
        image: 'jane.jpg',
        department: 'Design',
        company: 'Acme',
        country: 'Brazil',
        status: 'active' as const,
    },
    {
        id: 3,
        name: 'Michael Smith',
        email: 'michael@example.com',
        phone: '+5511777777777',
        image: 'michael.jpg',
        department: 'Marketing',
        company: 'Acme',
        country: 'Brazil',
        status: 'offline' as const,
    },
]

const usersResponse = {
    list: users,
    total: users.length,
    page: 1,
    pageSize: 15,
}

describe('Users delete integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()

        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(usersResponse)
            }),
        )
    })

    test('deletes a user from the edit modal', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        await waitFor(() => {
            expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()
        })

        await user.click(
            screen.getByRole('button', {
                name: 'Edit user Gabriel Veroneze',
            }),
        )

        expect(await screen.findByRole('dialog')).toBeInTheDocument()

        const deleteButton = screen.getByRole('button', {
            name: 'Delete account',
        })

        expect(deleteButton).toBeEnabled()

        await user.click(deleteButton)

        await waitFor(() => {
            expect(
                screen.queryByText('Gabriel Veroneze'),
            ).not.toBeInTheDocument()
        })
    })

    test('deletes multiple selected users', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        await waitFor(() => {
            expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()
        })

        const checkboxes = screen.getAllByRole('checkbox')

        await user.click(checkboxes[1])
        await user.click(checkboxes[2])

        const deleteButton = screen.getByRole('button', {
            name: 'Delete selected users',
        })

        expect(deleteButton).toBeEnabled()

        await user.click(deleteButton)

        await waitFor(() => {
            expect(
                screen.queryByText('Gabriel Veroneze'),
            ).not.toBeInTheDocument()

            expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()
        })

        expect(screen.getByText('Michael Smith')).toBeInTheDocument()
    })
})
