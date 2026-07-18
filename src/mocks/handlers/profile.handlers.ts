import { delay, http, HttpResponse } from 'msw'
import { findProfileByUserId, getCurrentProfile } from '../repositories'
import type { UserProfile } from '@/features/profile/types'

type GetUserProfileParams = {
    id: string
}

export const profileHandlers = [
    http.get<never, never, UserProfile>('/api/me', async () => {
        await delay(1000)

        const profile = getCurrentProfile()

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

            const profile = findProfileByUserId(Number(params.id))

            if (!profile) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(profile)
        },
    ),
]
