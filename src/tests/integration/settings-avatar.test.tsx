import { afterEach, describe, expect, it, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { Settings } from '@/features/settings/types'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/utils', async () => {
    const actual =
        await vi.importActual<typeof import('@/shared/utils')>('@/shared/utils')

    return {
        ...actual,
        toFormData: vi.fn((data: Record<string, unknown>) => {
            const formData = new FormData()

            Object.entries(data).forEach(([key, value]) => {
                if (value === undefined || value === null) return

                if (value instanceof File) {
                    formData.append(key, value.name)
                    return
                }

                formData.append(key, String(value))
            })

            return formData
        }),
    }
})

const initialAvatar = 'https://example.com/avatar.jpg'
const updatedAvatar = 'https://example.com/updated-avatar.jpg'

let currentAvatar = initialAvatar

const createSettings = (): Settings => ({
    profile: {
        avatar: currentAvatar,
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

const setupSettingsHandler = () => {
    currentAvatar = initialAvatar

    server.use(
        http.get('/api/settings', () => {
            return HttpResponse.json(createSettings())
        }),
    )
}

const renderSettingsPage = () => {
    const store = setupStore()

    const result = renderWithProviders(<SettingsPage />, {
        store,
    })

    return {
        ...result,
        store,
    }
}

const getAvatar = () => {
    return screen.getByRole('img', { name: 'John Doe' })
}

const getFileInput = (container: HTMLElement) => {
    const input =
        container.querySelector<HTMLInputElement>('input[type="file"]')

    if (!input) {
        throw new Error('Avatar file input was not found')
    }

    return input
}

describe('Settings integration - avatar', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('uploads an image and updates the avatar', async () => {
        const user = userEvent.setup()

        const uploadedFile = new File(
            ['fake image content'],
            'new-avatar.png',
            { type: 'image/png' },
        )

        let receivedAvatar: string | null = null

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/profile', async ({ request }) => {
                const body = await request.text()

                const match = body.match(/name="avatar"\r?\n\r?\n([^\r\n]+)/)

                receivedAvatar = match?.[1] ?? null
                currentAvatar = updatedAvatar

                return HttpResponse.json({
                    avatar: currentAvatar,
                    name: 'John Doe',
                    role: 'Administrator',
                })
            }),
        )

        const { container, store } = renderSettingsPage()

        expect(
            await screen.findByRole('heading', {
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(getAvatar()).toHaveAttribute('src', initialAvatar)

        const fileInput = getFileInput(container)

        await user.upload(fileInput, uploadedFile)

        await waitFor(() => {
            expect(getAvatar()).toHaveAttribute('src', updatedAvatar)
        })

        expect(receivedAvatar).toBe('new-avatar.png')

        expect(store.getState().settings.settings?.profile).toEqual({
            avatar: updatedAvatar,
            name: 'John Doe',
            role: 'Administrator',
        })
    })

    it('handles an error when uploading the avatar and keeps the previous image', async () => {
        const user = userEvent.setup()

        const uploadedFile = new File(
            ['fake image content'],
            'invalid-upload.png',
            { type: 'image/png' },
        )

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/profile', () => {
                return HttpResponse.json(
                    { message: 'Failed to upload avatar' },
                    { status: 500 },
                )
            }),
        )

        const { container, store } = renderSettingsPage()

        expect(
            await screen.findByRole('heading', {
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(getAvatar()).toHaveAttribute('src', initialAvatar)

        const fileInput = getFileInput(container)

        await user.upload(fileInput, uploadedFile)

        await waitFor(() => {
            expect(store.getState().settings.settings?.profile?.avatar).toBe(
                initialAvatar,
            )
        })

        expect(getAvatar()).toHaveAttribute('src', initialAvatar)

        expect(
            screen.getByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()

        expect(screen.getByText('Administrator')).toBeInTheDocument()
    })

    it('keeps the profile information visible after a successful upload', async () => {
        const user = userEvent.setup()

        const uploadedFile = new File(
            ['fake image content'],
            'new-avatar.png',
            { type: 'image/png' },
        )

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/profile', () => {
                currentAvatar = updatedAvatar

                return HttpResponse.json({
                    avatar: currentAvatar,
                    name: 'John Doe',
                    role: 'Administrator',
                })
            }),
        )

        const { container, store } = renderSettingsPage()

        expect(
            await screen.findByRole('heading', {
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(getAvatar()).toHaveAttribute('src', initialAvatar)

        expect(screen.getByText('Administrator')).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: /change picture/i,
            }),
        ).toBeInTheDocument()

        const fileInput = getFileInput(container)

        await user.upload(fileInput, uploadedFile)

        await waitFor(() => {
            expect(getAvatar()).toHaveAttribute('src', updatedAvatar)

            expect(store.getState().settings.settings?.profile).toEqual({
                avatar: updatedAvatar,
                name: 'John Doe',
                role: 'Administrator',
            })
        })

        expect(
            screen.getByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()

        expect(screen.getByText('Administrator')).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: /change picture/i,
            }),
        ).toBeInTheDocument()
    })
})
