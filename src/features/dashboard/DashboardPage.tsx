import { Card } from '@/shared/components'
import { useDashboard } from './hooks'
import {
    LatestCustomersList,
    SalesChart,
    SessionsByCountry,
    SessionsByDevice,
    WeekVisitors,
    TodaySales,
    TodayVisitors,
    TransactionsTable,
} from './components'
import styles from './DashboardPage.module.scss'

export const DashboardPage = () => {
    const { data, loading } = useDashboard()

    if (loading) return <p>Loading...</p>

    if (!data) return <p>No data</p>

    return (
        <section className={styles.dashboard}>
            <Card as="article" className={styles.sales}>
                <SalesChart data={data.sales} />
            </Card>
            <Card as="article" className={styles.todaySales}>
                <TodaySales data={data.todaySales} />
            </Card>
            <Card as="article" className={styles.todayVisitors}>
                <TodayVisitors data={data.todayVisitors} />
            </Card>
            <Card as="article" className={styles.weekVisitors}>
                <WeekVisitors data={data.weekVisitors} />
            </Card>
            <Card as="article" className={styles.sessionsByCountry}>
                <SessionsByCountry data={data.sessionsByCountry} />
            </Card>
            <Card as="article" className={styles.latestCustomers}>
                <LatestCustomersList customers={data.latestCustomers} />
            </Card>
            <Card as="article" className={styles.sessionsByDevice}>
                <SessionsByDevice data={data.sessionsByDevice} />
            </Card>
            <Card as="article" className={styles.transactions}>
                <TransactionsTable transactions={data.transactions} />
            </Card>
        </section>
    )
}
