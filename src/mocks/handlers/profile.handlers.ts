import { delay, http, HttpResponse } from 'msw'
import { findProfileByUserId, getCurrentUser } from '../repositories'
import type { UserProfile } from '@/features/profile/types'

type GetUserProfileParams = {
    id: string
}

export const profileHandlers = [
    http.get<never, never, UserProfile>('/api/me', async ({ request }) => {
        await delay(1000)

        const authorization = request.headers.get('Authorization')

        if (!authorization) {
            return HttpResponse.json(null, {
                status: 401,
            })
        }

        const user = getCurrentUser()

        if (!user) {
            return HttpResponse.json(null, {
                status: 401,
            })
        }

        const profile = findProfileByUserId(user.id)

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
