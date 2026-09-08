import { describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

describe('Users create integration', () => {
    test('opens the create user modal', async () => {
        const user = userEvent.setup()

        renderWithProviders(<UsersPage />, {
            store: setupStore(),
        })

        const addUserButton = await screen.findByRole('button', {
            name: /add user/i,
        })

        await user.click(addUserButton)

        const dialog = screen.getByRole('dialog')

        expect(dialog).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: /create user/i,
            }),
        ).toBeInTheDocument()
    })

    test('creates a user successfully and updates the list', async () => {
        const user = userEvent.setup()

        const createdUser = {
            id: 999,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+12024560101',
            image: '/images/avatar.jpg',
            department: 'Engineering',
            company: 'Acme',
            country: 'United States',
            status: 'active' as const,
        }

        server.use(
            http.post('/api/users', async () => {
                return HttpResponse.json(createdUser, {
                    status: 201,
                })
            }),
        )

        renderWithProviders(<UsersPage />, {
            store: setupStore(),
        })

        const addUserButton = await screen.findByRole('button', {
            name: /add user/i,
        })

        await user.click(addUserButton)

        expect(screen.getByRole('dialog')).toBeInTheDocument()

        await user.type(
            screen.getByPlaceholderText(/enter first name/i),
            'John',
        )

        await user.type(screen.getByPlaceholderText(/enter last name/i), 'Doe')

        await user.type(
            screen.getByPlaceholderText(/enter email address/i),
            'john.doe@example.com',
        )

        await user.type(
            screen.getByPlaceholderText(/enter phone number/i),
            '+12024560101',
        )

        await user.type(
            screen.getByPlaceholderText(/enter company name/i),
            'Acme',
        )

        await user.type(
            screen.getByPlaceholderText(/enter department name/i),
            'Engineering',
        )

        await user.type(
            screen.getByPlaceholderText(/enter password/i),
            'Password123!',
        )

        await user.type(
            screen.getByPlaceholderText(/enter confirm password/i),
            'Password123!',
        )

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
        })

        expect(await screen.findByText('John Doe')).toBeInTheDocument()
    })

    test('keeps the create modal open when the API returns an error', async () => {
        const user = userEvent.setup()

        server.use(
            http.post('/api/users', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to create user',
                    },
                    {
                        status: 500,
                    },
                )
            }),
        )

        renderWithProviders(<UsersPage />, {
            store: setupStore(),
        })

        const addUserButton = await screen.findByRole('button', {
            name: /add user/i,
        })

        await user.click(addUserButton)

        await user.type(
            screen.getByPlaceholderText(/enter first name/i),
            'John',
        )

        await user.type(screen.getByPlaceholderText(/enter last name/i), 'Doe')

        await user.type(
            screen.getByPlaceholderText(/enter email address/i),
            'john.doe@example.com',
        )

        await user.type(
            screen.getByPlaceholderText(/enter phone number/i),
            '+12024560101',
        )

        await user.type(
            screen.getByPlaceholderText(/enter company name/i),
            'Acme',
        )

        await user.type(
            screen.getByPlaceholderText(/enter department name/i),
            'Engineering',
        )

        await user.type(
            screen.getByPlaceholderText(/enter password/i),
            'Password123!',
        )

        await user.type(
            screen.getByPlaceholderText(/enter confirm password/i),
            'Password123!',
        )

        await user.click(
            screen.getByRole('button', {
                name: /^save$/i,
            }),
        )

        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument()
        })
    })
})
