import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import { formatCurrency } from '@/shared/utils'
import { ChartTooltip } from '@/shared/components'
import { MetricCard } from '@/features/dashboard/components'
import type { ChartValueFormatter, TodaySale } from '@/features/dashboard/types'
import styles from './TodaySales.module.scss'

type TodaySalesProps = {
    data: TodaySale
}

const formatCurrencyTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCurrency(value)
}

export const TodaySales = ({ data }: TodaySalesProps) => {
    return (
        <MetricCard
            title="Today Sales"
            value={formatCurrency(data.summary.total)}
            variation={data.summary.variation}
        >
            <BarChart
                className={styles.chart}
                data={data.chart}
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
                    content={ChartTooltip}
                    formatter={formatCurrencyTooltip}
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
