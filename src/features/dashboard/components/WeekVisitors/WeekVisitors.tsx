import { Bar, BarChart, Tooltip, XAxis, type TooltipProps } from 'recharts'
import { formatCompactNumber } from '@/shared/utils'
import { ChartTooltip } from '@/shared/components'
import { MetricCard } from '@/features/dashboard/components'
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

export const WeekVisitors = () => {
    const formatUsersValue: TooltipProps<number, string>['formatter'] = (
        value,
    ) => {
        if (typeof value !== 'number') return value

        return formatCompactNumber(value)
    }

    const formatDayLabel: TooltipProps<number, string>['labelFormatter'] = (
        _label,
        payload,
    ) => {
        return payload[0].payload.day
    }

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
                    labelFormatter={formatDayLabel}
                    formatter={formatUsersValue}
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
