import { delay, http, HttpResponse } from 'msw'
import {
    connectSocialAccount,
    disconnectSocialAccount,
    getCurrentSettings,
    removeConnectedAccount,
    removeDeviceSession,
    updateEmailSettings,
    updateGeneralInformation,
    updateNotifications,
    updatePreferences,
    updateSettingsProfileAvatar,
} from '../repositories'
import type {
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
    SocialPlatform,
} from '@/features/settings/types'

type PasswordResponse = {
    success: boolean
}

export const settingsHandlers = [
    http.get<never, never, Settings>('/api/settings', async () => {
        await delay(1000)

        const settings = getCurrentSettings()

        if (!settings) {
            return HttpResponse.json(null, {
                status: 404,
            })
        }

        return HttpResponse.json(settings)
    }),

    http.put<never, FormData, SettingsProfile>(
        '/api/settings/profile',
        async ({ request }) => {
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null

            if (!avatar) {
                return HttpResponse.json(null, {
                    status: 400,
                })
            }

            const profile = updateSettingsProfileAvatar(avatar)

            if (!profile) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(profile)
        },
    ),

    http.put<never, SettingsPreferences, SettingsPreferences>(
        '/api/settings/preferences',
        async ({ request }) => {
            const payload = await request.json()

            const preferences = updatePreferences(payload)

            if (!preferences) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(preferences)
        },
    ),

    http.put<never, GeneralInformation, GeneralInformation>(
        '/api/settings/general',
        async ({ request }) => {
            const payload = await request.json()

            const information = updateGeneralInformation(payload)

            if (!information) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(information)
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

            const notifications = updateNotifications(payload)

            if (!notifications) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(notifications)
        },
    ),

    http.put<never, EmailPreferences, EmailPreferences>(
        '/api/settings/email-notifications',
        async ({ request }) => {
            const payload = await request.json()

            const emailSettings = updateEmailSettings(payload)

            if (!emailSettings) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(emailSettings)
        },
    ),

    http.put(
        '/api/settings/social-accounts/:platform/connect',
        async ({ params }) => {
            const account = connectSocialAccount(
                params.platform as SocialPlatform,
            )

            if (!account) {
                return HttpResponse.json(
                    {
                        message: 'Account not found',
                    },
                    {
                        status: 404,
                    },
                )
            }

            return HttpResponse.json(account)
        },
    ),

    http.put(
        '/api/settings/social-accounts/:platform/disconnect',
        async ({ params }) => {
            const account = disconnectSocialAccount(
                params.platform as SocialPlatform,
            )

            if (!account) {
                return HttpResponse.json(
                    {
                        message: 'Account not found',
                    },
                    {
                        status: 404,
                    },
                )
            }

            return HttpResponse.json(account)
        },
    ),

    http.delete('/api/settings/connected-accounts/:id', async ({ params }) => {
        const removed = removeConnectedAccount(Number(params.id))

        if (!removed) {
            return HttpResponse.json(
                {
                    message: 'Account not found',
                },
                {
                    status: 404,
                },
            )
        }

        return HttpResponse.json(null, {
            status: 204,
        })
    }),

    http.delete('/api/settings/devices/:id', async ({ params }) => {
        const removed = removeDeviceSession(Number(params.id))

        if (!removed) {
            return HttpResponse.json(
                {
                    message: 'Device not found',
                },
                {
                    status: 404,
                },
            )
        }

        return HttpResponse.json(null, {
            status: 204,
        })
    }),
]
