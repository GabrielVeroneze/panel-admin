import { delay, http, HttpResponse } from 'msw'
import {
    connectSocialAccount,
    disconnectSocialAccount,
    getCurrentSettings,
    removeConnectedAccount,
    removeDeviceSession,
    updateCurrentUserPassword,
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
    SocialAccount,
    SocialPlatform,
    UpdatePasswordPayload,
} from '@/features/settings/types'

type SettingsErrorResponse = {
    message: string
}

type PasswordResponse = {
    success?: boolean
    message?: string
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

    http.put<never, FormData, SettingsProfile | SettingsErrorResponse>(
        '/api/settings/profile',
        async ({ request }) => {
            await delay(1000)

            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null

            if (!avatar) {
                return HttpResponse.json(
                    {
                        message: 'Please select a profile picture.',
                    },
                    {
                        status: 400,
                    },
                )
            }

            const profile = updateSettingsProfileAvatar(avatar)

            if (!profile) {
                return HttpResponse.json(
                    {
                        message: 'Profile not found. Please try again.',
                    },
                    {
                        status: 404,
                    },
                )
            }

            return HttpResponse.json(profile)
        },
    ),

    http.put<
        never,
        SettingsPreferences,
        SettingsPreferences | SettingsErrorResponse
    >('/api/settings/preferences', async ({ request }) => {
        await delay(1000)

        const payload = await request.json()

        const preferences = updatePreferences(payload)

        if (!preferences) {
            return HttpResponse.json(
                {
                    message:
                        'Unable to update your language and timezone preferences.',
                },
                {
                    status: 404,
                },
            )
        }

        return HttpResponse.json(preferences)
    }),

    http.put<
        never,
        GeneralInformation,
        GeneralInformation | SettingsErrorResponse
    >('/api/settings/general', async ({ request }) => {
        await delay(1000)

        const payload = await request.json()

        const information = updateGeneralInformation(payload)

        if (!information) {
            return HttpResponse.json(
                {
                    message: 'Unable to find your profile information.',
                },
                {
                    status: 404,
                },
            )
        }

        return HttpResponse.json(information)
    }),

    http.put<
        never,
        UpdatePasswordPayload,
        PasswordResponse | SettingsErrorResponse
    >('/api/settings/password', async ({ request }) => {
        await delay(1000)

        const payload = await request.json()

        const updated = updateCurrentUserPassword(payload)

        if (!updated) {
            return HttpResponse.json(
                {
                    message: 'Current password is incorrect',
                },
                {
                    status: 400,
                },
            )
        }

        return HttpResponse.json({
            success: true,
        })
    }),

    http.put<
        never,
        NotificationPreferences,
        NotificationPreferences | SettingsErrorResponse
    >('/api/settings/notifications', async ({ request }) => {
        await delay(1000)

        const payload = await request.json()

        const notifications = updateNotifications(payload)

        if (!notifications) {
            return HttpResponse.json(
                {
                    message: 'Unable to update notification preferences.',
                },
                {
                    status: 404,
                },
            )
        }

        return HttpResponse.json(notifications)
    }),

    http.put<never, EmailPreferences, EmailPreferences | SettingsErrorResponse>(
        '/api/settings/email-notifications',
        async ({ request }) => {
            await delay(1000)

            const payload = await request.json()

            const emailSettings = updateEmailSettings(payload)

            if (!emailSettings) {
                return HttpResponse.json(
                    {
                        message: 'Unable to update email preferences.',
                    },
                    {
                        status: 404,
                    },
                )
            }

            return HttpResponse.json(emailSettings)
        },
    ),

    http.put<
        { platform: string },
        never,
        SocialAccount | SettingsErrorResponse
    >('/api/settings/social-accounts/:platform/connect', async ({ params }) => {
        await delay(1000)

        const account = connectSocialAccount(params.platform as SocialPlatform)

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
    }),

    http.put<
        { platform: string },
        never,
        SocialAccount | SettingsErrorResponse
    >(
        '/api/settings/social-accounts/:platform/disconnect',
        async ({ params }) => {
            await delay(1000)

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

    http.delete<{ id: string }, never, SettingsErrorResponse>(
        '/api/settings/connected-accounts/:id',
        async ({ params }) => {
            await delay(1000)

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

            return new HttpResponse(null, {
                status: 204,
            })
        },
    ),

    http.delete<{ id: string }, never, SettingsErrorResponse>(
        '/api/settings/devices/:id',
        async ({ params }) => {
            await delay(1000)

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

            return new HttpResponse(null, {
                status: 204,
            })
        },
    ),
]
