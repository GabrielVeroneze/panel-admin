import { beforeEach, describe, expect, test } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { UsersPage } from '@/features/users'
import { signInThunk } from '@/features/auth/store'
import { setupStore, type TestStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const user = {
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

const updatedUser = {
    ...user,
    name: 'Gabriel Silva',
    email: 'gabriel.silva@example.com',
    department: 'Product',
}

const usersResponse = {
    list: [user],
    total: 1,
    page: 1,
    pageSize: 15,
}

describe('Users update integration', () => {
    let store: TestStore

    beforeEach(() => {
        store = setupStore()

        server.use(
            http.get('/api/users', () => {
                return HttpResponse.json(usersResponse)
            }),
        )
    })

    test('opens the edit modal with the selected user data', async () => {
        const userEventInstance = userEvent.setup()

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        await userEventInstance.click(
            screen.getByRole('button', {
                name: /edit item/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit user/i,
            }),
        ).toBeInTheDocument()

        expect(screen.getByDisplayValue('Gabriel')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Veroneze')).toBeInTheDocument()

        expect(
            screen.getByDisplayValue('gabriel@example.com'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter phone number +(123) 456 7890'),
        ).toBeInTheDocument()

        expect(screen.getByDisplayValue('Acme')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Engineering')).toBeInTheDocument()
    })

    test('updates a user successfully and updates the list', async () => {
        const userEventInstance = userEvent.setup()

        await store
            .dispatch(
                signInThunk({
                    email: 'neil.sims1@example.com',
                    password: 'Password123*',
                    rememberMe: true,
                }),
            )
            .unwrap()

        server.use(
            http.put('/api/users/1', async ({ request }) => {
                const formData = await request.formData()

                expect(formData.get('name')).toBe('Gabriel Silva')
                expect(formData.get('email')).toBe('gabriel.silva@example.com')
                expect(formData.get('phone')).toBe('+5511999999999')
                expect(formData.get('company')).toBe('Acme')
                expect(formData.get('department')).toBe('Product')

                return HttpResponse.json(updatedUser)
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        await userEventInstance.click(
            screen.getByRole('button', {
                name: /edit item/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit user/i,
            }),
        ).toBeInTheDocument()

        const firstNameInput = screen.getByDisplayValue('Gabriel')
        const lastNameInput = screen.getByDisplayValue('Veroneze')
        const emailInput = screen.getByDisplayValue('gabriel@example.com')
        const departmentInput = screen.getByDisplayValue('Engineering')

        await userEventInstance.clear(firstNameInput)
        await userEventInstance.type(firstNameInput, 'Gabriel')

        await userEventInstance.clear(lastNameInput)
        await userEventInstance.type(lastNameInput, 'Silva')

        await userEventInstance.clear(emailInput)
        await userEventInstance.type(emailInput, 'gabriel.silva@example.com')

        await userEventInstance.clear(departmentInput)
        await userEventInstance.type(departmentInput, 'Product')

        await userEventInstance.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        expect(await screen.findByText('Gabriel Silva')).toBeInTheDocument()

        expect(
            screen.getByText('gabriel.silva@example.com'),
        ).toBeInTheDocument()

        expect(screen.getByText('Product')).toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()

        await waitFor(() => {
            expect(
                screen.queryByRole('heading', {
                    name: /edit user/i,
                }),
            ).not.toBeInTheDocument()
        })
    })

    test('keeps the edit modal open when the API returns an error', async () => {
        const userEventInstance = userEvent.setup()

        server.use(
            http.put('/api/users/1', () => {
                return new HttpResponse(null, {
                    status: 500,
                })
            }),
        )

        renderWithProviders(<UsersPage />, { store })

        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        await userEventInstance.click(
            screen.getByRole('button', {
                name: /edit item/i,
            }),
        )

        expect(
            screen.getByRole('heading', {
                name: /edit user/i,
            }),
        ).toBeInTheDocument()

        const firstNameInput = screen.getByDisplayValue('Gabriel')
        const lastNameInput = screen.getByDisplayValue('Veroneze')

        await userEventInstance.clear(firstNameInput)
        await userEventInstance.type(firstNameInput, 'Gabriel')

        await userEventInstance.clear(lastNameInput)
        await userEventInstance.type(lastNameInput, 'Silva')

        await userEventInstance.click(
            screen.getByRole('button', {
                name: /save/i,
            }),
        )

        await waitFor(() => {
            expect(
                screen.getByRole('heading', {
                    name: /edit user/i,
                }),
            ).toBeInTheDocument()
        })

        expect(screen.getByDisplayValue('Gabriel')).toBeInTheDocument()

        expect(screen.getByDisplayValue('Silva')).toBeInTheDocument()

        expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()
    })
})
