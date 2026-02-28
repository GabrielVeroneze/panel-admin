import { Area, AreaChart, Tooltip, XAxis } from 'recharts'
import { ChartTooltip } from '@/shared/components'
import { MetricCard } from '@/features/dashboard/components'
import styles from './TodayVisitors.module.scss'

const data = [
    {
        time: '09:00 AM',
        visitors: 450,
    },
    {
        time: '11:00 AM',
        visitors: 300,
    },
    {
        time: '13:00 PM',
        visitors: 350,
    },
    {
        time: '15:00 PM',
        visitors: 250,
    },
    {
        time: '17:00 PM',
        visitors: 500,
    },
    {
        time: '19:00 PM',
        visitors: 150,
    },
    {
        time: '21:00 PM',
        visitors: 250,
    },
    {
        time: '23:00 PM',
        visitors: 175,
    },
]

export const TodayVisitors = () => {
    return (
        <MetricCard title="Today Visitors" value={'6,438'} variation={4.3}>
            <AreaChart
                className={styles.chart}
                data={data}
                responsive
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient
                        id="visitorsGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="#1c64f2"
                            stopOpacity={0.5}
                        />
                        <stop
                            offset="100%"
                            stopColor="#1c64f2"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <Tooltip content={ChartTooltip} cursor={false} />
                <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke="#1c64f2"
                    fill="url(#visitorsGradient)"
                    strokeWidth={4}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
            </AreaChart>
        </MetricCard>
    )
}
