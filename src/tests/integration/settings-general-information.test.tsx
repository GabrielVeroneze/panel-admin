import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { GeneralInformation, Settings } from '@/features/settings/types'
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

const getGeneralInformationForm = () => {
    const firstNameInput = screen.getByLabelText('First Name')
    const form = firstNameInput.closest('form')

    if (!form) {
        throw new Error('General information form was not found')
    }

    return {
        form,
        firstNameInput,
        lastNameInput: within(form).getByLabelText('Last Name'),
        emailInput: within(form).getByLabelText('Email'),
        roleInput: within(form).getByLabelText('Role'),
        phoneInput: within(form).getByLabelText('Phone Number'),
        birthDateInput: within(form).getByLabelText('Birth Date'),
        organizationInput: within(form).getByLabelText('Organization'),
        departmentInput: within(form).getByLabelText('Department'),
        addressInput: within(form).getByLabelText('Address'),
        cityInput: within(form).getByLabelText('City'),
        countryInput: within(form).getByLabelText('Country'),
        zipCodeInput: within(form).getByLabelText('Zip Code'),
        submitButton: within(form).getByRole('button', { name: 'Update' }),
    }
}

const fillUpdatedInformation = async (
    user: ReturnType<typeof userEvent.setup>,
) => {
    const form = getGeneralInformationForm()

    await user.clear(form.firstNameInput)
    await user.type(form.firstNameInput, 'Jane')

    await user.clear(form.lastNameInput)
    await user.type(form.lastNameInput, 'Smith')

    await user.clear(form.emailInput)
    await user.type(form.emailInput, 'jane.smith@example.com')

    await user.clear(form.roleInput)
    await user.type(form.roleInput, 'Manager')

    return form
}

describe('Settings integration - general information', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('saves general information successfully', async () => {
        const user = userEvent.setup()
        let currentSettings = createSettings()
        let receivedInformation: GeneralInformation | undefined

        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(currentSettings)
            }),
            http.put('/api/settings/general', async ({ request }) => {
                receivedInformation =
                    (await request.json()) as GeneralInformation

                currentSettings = {
                    ...currentSettings,
                    generalInformation: receivedInformation,
                    profile: {
                        ...currentSettings.profile,
                        name: `${receivedInformation.firstName} ${receivedInformation.lastName}`,
                        role: receivedInformation.role,
                    },
                }

                return HttpResponse.json(receivedInformation)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', {
                name: 'General information',
            }),
        ).toBeInTheDocument()

        const form = await fillUpdatedInformation(user)

        await user.click(form.submitButton)

        await waitFor(() => {
            expect(receivedInformation).toEqual({
                ...createSettings().generalInformation,
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane.smith@example.com',
                role: 'Manager',
            })
        })

        await waitFor(() => {
            expect(
                store.getState().settings.settings?.generalInformation,
            ).toEqual(receivedInformation)
        })

        expect(store.getState().settings.loading).toBe(false)
    })

    it('preserves the existing settings when saving general information fails', async () => {
        const user = userEvent.setup()
        const initialSettings = createSettings()
        let requestCount = 0

        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(initialSettings)
            }),
            http.put('/api/settings/general', () => {
                requestCount += 1

                return HttpResponse.json(
                    { message: 'Internal server error' },
                    { status: 500 },
                )
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', { name: 'General information' }),
        ).toBeInTheDocument()

        const form = await fillUpdatedInformation(user)

        await user.click(form.submitButton)

        await waitFor(() => {
            expect(requestCount).toBe(1)
        })

        await waitFor(() => {
            expect(
                store.getState().settings.settings?.generalInformation,
            ).toEqual(initialSettings.generalInformation)

            expect(store.getState().settings.settings?.profile).toEqual(
                initialSettings.profile,
            )
        })

        expect(store.getState().settings.loading).toBe(false)
        expect(
            screen.getByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()
    })

    it('updates the profile and form with the saved information', async () => {
        const user = userEvent.setup()
        let currentSettings = createSettings()

        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(currentSettings)
            }),
            http.put('/api/settings/general', async ({ request }) => {
                const information = (await request.json()) as GeneralInformation

                currentSettings = {
                    ...currentSettings,
                    generalInformation: information,
                    profile: {
                        ...currentSettings.profile,
                        name: `${information.firstName} ${information.lastName}`,
                        role: information.role,
                    },
                }

                return HttpResponse.json(information)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()

        const form = await fillUpdatedInformation(user)

        await user.click(form.submitButton)

        expect(
            await screen.findByRole('heading', { name: 'Jane Smith' }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Manager', { selector: 'p' }),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.settings?.profile.name).toBe(
                'Jane Smith',
            )
            expect(store.getState().settings.settings?.profile.role).toBe(
                'Manager',
            )
            expect(
                store.getState().settings.settings?.generalInformation,
            ).toEqual(currentSettings.generalInformation)
        })

        const updatedForm = getGeneralInformationForm()

        expect(updatedForm.firstNameInput).toHaveValue('Jane')
        expect(updatedForm.lastNameInput).toHaveValue('Smith')
        expect(updatedForm.emailInput).toHaveValue('jane.smith@example.com')
        expect(updatedForm.roleInput).toHaveValue('Manager')
    })
})
