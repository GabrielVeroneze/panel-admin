import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { screen } from '@testing-library/react'
import { DashboardPage } from '@/features/dashboard'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'

describe('Dashboard empty data', () => {
    it('handles an empty API response', async () => {
        server.use(
            http.get('/api/dashboard', () => {
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

        renderWithProviders(<DashboardPage />, { store })

        expect(
            await screen.findByRole('heading', {
                name: 'No sales data',
            }),
        ).toBeVisible()

        expect(
            screen.getAllByRole('heading', {
                name: 'No data',
            }),
        ).toHaveLength(3)

        expect(
            screen.getByRole('heading', {
                name: 'No session data',
            }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', {
                name: 'No customers',
            }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', {
                name: 'No device data',
            }),
        ).toBeVisible()

        expect(
            screen.getByRole('heading', {
                name: 'No transactions',
            }),
        ).toBeVisible()

        expect(store.getState().dashboard.loading).toBe(false)

        expect(store.getState().dashboard.data).toEqual({
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
    })
})
