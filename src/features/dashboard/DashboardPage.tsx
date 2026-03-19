import { Card } from '@/shared/components'
import { PageLayout } from '@/shared/layout'
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

    return (
        <PageLayout>
            <section className={styles.dashboard}>
                <Card as="article" className={styles.sales}>
                    <SalesChart data={data?.sales} loading={loading} />
                </Card>
                <Card as="article" className={styles.todaySales}>
                    <TodaySales data={data?.todaySales} loading={loading} />
                </Card>
                <Card as="article" className={styles.todayVisitors}>
                    <TodayVisitors
                        data={data?.todayVisitors}
                        loading={loading}
                    />
                </Card>
                <Card as="article" className={styles.weekVisitors}>
                    <WeekVisitors data={data?.weekVisitors} loading={loading} />
                </Card>
                <Card as="article" className={styles.sessionsByCountry}>
                    <SessionsByCountry
                        data={data?.sessionsByCountry}
                        loading={loading}
                    />
                </Card>
                <Card as="article" className={styles.latestCustomers}>
                    <LatestCustomersList
                        customers={data?.latestCustomers}
                        loading={loading}
                    />
                </Card>
                <Card as="article" className={styles.sessionsByDevice}>
                    <SessionsByDevice
                        data={data?.sessionsByDevice}
                        loading={loading}
                    />
                </Card>
                <Card as="article" className={styles.transactions}>
                    <TransactionsTable
                        transactions={data?.transactions}
                        loading={loading}
                    />
                </Card>
            </section>
        </PageLayout>
    )
}
