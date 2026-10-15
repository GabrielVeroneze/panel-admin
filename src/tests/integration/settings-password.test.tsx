import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { Settings, UpdatePasswordPayload } from '@/features/settings/types'
import userEvent from '@testing-library/user-event'

const createSettings = (): Settings => ({
    profile: {
        avatar: 'https://example.com/avatar.jpg',
        name: 'John Doe',
        role: 'Administrator',
    },
    preferences: {
        language: 'en',
        timezone: 'America/New_York',
    },
    generalInformation: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        phone: '+14155552671',
        birthDate: '1990-01-15',
        organization: 'Example Inc.',
        department: 'Engineering',
        address: '123 Main Street',
        city: 'New York',
        country: 'US',
        zipCode: '10001',
    },
    socialAccounts: [],
    connectedAccounts: [],
    notifications: {
        companyNews: true,
        accountActivity: true,
        meetupsNearYou: false,
        newMessages: true,
    },
    emailSettings: {
        ratingReminders: true,
        itemUpdateNotifications: true,
        itemCommentNotifications: false,
        buyerReviewNotifications: true,
    },
    recentDevices: [],
})

const setupSettingsHandler = (settings: Settings) => {
    server.use(
        http.get('/api/settings', () => {
            return HttpResponse.json(settings)
        }),
    )
}

const renderSettingsPage = () => {
    const store = setupStore()

    renderWithProviders(<SettingsPage />, { store })

    return store
}

const fillPasswordForm = async () => {
    const user = userEvent.setup()

    await user.type(
        await screen.findByLabelText('Current Password'),
        'Current123!',
    )

    await user.type(
        await screen.findByLabelText('New Password'),
        'NewPassword123!',
    )

    await user.type(
        await screen.findByLabelText('Confirm Password'),
        'NewPassword123!',
    )

    return user
}

const submitPasswordForm = async (user: ReturnType<typeof userEvent.setup>) => {
    const currentPasswordInput = screen.getByLabelText('Current Password')

    const passwordForm = currentPasswordInput.closest('form')

    if (!passwordForm) {
        throw new Error('Password form was not found')
    }

    await user.click(
        within(passwordForm).getByRole('button', {
            name: 'Update',
        }),
    )
}

describe('Settings integration - password', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('changes the password successfully', async () => {
        const settings = createSettings()

        setupSettingsHandler(settings)

        let receivedPassword: UpdatePasswordPayload | null = null

        server.use(
            http.put('/api/settings/password', async ({ request }) => {
                receivedPassword =
                    (await request.json()) as UpdatePasswordPayload

                return HttpResponse.json({
                    message: 'Password updated successfully',
                })
            }),
        )

        renderSettingsPage()

        const user = await fillPasswordForm()

        await submitPasswordForm(user)

        await waitFor(() => {
            expect(receivedPassword).toEqual({
                currentPassword: 'Current123!',
                newPassword: 'NewPassword123!',
                confirmPassword: 'NewPassword123!',
            })
        })

        await waitFor(() => {
            expect(screen.getByLabelText('Current Password')).toHaveValue('')

            expect(screen.getByLabelText('New Password')).toHaveValue('')

            expect(screen.getByLabelText('Confirm Password')).toHaveValue('')
        })
    })

    it('handles an API error when changing the password', async () => {
        const settings = createSettings()

        setupSettingsHandler(settings)

        let requestCount = 0

        server.use(
            http.put('/api/settings/password', () => {
                requestCount += 1

                return HttpResponse.json(
                    { message: 'Unable to update password' },
                    { status: 500 },
                )
            }),
        )

        renderSettingsPage()

        const user = await fillPasswordForm()

        await submitPasswordForm(user)

        await waitFor(() => {
            expect(requestCount).toBe(1)
        })

        expect(screen.getByLabelText('Current Password')).toHaveValue(
            'Current123!',
        )

        expect(screen.getByLabelText('New Password')).toHaveValue(
            'NewPassword123!',
        )

        expect(screen.getByLabelText('Confirm Password')).toHaveValue(
            'NewPassword123!',
        )
    })

    it('does not present an unsuccessful password change as completed', async () => {
        const settings = createSettings()

        setupSettingsHandler(settings)

        server.use(
            http.put('/api/settings/password', () =>
                HttpResponse.json(
                    { message: 'Password update failed' },
                    { status: 500 },
                ),
            ),
        )

        renderSettingsPage()

        const user = await fillPasswordForm()

        await submitPasswordForm(user)

        await waitFor(() => {
            expect(screen.getByLabelText('Current Password')).toHaveValue(
                'Current123!',
            )

            expect(screen.getByLabelText('New Password')).toHaveValue(
                'NewPassword123!',
            )

            expect(screen.getByLabelText('Confirm Password')).toHaveValue(
                'NewPassword123!',
            )
        })

        expect(
            screen.queryByText('Password updated successfully'),
        ).not.toBeInTheDocument()
    })
})
