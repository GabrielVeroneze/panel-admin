import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router'
import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { UserProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'

describe('User Profile error', () => {
    it('handles an API error', async () => {
        server.use(
            http.get('/api/users/:id', () => {
                return HttpResponse.json(
                    { message: 'Internal Server Error' },
                    { status: 500 },
                )
            }),
        )

        const store = setupStore()

        renderWithProviders(
            <Routes>
                <Route path="/users/:userId" element={<UserProfilePage />} />
            </Routes>,
            { initialEntries: ['/users/2'], store },
        )

        expect(
            await screen.findByRole('heading', {
                name: 'Profile details unavailable',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Activity data unavailable',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'Timeline unavailable',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Profile information unavailable',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Admin Summary',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Experience',
            }),
        ).not.toBeInTheDocument()

        expect(store.getState().profile.loading).toBe(false)
        expect(store.getState().profile.userProfile).toBeNull()
        expect(store.getState().profile.myProfile).toBeNull()
    })
})
