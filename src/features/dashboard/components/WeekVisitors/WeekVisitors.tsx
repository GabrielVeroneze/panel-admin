import { Bar, BarChart, Tooltip, XAxis, type TooltipProps } from 'recharts'
import { formatCompactNumber } from '@/shared/utils'
import { MetricCard } from '@/features/dashboard/components'
import styles from './WeekVisitors.module.scss'

const data = [
    { name: 'M', day: 'Monday', users: 50000 },
    { name: 'T', day: 'Tuesday', users: 80000 },
    { name: 'W', day: 'Wednesday', users: 90000 },
    { name: 'T', day: 'Thursday', users: 50000 },
    { name: 'F', day: 'Friday', users: 90000 },
    { name: 'S', day: 'Saturday', users: 40000 },
    { name: 'S', day: 'Sunday', users: 55000 },
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
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                />
                <Tooltip
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
