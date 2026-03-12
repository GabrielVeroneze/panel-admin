import type {
    CountrySession,
    DeviceSession,
    LatestCustomer,
    Sale,
    TodaySale,
    TodayVisitor,
    Transaction,
    WeekVisitor,
} from '@/features/dashboard/types'

export type DashboardData = {
    sales: Sale[]
    todaySales: TodaySale[]
    todayVisitors: TodayVisitor[]
    weekVisitors: WeekVisitor[]
    sessionsByCountry: CountrySession[]
    latestCustomers: LatestCustomer[]
    sessionsByDevice: DeviceSession[]
    transactions: Transaction[]
}
