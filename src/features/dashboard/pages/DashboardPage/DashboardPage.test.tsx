import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useDashboard } from '@/features/dashboard/hooks'
import { DashboardPage } from './DashboardPage'
import type { DashboardData } from '@/features/dashboard/types'

vi.mock('@/features/dashboard/hooks', () => ({
    useDashboard: vi.fn(),
}))

vi.mock('@/features/dashboard/components', () => ({
    LatestCustomersList: ({
        customers,
        loading,
    }: {
        customers?: DashboardData['latestCustomers']
        loading?: boolean
    }) => (
        <div data-testid="latest-customers-list">
            {loading ? 'loading' : 'loaded'}
            {customers && `-${customers.length}`}
        </div>
    ),

    SalesChart: ({
        data,
        loading,
    }: {
        data?: DashboardData['sales']
        loading?: boolean
    }) => (
        <div data-testid="sales-chart">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.length}`}
        </div>
    ),

    SessionsByCountry: ({
        data,
        loading,
    }: {
        data?: DashboardData['sessionsByCountry']
        loading?: boolean
    }) => (
        <div data-testid="sessions-by-country">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.length}`}
        </div>
    ),

    SessionsByDevice: ({
        data,
        loading,
    }: {
        data?: DashboardData['sessionsByDevice']
        loading?: boolean
    }) => (
        <div data-testid="sessions-by-device">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.length}`}
        </div>
    ),

    WeekVisitors: ({
        data,
        loading,
    }: {
        data?: DashboardData['weekVisitors']
        loading?: boolean
    }) => (
        <div data-testid="week-visitors">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.summary.total}`}
        </div>
    ),

    TodaySales: ({
        data,
        loading,
    }: {
        data?: DashboardData['todaySales']
        loading?: boolean
    }) => (
        <div data-testid="today-sales">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.summary.total}`}
        </div>
    ),

    TodayVisitors: ({
        data,
        loading,
    }: {
        data?: DashboardData['todayVisitors']
        loading?: boolean
    }) => (
        <div data-testid="today-visitors">
            {loading ? 'loading' : 'loaded'}
            {data && `-${data.summary.total}`}
        </div>
    ),

    TransactionsTable: ({
        transactions,
        loading,
    }: {
        transactions?: DashboardData['transactions']
        loading?: boolean
    }) => (
        <div data-testid="transactions-table">
            {loading ? 'loading' : 'loaded'}
            {transactions && `-${transactions.length}`}
        </div>
    ),
}))

const mockedUseDashboard = vi.mocked(useDashboard)

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

describe('DashboardPage', () => {
    it('renders the dashboard section', () => {
        mockedUseDashboard.mockReturnValue({
            data: null,
            loading: false,
        })

        const { container } = render(<DashboardPage />)

        expect(container.firstElementChild).toHaveClass('dashboard')
    })

    it('renders all dashboard cards', () => {
        mockedUseDashboard.mockReturnValue({
            data: dashboardData,
            loading: false,
        })

        const { container } = render(<DashboardPage />)

        const cards = container.querySelectorAll('article')

        expect(cards).toHaveLength(8)
    })

    it('renders each dashboard section in its corresponding card', () => {
        mockedUseDashboard.mockReturnValue({
            data: dashboardData,
            loading: false,
        })

        const { container } = render(<DashboardPage />)

        expect(container.querySelector('article.sales')).toContainElement(
            screen.getByTestId('sales-chart'),
        )

        expect(container.querySelector('article.todaySales')).toContainElement(
            screen.getByTestId('today-sales'),
        )

        expect(
            container.querySelector('article.todayVisitors'),
        ).toContainElement(screen.getByTestId('today-visitors'))

        expect(
            container.querySelector('article.weekVisitors'),
        ).toContainElement(screen.getByTestId('week-visitors'))

        expect(
            container.querySelector('article.sessionsByCountry'),
        ).toContainElement(screen.getByTestId('sessions-by-country'))

        expect(
            container.querySelector('article.latestCustomers'),
        ).toContainElement(screen.getByTestId('latest-customers-list'))

        expect(
            container.querySelector('article.sessionsByDevice'),
        ).toContainElement(screen.getByTestId('sessions-by-device'))

        expect(
            container.querySelector('article.transactions'),
        ).toContainElement(screen.getByTestId('transactions-table'))
    })

    it('renders all dashboard components when data is available', () => {
        mockedUseDashboard.mockReturnValue({
            data: dashboardData,
            loading: false,
        })

        render(<DashboardPage />)

        expect(screen.getByTestId('sales-chart')).toHaveTextContent('loaded-2')

        expect(screen.getByTestId('today-sales')).toHaveTextContent(
            'loaded-12500',
        )

        expect(screen.getByTestId('today-visitors')).toHaveTextContent(
            'loaded-8500',
        )

        expect(screen.getByTestId('week-visitors')).toHaveTextContent(
            'loaded-42000',
        )

        expect(screen.getByTestId('sessions-by-country')).toHaveTextContent(
            'loaded-2',
        )

        expect(screen.getByTestId('latest-customers-list')).toHaveTextContent(
            'loaded-2',
        )

        expect(screen.getByTestId('sessions-by-device')).toHaveTextContent(
            'loaded-2',
        )

        expect(screen.getByTestId('transactions-table')).toHaveTextContent(
            'loaded-2',
        )
    })

    it('passes the loading state to all dashboard components', () => {
        mockedUseDashboard.mockReturnValue({
            data: null,
            loading: true,
        })

        render(<DashboardPage />)

        expect(screen.getByTestId('sales-chart')).toHaveTextContent('loading')
        expect(screen.getByTestId('today-sales')).toHaveTextContent('loading')
        expect(screen.getByTestId('today-visitors')).toHaveTextContent(
            'loading',
        )
        expect(screen.getByTestId('week-visitors')).toHaveTextContent('loading')
        expect(screen.getByTestId('sessions-by-country')).toHaveTextContent(
            'loading',
        )
        expect(screen.getByTestId('latest-customers-list')).toHaveTextContent(
            'loading',
        )
        expect(screen.getByTestId('sessions-by-device')).toHaveTextContent(
            'loading',
        )
        expect(screen.getByTestId('transactions-table')).toHaveTextContent(
            'loading',
        )
    })

    it('passes the corresponding data to each dashboard component', () => {
        mockedUseDashboard.mockReturnValue({
            data: dashboardData,
            loading: false,
        })

        render(<DashboardPage />)

        expect(screen.getByTestId('sales-chart')).toHaveTextContent('-2')

        expect(screen.getByTestId('today-sales')).toHaveTextContent('-12500')

        expect(screen.getByTestId('today-visitors')).toHaveTextContent('-8500')

        expect(screen.getByTestId('week-visitors')).toHaveTextContent('-42000')

        expect(screen.getByTestId('sessions-by-country')).toHaveTextContent(
            '-2',
        )

        expect(screen.getByTestId('latest-customers-list')).toHaveTextContent(
            '-2',
        )

        expect(screen.getByTestId('sessions-by-device')).toHaveTextContent('-2')

        expect(screen.getByTestId('transactions-table')).toHaveTextContent('-2')
    })

    it('passes undefined data to dashboard components when dashboard data is not available', () => {
        mockedUseDashboard.mockReturnValue({
            data: null,
            loading: false,
        })

        render(<DashboardPage />)

        expect(screen.getByTestId('sales-chart')).toHaveTextContent('loaded')
        expect(screen.getByTestId('today-sales')).toHaveTextContent('loaded')
        expect(screen.getByTestId('today-visitors')).toHaveTextContent('loaded')
        expect(screen.getByTestId('week-visitors')).toHaveTextContent('loaded')
        expect(screen.getByTestId('sessions-by-country')).toHaveTextContent(
            'loaded',
        )
        expect(screen.getByTestId('latest-customers-list')).toHaveTextContent(
            'loaded',
        )
        expect(screen.getByTestId('sessions-by-device')).toHaveTextContent(
            'loaded',
        )
        expect(screen.getByTestId('transactions-table')).toHaveTextContent(
            'loaded',
        )
    })
})
