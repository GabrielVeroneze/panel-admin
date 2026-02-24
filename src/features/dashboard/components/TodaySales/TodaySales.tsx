import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import { formatCurrency } from '@/shared/utils'
import { MetricCard } from '@/features/dashboard/components'
import styles from './TodaySales.module.scss'

const data = [
    { time: '09:00 AM', sales: 4000, profit: 2000 },
    { time: '11:00 AM', sales: 5000, profit: 4250 },
    { time: '13:00 PM', sales: 9000, profit: 3000 },
    { time: '15:00 PM', sales: 3500, profit: 2000 },
    { time: '17:00 PM', sales: 5000, profit: 4250 },
    { time: '19:00 PM', sales: 7000, profit: 3500 },
]

export const TodaySales = () => {
    const formatTooltip = (value?: number) =>
        value ? formatCurrency(value) : ''

    return (
        <MetricCard title="Today Sales" value={'$45,897'} variation={4.3}>
            <BarChart
                className={styles.chart}
                data={data}
                barSize={10}
                barGap={4}
                responsive
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="time" hide />
                <Tooltip
                    formatter={formatTooltip}
                    cursor={{ fill: '#f4f4f5' }}
                />
                <Bar
                    dataKey="sales"
                    name="Sales"
                    fill="#1c64f2"
                    radius={10}
                    activeBar={false}
                />
                <Bar
                    dataKey="profit"
                    name="Profit"
                    fill="#ff8a4c"
                    radius={10}
                    activeBar={false}
                />
            </BarChart>
        </MetricCard>
    )
}
