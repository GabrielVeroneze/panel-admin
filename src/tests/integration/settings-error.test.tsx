import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'

describe('Settings integration - error', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('renders the unavailable state and ends loading when the request fails', async () => {
        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(
                    { message: 'Internal server error' },
                    { status: 500 },
                )
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                "We couldn't load your account settings. Please try again later.",
            ),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
            expect(store.getState().settings.settings).toBeNull()
        })

        expect(
            screen.queryByRole('heading', {
                name: 'Language & Time',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'General information',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'No social accounts',
            }),
        ).not.toBeInTheDocument()
    })
})
