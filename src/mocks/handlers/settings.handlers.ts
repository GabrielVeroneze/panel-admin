import { delay, http, HttpResponse } from 'msw'
import { settingsDatabase } from '../database'
import type {
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
} from '@/features/settings/types'

type PasswordResponse = {
    success: boolean
}

export const settingsHandlers = [
    http.get<never, never, Settings>('/api/settings', async () => {
        await delay(1000)

        return HttpResponse.json(settingsDatabase)
    }),

    http.put<never, FormData, SettingsProfile>(
        '/api/settings/profile',
        async ({ request }) => {
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null

            if (avatar) {
                settingsDatabase.profile.avatar = URL.createObjectURL(avatar)
            }

            return HttpResponse.json(settingsDatabase.profile)
        },
    ),

    http.put<never, SettingsPreferences, SettingsPreferences>(
        '/api/settings/preferences',
        async ({ request }) => {
            const payload = await request.json()

            settingsDatabase.preferences = payload

            return HttpResponse.json(payload)
        },
    ),

    http.put<never, GeneralInformation, GeneralInformation>(
        '/api/settings/general',
        async ({ request }) => {
            const payload = await request.json()

            settingsDatabase.generalInformation = payload

            return HttpResponse.json(payload)
        },
    ),

    http.put<never, never, PasswordResponse>(
        '/api/settings/password',
        async () => {
            return HttpResponse.json({
                success: true,
            })
        },
    ),

    http.put<never, NotificationPreferences, NotificationPreferences>(
        '/api/settings/notifications',
        async ({ request }) => {
            const payload = await request.json()

            settingsDatabase.notifications = payload

            return HttpResponse.json(payload)
        },
    ),

    http.put<never, EmailPreferences, EmailPreferences>(
        '/api/settings/email-notifications',
        async ({ request }) => {
            const payload = await request.json()

            settingsDatabase.emailSettings = payload

            return HttpResponse.json(payload)
        },
    ),

    http.put(
        '/api/settings/social-accounts/:platform/connect',
        async ({ params }) => {
            const account = settingsDatabase.socialAccounts.find(
                (item) => item.platform === params.platform,
            )

            if (!account) {
                return HttpResponse.json(
                    { message: 'Account not found' },
                    { status: 404 },
                )
            }

            account.connected = true

            return HttpResponse.json(account)
        },
    ),

    http.put(
        '/api/settings/social-accounts/:platform/disconnect',
        async ({ params }) => {
            const account = settingsDatabase.socialAccounts.find(
                (item) => item.platform === params.platform,
            )

            if (!account) {
                return HttpResponse.json(
                    { message: 'Account not found' },
                    { status: 404 },
                )
            }

            account.connected = false

            return HttpResponse.json(account)
        },
    ),

    http.delete('/api/settings/connected-accounts/:id', async ({ params }) => {
        const id = Number(params.id)

        const remainingConnectedAccounts =
            settingsDatabase.connectedAccounts.filter(
                (account) => account.id !== id,
            )

        settingsDatabase.connectedAccounts = remainingConnectedAccounts

        return HttpResponse.json(null, {
            status: 204,
        })
    }),

    http.delete('/api/settings/devices/:id', async ({ params }) => {
        const deviceId = Number(params.id)

        const deviceExists = settingsDatabase.recentDevices.some(
            (device) => device.id === deviceId,
        )

        if (!deviceExists) {
            return HttpResponse.json(
                { message: 'Device not found' },
                { status: 404 },
            )
        }

        settingsDatabase.recentDevices = settingsDatabase.recentDevices.filter(
            (device) => device.id !== deviceId,
        )

        return HttpResponse.json({ success: true }, { status: 200 })
    }),
]
