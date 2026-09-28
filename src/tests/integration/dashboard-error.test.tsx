import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { waitFor } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

describe('Dashboard error', () => {
    it('handles an API error', async () => {
        server.use(
            http.get('/api/dashboard', () => {
                return new HttpResponse(null, {
                    status: 500,
                })
            }),
        )

        const store = setupStore()

        renderWithProviders(<DashboardPage />, { store })

        await waitFor(() => {
            expect(store.getState().dashboard.loading).toBe(false)
        })

        expect(store.getState().dashboard.data).toBeNull()
    })
})
