import { delay, http, HttpResponse } from 'msw'
import { getCurrentUserId, usersProfilesDatabase } from '../database'
import type { UserProfile } from '@/features/profile/types'

type GetUserProfileParams = {
    id: string
}

export const profileHandlers = [
    http.get<never, never, UserProfile>('/api/me', async () => {
        await delay(1000)

        const currentUserId = getCurrentUserId()

        if (!currentUserId) {
            return HttpResponse.json(null, {
                status: 401,
            })
        }

        const profile = usersProfilesDatabase.find(
            (profile) => profile.id === currentUserId,
        )

        if (!profile) {
            return HttpResponse.json(null, {
                status: 404,
            })
        }

        return HttpResponse.json(profile)
    }),

    http.get<GetUserProfileParams, never, UserProfile>(
        '/api/users/:id',
        async ({ params }) => {
            await delay(1000)

            const userId = Number(params.id)

            const userProfile = usersProfilesDatabase.find(
                (profile) => profile.id === userId,
            )

            if (!userProfile) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(userProfile)
        },
    ),
]
