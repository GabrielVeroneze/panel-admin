import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { signInThunk } from '@/features/auth/store'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const initialUser = {
    id: 1,
    name: 'Gabriel Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511999999999',
    image: 'gabriel.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active' as const,
}

const createdUser = {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+5511888888888',
    image: 'jane.jpg',
    department: 'Design',
    company: 'Acme',
    country: 'Brazil',
    status: 'active' as const,
}

const updatedUser = {
    ...createdUser,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Product',
}

const usersResponse = {
    list: [initialUser],
    total: 1,
    page: 1,
    pageSize: 15,
}

describe('Users CRUD integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()

        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(usersResponse)
            }),

            http.post('/api/users', async ({ request }) => {
                const formData = await request.formData()

                expect(formData.get('name')).toBe('Jane Doe')
                expect(formData.get('email')).toBe('jane@example.com')
                expect(formData.get('phone')).toBe('+5511888888888')
                expect(formData.get('company')).toBe('Acme')
                expect(formData.get('department')).toBe('Design')
                expect(formData.get('password')).toBe('Password1!')

                return HttpResponse.json(createdUser, {
                    status: 201,
                })
            }),

            http.put('/api/users/2', async ({ request }) => {
                const formData = await request.formData()

                expect(formData.get('name')).toBe('Jane Smith')
                expect(formData.get('email')).toBe('jane.smith@example.com')
                expect(formData.get('phone')).toBe('+5511888888888')
                expect(formData.get('company')).toBe('Acme')
                expect(formData.get('department')).toBe('Product')

                return HttpResponse.json(updatedUser)
            }),

            http.get('/api/auth/me', () => {
                return HttpResponse.json(initialUser)
            }),

            http.delete('/api/users/2', () => {
                return new HttpResponse(null, {
                    status: 204,
                })
            }),
        )
    })

    test('completes the users CRUD flow', async () => {
        const user = userEvent.setup()

        await store
            .dispatch(
                signInThunk({
                    email: 'neil.sims1@example.com',
                    password: 'Password123*',
                    rememberMe: true,
                }),
            )
            .unwrap()

        renderWithProviders(<UsersPage />, {
            store,
        })

        // Load
        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        // Create
        await user.click(
            screen.getByRole('button', {
                name: /add user/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /create user/i,
            }),
        ).toBeInTheDocument()

        await user.type(screen.getByLabelText(/first name/i), 'Jane')

        await user.type(screen.getByLabelText(/last name/i), 'Doe')

        await user.type(screen.getByLabelText(/email/i), 'jane@example.com')

        await user.type(screen.getByLabelText(/phone/i), '+5511888888888')

        await user.type(screen.getByLabelText(/company/i), 'Acme')

        await user.type(screen.getByLabelText(/department/i), 'Design')

        await user.type(screen.getByLabelText(/^password$/i), 'Password1!')

        await user.type(
            screen.getByLabelText(/confirm password/i),
            'Password1!',
        )

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        expect(await screen.findByText('Jane Doe')).toBeInTheDocument()

        expect(screen.getByText('jane@example.com')).toBeInTheDocument()

        expect(screen.getByText('Design')).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: /create user/i,
            }),
        ).not.toBeInTheDocument()

        // Update
        await user.click(
            screen.getByRole('button', {
                name: /edit user jane doe/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit user/i,
            }),
        ).toBeInTheDocument()

        const firstNameInput = screen.getByDisplayValue('Jane')
        const lastNameInput = screen.getByDisplayValue('Doe')
        const emailInput = screen.getByDisplayValue('jane@example.com')
        const departmentInput = screen.getByDisplayValue('Design')

        await user.clear(firstNameInput)
        await user.type(firstNameInput, 'Jane')

        await user.clear(lastNameInput)
        await user.type(lastNameInput, 'Smith')

        await user.clear(emailInput)
        await user.type(emailInput, 'jane.smith@example.com')

        await user.clear(departmentInput)
        await user.type(departmentInput, 'Product')

        await user.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        expect(await screen.findByText('Jane Smith')).toBeInTheDocument()

        expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument()

        expect(screen.getByText('Product')).toBeInTheDocument()

        expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument()

        // Delete
        await user.click(
            screen.getByRole('button', {
                name: /edit user jane smith/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit user/i,
            }),
        ).toBeInTheDocument()

        await user.click(
            screen.getByRole('button', {
                name: /delete account/i,
            }),
        )

        await waitFor(() => {
            expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
        })

        expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: /edit user/i,
            }),
        ).not.toBeInTheDocument()
    }, 10000)
})
