import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDashboard } from './useDashboard'
import { fetchDashboard } from '../store'
import { useAppDispatch, useAppSelector } from '@/store'
import type { DashboardData } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchDashboard: vi.fn(),
}))

const mockDispatch = vi.fn()

const dashboardData: DashboardData = {
    sales: [
        {
            date: '2026-09-01',
            templates: 100,
            hosting: 50,
        },
    ],
    todaySales: {
        summary: {
            total: 1000,
            variation: 10,
        },
        chart: [
            {
                time: '10:00',
                sales: 500,
                profit: 200,
            },
        ],
    },
    todayVisitors: {
        summary: {
            total: 500,
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
            total: 3500,
            variation: 8,
        },
        chart: [
            {
                key: 'mon',
                label: 'Mon',
                day: '01',
                users: 500,
            },
        ],
    },
    sessionsByCountry: [
        {
            countryCode: 'BR',
            countryName: 'Brazil',
            sessions: 1000,
            previousWeek: 900,
        },
    ],
    latestCustomers: [
        {
            id: 1,
            image: 'customer-1.jpg',
            name: 'John Doe',
            email: 'john@example.com',
            totalSpent: 500,
        },
    ],
    sessionsByDevice: [
        {
            metric: 'Sessions',
            device: 'Desktop',
            value: 60,
            fill: '#000000',
        },
    ],
    transactions: [
        {
            id: 1,
            description: {
                text: 'Payment from',
                highlight: 'John Doe',
            },
            date: '2026-09-01',
            amount: 100,
            status: 'completed',
        },
    ],
}

const mockDashboardState = (data: DashboardData | null, loading = false) => {
    vi.mocked(useAppSelector).mockReturnValue({
        data,
        loading,
    } as never)
}

const createFetchDashboardAction = () => ({
    type: 'dashboard/fetchDashboard/mock',
})

describe('useDashboard', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

        vi.mocked(fetchDashboard).mockImplementation(
            () => createFetchDashboardAction() as never,
        )
    })

    it('returns dashboard data from the store', () => {
        mockDashboardState(dashboardData)

        const { result } = renderHook(() => useDashboard())

        expect(result.current.data).toEqual(dashboardData)
        expect(result.current.loading).toBe(false)
    })

    it('returns the loading state from the store', () => {
        mockDashboardState(dashboardData, true)

        const { result } = renderHook(() => useDashboard())

        expect(result.current.loading).toBe(true)
    })

    it('returns null data from the store when dashboard data is not available', () => {
        mockDashboardState(null)

        const { result } = renderHook(() => useDashboard())

        expect(result.current.data).toBeNull()
        expect(result.current.loading).toBe(false)
    })

    it('dispatches fetchDashboard on mount', () => {
        mockDashboardState(null)

        const fetchDashboardAction = createFetchDashboardAction()

        vi.mocked(fetchDashboard).mockReturnValue(fetchDashboardAction as never)

        renderHook(() => useDashboard())

        expect(fetchDashboard).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(fetchDashboardAction)
    })

    it('does not dispatch fetchDashboard again when rerendering', () => {
        mockDashboardState(null)

        const fetchDashboardAction = createFetchDashboardAction()

        vi.mocked(fetchDashboard).mockReturnValue(fetchDashboardAction as never)

        const { rerender } = renderHook(() => useDashboard())

        expect(fetchDashboard).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)

        rerender()

        expect(fetchDashboard).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
})
