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
            <Card className={styles.sales}>
                <SalesChart />
            </Card>
            <Card className={styles.todaySales}>
                <TodaySales />
            </Card>
            <Card className={styles.todayVisitors}>
                <TodayVisitors />
            </Card>
            <Card className={styles.weekVisitors}>
                <WeekVisitors />
            </Card>
            <Card className={styles.sessionsByCountry}>
                <SessionsByCountry />
            </Card>
            <Card className={styles.latestCustomers}>
                <LatestCustomersList />
            </Card>
            <Card className={styles.sessionsByDevice}>
                <SessionsByDevice />
            </Card>
            <Card className={styles.transactions}>
                <TransactionsTable />
            </Card>
        </section>
    )
}
