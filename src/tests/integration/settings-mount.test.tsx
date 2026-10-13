import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'

describe('Settings integration - mount', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('starts fetching settings and sets the initial loading state when the page mounts', async () => {
        let requestStarted = false
        let releaseRequest: (() => void) | undefined

        server.use(
            http.get('/api/settings', async () => {
                requestStarted = true

                await new Promise<void>((resolve) => {
                    releaseRequest = resolve
                })

                return HttpResponse.json(
                    { message: 'Request released by test' },
                    { status: 500 },
                )
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        try {
            await waitFor(() => {
                expect(requestStarted).toBe(true)
            })

            await waitFor(() => {
                expect(store.getState().settings.loading).toBe(true)
            })

            expect(store.getState().settings.settings).toBeNull()
        } finally {
            releaseRequest?.()
        }

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
        })
    })
})
