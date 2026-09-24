import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getDashboard } from '../api'
import { fetchDashboard } from './dashboard.thunks'
import type { DashboardData } from '../types'

vi.mock('../api', () => ({
    getDashboard: vi.fn(),
}))

const mockedGetDashboard = vi.mocked(getDashboard)

describe('fetchDashboard', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fulfills with dashboard data', async () => {
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

        mockedGetDashboard.mockResolvedValue(dashboardData)

        const dispatch = vi.fn()
        const getState = vi.fn()

        const result = await fetchDashboard()(dispatch, getState, undefined)

        expect(result).toMatchObject({
            type: 'dashboard/fetchDashboard/fulfilled',
            payload: dashboardData,
        })

        expect(mockedGetDashboard).toHaveBeenCalledTimes(1)
    })

    it('rejects when getDashboard fails', async () => {
        const error = new Error('Failed to fetch dashboard')

        mockedGetDashboard.mockRejectedValue(error)

        const dispatch = vi.fn()
        const getState = vi.fn()

        const result = await fetchDashboard()(dispatch, getState, undefined)

        expect(result).toMatchObject({
            type: 'dashboard/fetchDashboard/rejected',
        })

        expect(result).toMatchObject({
            error: {
                message: 'Failed to fetch dashboard',
            },
        })

        expect(mockedGetDashboard).toHaveBeenCalledTimes(1)
    })
})
