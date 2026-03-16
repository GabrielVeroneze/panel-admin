import { Area, AreaChart, Tooltip, XAxis } from 'recharts'
import { formatNumber } from '@/shared/utils'
import { ChartTooltip } from '@/shared/components'
import { MetricCard, MetricCardSkeleton } from '@/features/dashboard/components'
import type { TodayVisitor } from '@/features/dashboard/types'
import styles from './TodayVisitors.module.scss'

type TodayVisitorsProps = {
    data?: TodayVisitor
    loading?: boolean
}

export const TodayVisitors = ({ data, loading }: TodayVisitorsProps) => {
    if (loading) return <MetricCardSkeleton />

    return (
        <MetricCard
            title="Today Visitors"
            value={formatNumber(data.summary.total)}
            variation={data.summary.variation}
        >
            <AreaChart
                className={styles.chart}
                data={data.chart}
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
