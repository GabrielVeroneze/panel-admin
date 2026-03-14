import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/api/dashboard', () => {
        return HttpResponse.json({
            sales: [
                { date: '01 Apr', templates: 40000, hosting: 100000 },
                { date: '02 Apr', templates: 80000, hosting: 70000 },
                { date: '03 Apr', templates: 80000, hosting: 140000 },
                { date: '04 Apr', templates: 160000, hosting: 120000 },
                { date: '05 Apr', templates: 140000, hosting: 50000 },
                { date: '06 Apr', templates: 130000, hosting: 90000 },
                { date: '07 Apr', templates: 100000, hosting: 50000 },
            ],
            latestCustomers: [
                {
                    id: 1,
                    image: 'https://i.pravatar.cc/150?img=11',
                    name: 'Ethan Walker',
                    email: 'ethan.walker@example.com',
                    totalSpent: 367,
                },
                {
                    id: 2,
                    image: 'https://i.pravatar.cc/150?img=12',
                    name: 'Olivia Bennett',
                    email: 'olivia.bennett@example.com',
                    totalSpent: 67,
                },
                {
                    id: 3,
                    image: 'https://i.pravatar.cc/150?img=13',
                    name: 'Noah Thompson',
                    email: 'noah.thompson@example.com',
                    totalSpent: 3467,
                },
                {
                    id: 4,
                    image: 'https://i.pravatar.cc/150?img=14',
                    name: 'Ava Richardson',
                    email: 'ava.richardson@example.com',
                    totalSpent: 2367,
                },
                {
                    id: 5,
                    image: 'https://i.pravatar.cc/150?img=15',
                    name: 'Liam Anderson',
                    email: 'liam.anderson@example.com',
                    totalSpent: 367,
                },
                {
                    id: 6,
                    image: 'https://i.pravatar.cc/150?img=16',
                    name: 'Sophia Mitchell',
                    email: 'sophia.mitchell@example.com',
                    totalSpent: 1367,
                },
            ],
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
                {
                    countryCode: 'MX',
                    countryName: 'Mexico',
                    sessions: 20000,
                    previousWeek: 18000,
                },
                {
                    countryCode: 'CO',
                    countryName: 'Colombia',
                    sessions: 5000,
                    previousWeek: 4000,
                },
                {
                    countryCode: 'PE',
                    countryName: 'Peru',
                    sessions: 15000,
                    previousWeek: 12000,
                },
                {
                    countryCode: 'BO',
                    countryName: 'Bolivia',
                    sessions: 15000,
                    previousWeek: 13000,
                },
                {
                    countryCode: 'ES',
                    countryName: 'Spain',
                    sessions: 10000,
                    previousWeek: 9000,
                },
                {
                    countryCode: 'FR',
                    countryName: 'France',
                    sessions: 25000,
                    previousWeek: 8000,
                },
                {
                    countryCode: 'IT',
                    countryName: 'Italy',
                    sessions: 20000,
                    previousWeek: 9500,
                },
                {
                    countryCode: 'RU',
                    countryName: 'Russia',
                    sessions: 5000,
                    previousWeek: 6000,
                },
                {
                    countryCode: 'IR',
                    countryName: 'Iran',
                    sessions: 5000,
                    previousWeek: 4000,
                },
                {
                    countryCode: 'PK',
                    countryName: 'Pakistan',
                    sessions: 5000,
                    previousWeek: 4500,
                },
                {
                    countryCode: 'IN',
                    countryName: 'India',
                    sessions: 15000,
                    previousWeek: 12000,
                },
                {
                    countryCode: 'CN',
                    countryName: 'China',
                    sessions: 15000,
                    previousWeek: 14000,
                },
                {
                    countryCode: 'MY',
                    countryName: 'Malaysia',
                    sessions: 5000,
                    previousWeek: 4800,
                },
                {
                    countryCode: 'ID',
                    countryName: 'Indonesia',
                    sessions: 15000,
                    previousWeek: 18000,
                },
                {
                    countryCode: 'AU',
                    countryName: 'Australia',
                    sessions: 18000,
                    previousWeek: 17000,
                },
                {
                    countryCode: 'SD',
                    countryName: 'Sudan',
                    sessions: 5000,
                    previousWeek: 4000,
                },
                {
                    countryCode: 'SS',
                    countryName: 'South Sudan',
                    sessions: 5000,
                    previousWeek: 4500,
                },
                {
                    countryCode: 'AO',
                    countryName: 'Angola',
                    sessions: 5000,
                    previousWeek: 4200,
                },
            ],
            sessionsByDevice: [
                {
                    metric: 'Traffic',
                    device: 'Desktop',
                    value: 54,
                    fill: '#16bdca',
                },
                {
                    metric: 'Traffic',
                    device: 'Tablet',
                    value: 23,
                    fill: '#ff8a4c',
                },
                {
                    metric: 'Traffic',
                    device: 'Mobile',
                    value: 23,
                    fill: '#1c64f2',
                },
            ],
            todaySales: {
                summary: {
                    total: 45897,
                    variation: 4.3,
                },
                chart: [
                    { time: '09:00 AM', sales: 4000, profit: 2000 },
                    { time: '11:00 AM', sales: 5000, profit: 4250 },
                    { time: '13:00 PM', sales: 9000, profit: 3000 },
                    { time: '15:00 PM', sales: 3500, profit: 2000 },
                    { time: '17:00 PM', sales: 5000, profit: 4250 },
                    { time: '19:00 PM', sales: 7000, profit: 3500 },
                ],
            },
            todayVisitors: {
                summary: {
                    total: 6438,
                    variation: 4.3,
                },
                chart: [
                    {
                        time: '09:00 AM',
                        visitors: 450,
                    },
                    {
                        time: '11:00 AM',
                        visitors: 300,
                    },
                    {
                        time: '13:00 PM',
                        visitors: 350,
                    },
                    {
                        time: '15:00 PM',
                        visitors: 250,
                    },
                    {
                        time: '17:00 PM',
                        visitors: 500,
                    },
                    {
                        time: '19:00 PM',
                        visitors: 150,
                    },
                    {
                        time: '21:00 PM',
                        visitors: 250,
                    },
                    {
                        time: '23:00 PM',
                        visitors: 175,
                    },
                ],
            },
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
                    status: 'completed',
                },
                {
                    id: 3,
                    description: {
                        text: 'Payment failed from',
                        highlight: '#087651',
                    },
                    date: 'Apr 18, 2021',
                    amount: 234,
                    status: 'cancelled',
                },
                {
                    id: 4,
                    description: {
                        text: 'Payment from',
                        highlight: 'Bonnie Green',
                    },
                    date: 'Apr 15, 2021',
                    amount: 5000,
                    status: 'inProgress',
                },
                {
                    id: 5,
                    description: {
                        text: 'Payment from',
                        highlight: 'Jese Leos',
                    },
                    date: 'Apr 15, 2021',
                    amount: 2300,
                    status: 'completed',
                },
                {
                    id: 6,
                    description: {
                        text: 'Payment from',
                        highlight: 'THEMBERG LLC',
                    },
                    date: 'Apr 11, 2021',
                    amount: 280,
                    status: 'completed',
                },
            ],
            weekVisitors: {
                summary: {
                    total: 566768,
                    variation: 10,
                },
                chart: [
                    { key: 'mon', label: 'M', day: 'Monday', users: 50000 },
                    { key: 'tue', label: 'T', day: 'Tuesday', users: 80000 },
                    { key: 'wed', label: 'W', day: 'Wednesday', users: 90000 },
                    { key: 'thu', label: 'T', day: 'Thursday', users: 50000 },
                    { key: 'fri', label: 'F', day: 'Friday', users: 90000 },
                    { key: 'sat', label: 'S', day: 'Saturday', users: 40000 },
                    { key: 'sun', label: 'S', day: 'Sunday', users: 55000 },
                ],
            },
        })
    }),
]
