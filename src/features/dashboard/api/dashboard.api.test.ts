import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { getDashboard } from './dashboard.api'
import { server } from '@/mocks/server'
import type { DashboardData } from '../types'

describe('getDashboard', () => {
    it('fetches dashboard data successfully', async () => {
        const dashboardData: DashboardData = {
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
        }

        server.use(
            http.get('/api/dashboard', () => {
                return HttpResponse.json(dashboardData)
            }),
        )

        const result = await getDashboard()

        expect(result).toEqual(dashboardData)
    })

    it('throws when the request fails', async () => {
        server.use(
            http.get('/api/dashboard', () => {
                return new HttpResponse(null, {
                    status: 500,
                })
            }),
        )

        await expect(getDashboard()).rejects.toThrow()
    })
})
