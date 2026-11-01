import type { DashboardData } from '@/features/dashboard/types'

export const dashboardData: DashboardData = {
    sales: [
        { date: '01 Apr', templates: 40000, hosting: 100000 },
        { date: '02 Apr', templates: 80000, hosting: 70000 },
    ],
    todaySales: {
        summary: { total: 45897, variation: 4.3 },
        chart: [
            { time: '09:00 AM', sales: 4000, profit: 2000 },
            { time: '11:00 AM', sales: 5000, profit: 4250 },
        ],
    },
    todayVisitors: {
        summary: { total: 6438, variation: 4.3 },
        chart: [
            { time: '09:00 AM', visitors: 450 },
            { time: '11:00 AM', visitors: 300 },
        ],
    },
    weekVisitors: {
        summary: { total: 566768, variation: 10 },
        chart: [
            { key: 'mon', label: 'M', day: 'Monday', users: 50000 },
            { key: 'tue', label: 'T', day: 'Tuesday', users: 80000 },
        ],
    },
    sessionsByCountry: [
        {
            countryCode: 'US',
            countryName: 'United States',
            sessions: 40000,
            previousWeek: 30000,
        },
        {
            countryCode: 'CA',
            countryName: 'Canada',
            sessions: 30000,
            previousWeek: 20000,
        },
    ],
    latestCustomers: [
        {
            id: 1,
            image: 'https://i.pravatar.cc/150?img=11',
            name: 'Ethan Walker',
            email: 'ethan.walker@example.com',
            totalSpent: 367,
        },
    ],
    sessionsByDevice: [
        { metric: 'Traffic', device: 'Desktop', value: 54, fill: '#16bdca' },
        { metric: 'Traffic', device: 'Tablet', value: 23, fill: '#ff8a4c' },
        { metric: 'Traffic', device: 'Mobile', value: 23, fill: '#1c64f2' },
    ],
    transactions: [
        {
            id: 1,
            description: {
                text: 'Payment from',
                highlight: 'Bonnie Green',
            },
            date: 'Apr 23, 2021',
            amount: 2300,
            status: 'completed',
        },
        {
            id: 2,
            description: {
                text: 'Payment refund to',
                highlight: '#00910',
            },
            date: 'Apr 23, 2021',
            amount: -670,
            status: 'cancelled',
        },
    ],
}

export const emptyDashboardData: DashboardData = {
    sales: [],
    todaySales: {
        summary: { total: 0, variation: 0 },
        chart: [],
    },
    todayVisitors: {
        summary: { total: 0, variation: 0 },
        chart: [],
    },
    weekVisitors: {
        summary: { total: 0, variation: 0 },
        chart: [],
    },
    sessionsByCountry: [],
    latestCustomers: [],
    sessionsByDevice: [],
    transactions: [],
}
