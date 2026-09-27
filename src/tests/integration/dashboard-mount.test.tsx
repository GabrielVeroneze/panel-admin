import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { waitFor } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

describe('Dashboard mount', () => {
    it('starts loading dashboard data when the page mounts', async () => {
        let requestReceived = false

        server.use(
            http.get('/api/dashboard', () => {
                requestReceived = true

                return HttpResponse.json({
                    sales: [],
                    todaySales: {
                        summary: {
                            total: 0,
                            variation: 0,
                        },
                        chart: [],
                    },
                    todayVisitors: {
                        summary: {
                            total: 0,
                            variation: 0,
                        },
                        chart: [],
                    },
                    weekVisitors: {
                        summary: {
                            total: 0,
                            variation: 0,
                        },
                        chart: [],
                    },
                    sessionsByCountry: [],
                    latestCustomers: [],
                    sessionsByDevice: [],
                    transactions: [],
                })
            }),
        )

        const store = setupStore()

        renderWithProviders(<DashboardPage />, {
            store,
        })

        await waitFor(() => {
            expect(requestReceived).toBe(true)
        })
    })
})
