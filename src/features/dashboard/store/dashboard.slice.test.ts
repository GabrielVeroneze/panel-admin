import { describe, expect, it, vi } from 'vitest'
import reducer from './dashboard.slice'
import { fetchDashboard } from './dashboard.thunks'
import type { DashboardData } from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
    },
}))

describe('dashboardSlice', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual({
            data: null,
            loading: false,
        })
    })

    it('sets loading to true when fetchDashboard is pending', () => {
        const state = reducer(undefined, fetchDashboard.pending('request-id'))

        expect(state).toEqual({
            data: null,
            loading: true,
        })
    })

    it('sets loading to false and stores dashboard data when fetchDashboard is fulfilled', () => {
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

        const state = reducer(
            {
                data: null,
                loading: true,
            },
            fetchDashboard.fulfilled(dashboardData, 'request-id'),
        )

        expect(state).toEqual({
            data: dashboardData,
            loading: false,
        })
    })
})
