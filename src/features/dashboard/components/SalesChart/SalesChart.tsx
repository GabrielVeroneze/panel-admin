import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactCurrency, formatCompactNumber } from '@/shared/utils'
import { useBreakpoint } from '@/shared/hooks'
import { Button, ButtonGroup, ChartTooltip } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import type { ChartValueFormatter } from '@/features/dashboard/types'
import styles from './SalesChart.module.scss'

const data = [
    { date: '01 Apr', templates: 40000, hosting: 100000 },
    { date: '02 Apr', templates: 80000, hosting: 70000 },
    { date: '03 Apr', templates: 80000, hosting: 140000 },
    { date: '04 Apr', templates: 160000, hosting: 120000 },
    { date: '05 Apr', templates: 140000, hosting: 50000 },
    { date: '06 Apr', templates: 130000, hosting: 90000 },
    { date: '07 Apr', templates: 100000, hosting: 50000 },
]

const formatSalesTick = (value: number) =>
    formatCompactNumber(value, { suffix: 'K' })

const formatSalesTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactCurrency(value)
}

export const SalesChart = () => {
    const { isTablet } = useBreakpoint()

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>Sales</h2>
                    <ExclamationCircleIcon />
                </div>
                <ButtonGroup>
                    <Button size="md">Year</Button>
                    <Button size="md">Month</Button>
                    <Button size="md">Day</Button>
                </ButtonGroup>
            </header>
            <div className={styles.chartContainer}>
                <LineChart
                    className={styles.chart}
                    data={data}
                    responsive
                    margin={{
                        right: isTablet ? 14 : 6,
                        bottom: 18,
                        left: isTablet ? 0 : 2,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={26}
                        angle={isTablet ? -45 : 0}
                    />
                    <YAxis
                        domain={[0, 200000]}
                        ticks={[0, 40000, 80000, 120000, 160000, 200000]}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={26}
                        tickFormatter={formatSalesTick}
                        width="auto"
                    />
                    <Tooltip
                        content={ChartTooltip}
                        formatter={formatSalesTooltip}
                        cursor={{
                            strokeWidth: 1,
                            strokeDasharray: '5 5',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="templates"
                        name="Templates"
                        stroke="#1c64f2"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="hosting"
                        name="Hosting"
                        stroke="#ff8a4c"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </div>
        </div>
    )
}
