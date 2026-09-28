import { describe, expect, it } from 'vitest'
import { delay, HttpResponse, http } from 'msw'
import { act, screen, waitFor } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard'
import { fetchDashboard } from '@/features/dashboard/store'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { DashboardData } from '@/features/dashboard/types'

const initialData: DashboardData = {
    sales: [
        {
            date: '2026-09-28',
            templates: 100,
            hosting: 50,
        },
    ],
    todaySales: {
        summary: {
            total: 150,
            variation: 10,
        },
        chart: [
            {
                time: '10:00',
                sales: 100,
                profit: 50,
            },
        ],
    },
    todayVisitors: {
        summary: {
            total: 200,
            variation: 5,
        },
        chart: [
            {
                time: '10:00',
                visitors: 100,
            },
        ],
    },
    weekVisitors: {
        summary: {
            total: 1000,
            variation: 8,
        },
        chart: [
            {
                key: 'mon',
                label: 'Mon',
                day: 'Monday',
                users: 100,
            },
        ],
    },
    sessionsByCountry: [
        {
            countryCode: 'BR',
            countryName: 'Brazil',
            sessions: 500,
            previousWeek: 450,
        },
    ],
    latestCustomers: [
        {
            id: 1,
            image: '/customer.jpg',
            name: 'John Doe',
            email: 'john@example.com',
            totalSpent: 250,
        },
    ],
    sessionsByDevice: [
        {
            metric: 'Desktop',
            device: 'Desktop',
            value: 60,
            fill: '#000000',
        },
    ],
    transactions: [
        {
            id: 1,
            description: {
                text: 'Purchased Premium plan',
                highlight: 'Premium plan',
            },
            date: '2026-09-28',
            amount: 100,
            status: 'completed',
        },
    ],
}

const updatedData: DashboardData = {
    ...initialData,
    todaySales: {
        summary: {
            total: 300,
            variation: 20,
        },
        chart: [
            {
                time: '10:00',
                sales: 200,
                profit: 100,
            },
        ],
    },
}

describe('Dashboard refresh', () => {
    it('keeps previous data while a new request is loading', async () => {
        let requestCount = 0

        server.use(
            http.get('/api/dashboard', async () => {
                requestCount += 1

                if (requestCount === 1) {
                    return HttpResponse.json(initialData)
                }

                await delay(100)

                return HttpResponse.json(updatedData)
            }),
        )

        const store = setupStore()

        renderWithProviders(<DashboardPage />, { store })

        await waitFor(() => {
            expect(store.getState().dashboard.data).toEqual(initialData)
        })

        expect(store.getState().dashboard.loading).toBe(false)

        let refreshPromise: Promise<unknown>

        act(() => {
            refreshPromise = store.dispatch(fetchDashboard())
        })

        await waitFor(() => {
            expect(store.getState().dashboard.loading).toBe(true)
        })

        expect(store.getState().dashboard.data).toEqual(initialData)

        await act(async () => {
            await refreshPromise
        })

        await waitFor(() => {
            expect(store.getState().dashboard.loading).toBe(false)
        })

        expect(store.getState().dashboard.data).toEqual(updatedData)

        expect(
            screen.getByRole('heading', {
                name: 'Today Sales',
            }),
        ).toBeVisible()

        expect(requestCount).toBe(2)
    })
})
