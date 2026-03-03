import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import { formatCompactNumber } from '@/shared/utils'
import { ChartTooltip } from '@/shared/components'
import { MetricCard } from '@/features/dashboard/components'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
} from '@/features/dashboard/types'
import styles from './WeekVisitors.module.scss'

const data = [
    { key: 'mon', label: 'M', day: 'Monday', users: 50000 },
    { key: 'tue', label: 'T', day: 'Tuesday', users: 80000 },
    { key: 'wed', label: 'W', day: 'Wednesday', users: 90000 },
    { key: 'thu', label: 'T', day: 'Thursday', users: 50000 },
    { key: 'fri', label: 'F', day: 'Friday', users: 90000 },
    { key: 'sat', label: 'S', day: 'Saturday', users: 40000 },
    { key: 'sun', label: 'S', day: 'Sunday', users: 55000 },
]

const formatUsersTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactNumber(value)
}

const formatDayTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.day ?? ''
}

export const WeekVisitors = () => {
    return (
        <MetricCard title="This Week Visitors" value={'566,768'} variation={10}>
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
                <XAxis
                    dataKey="key"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tickFormatter={(_value, index) => data[index].label}
                />
                <Tooltip
                    content={ChartTooltip}
                    labelFormatter={formatDayTooltipLabel}
                    formatter={formatUsersTooltip}
                    cursor={false}
                />
                <Bar
                    dataKey="users"
                    name="Users"
                    fill="#1c64f2"
                    radius={10}
                    background={{ fill: '#f4f4f5', radius: 10 }}
                />
            </BarChart>
        </MetricCard>
    )
}
