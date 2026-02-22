import { Card } from '@/shared/components'
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
    return (
        <section className={styles.dashboard}>
            <Card as="article" className={styles.sales}>
                <SalesChart />
            </Card>
            <Card as="article" className={styles.todaySales}>
                <TodaySales />
            </Card>
            <Card as="article" className={styles.todayVisitors}>
                <TodayVisitors />
            </Card>
            <Card as="article" className={styles.weekVisitors}>
                <WeekVisitors />
            </Card>
            <Card as="article" className={styles.sessionsByCountry}>
                <SessionsByCountry />
            </Card>
            <Card as="article" className={styles.latestCustomers}>
                <LatestCustomersList />
            </Card>
            <Card as="article" className={styles.sessionsByDevice}>
                <SessionsByDevice />
            </Card>
            <Card as="article" className={styles.transactions}>
                <TransactionsTable />
            </Card>
        </section>
    )
}
