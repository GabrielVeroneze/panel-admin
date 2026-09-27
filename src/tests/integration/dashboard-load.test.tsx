import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { DashboardData } from '@/features/dashboard/types'

const dashboardData: DashboardData = {
    sales: [
        {
            date: 'Jan',
            templates: 120000,
            hosting: 80000,
        },
        {
            date: 'Feb',
            templates: 150000,
            hosting: 95000,
        },
    ],
    todaySales: {
        summary: {
            total: 12500,
            variation: 12.5,
        },
        chart: [
            {
                time: '09:00',
                sales: 5000,
                profit: 2000,
            },
            {
                time: '12:00',
                sales: 7500,
                profit: 3500,
            },
        ],
    },
    todayVisitors: {
        summary: {
            total: 8500,
            variation: 8.4,
        },
        chart: [
            {
                time: '09:00',
                visitors: 1200,
            },
            {
                time: '12:00',
                visitors: 2400,
            },
        ],
    },
    weekVisitors: {
        summary: {
            total: 42000,
            variation: 6.8,
        },
        chart: [
            {
                key: 'mon',
                label: 'Mon',
                day: 'Monday',
                users: 6000,
            },
            {
                key: 'tue',
                label: 'Tue',
                day: 'Tuesday',
                users: 6500,
            },
        ],
    },
    sessionsByCountry: [
        {
            countryCode: 'BR',
            countryName: 'Brazil',
            sessions: 12500,
            previousWeek: 10000,
        },
        {
            countryCode: 'US',
            countryName: 'United States',
            sessions: 9800,
            previousWeek: 10500,
        },
    ],
    latestCustomers: [
        {
            id: 1,
            image: '/avatar-1.jpg',
            name: 'John Doe',
            email: 'john@example.com',
            totalSpent: 1250,
        },
        {
            id: 2,
            image: '/avatar-2.jpg',
            name: 'Jane Doe',
            email: 'jane@example.com',
            totalSpent: 980,
        },
    ],
    sessionsByDevice: [
        {
            metric: 'Desktop',
            device: 'Desktop',
            value: 60,
            fill: '#1c64f2',
        },
        {
            metric: 'Mobile',
            device: 'Mobile',
            value: 30,
            fill: '#ff8a4c',
        },
        {
            metric: 'Tablet',
            device: 'Tablet',
            value: 10,
            fill: '#76a9fa',
        },
    ],
    transactions: [
        {
            id: 1,
            description: {
                text: 'Payment for',
                highlight: 'Premium plan',
            },
            date: 'Sep 26, 2026',
            amount: 1250,
            status: 'completed',
        },
        {
            id: 2,
            description: {
                text: 'Payment for',
                highlight: 'Basic plan',
            },
            date: 'Sep 25, 2026',
            amount: 980,
            status: 'inProgress',
        },
    ],
}

describe('Dashboard integration', () => {
    it('loads the complete dashboard data successfully', async () => {
        server.use(
            http.get('/api/dashboard', () => {
                return HttpResponse.json(dashboardData)
            }),
        )

        const store = setupStore()

        renderWithProviders(<DashboardPage />, {
            store,
        })

        expect(
            screen.queryByRole('heading', { name: 'Sales' }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'Sessions by Country' }),
        ).not.toBeInTheDocument()

        await screen.findByRole('heading', {
            name: 'Sales',
        })

        expect(
            screen.getByRole('heading', { name: 'Today Sales' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'Today Visitors' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'This Week Visitors' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'Sessions by Country' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'Latest Customers' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'Sessions by Device' }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', { name: 'Transactions' }),
        ).toBeVisible()

        expect(screen.getByText('Brazil')).toBeVisible()
        expect(screen.getByText('John Doe')).toBeVisible()
        expect(screen.getByText('Premium plan')).toBeVisible()

        await waitFor(() => {
            const state = store.getState().dashboard

            expect(state.loading).toBe(false)
            expect(state.data).toEqual(dashboardData)
        })
    })
})
