import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCompactCurrency, formatCompactNumber } from '@/shared/utils'
import { useBreakpoint } from '@/shared/hooks'
import { Button, ButtonGroup, ChartTooltip } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { chartConfig } from './salesChart.config'
import type { ChartValueFormatter, Sale } from '@/features/dashboard/types'
import styles from './SalesChart.module.scss'

type SalesChartProps = {
    data: Sale[]
}

const formatSalesTick = (value: number) =>
    formatCompactNumber(value, { suffix: 'K' })

const formatSalesTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactCurrency(value)
}

export const SalesChart = ({ data }: SalesChartProps) => {
    const { isMobile, isTablet } = useBreakpoint()

    const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    const config = chartConfig[device]

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
                    margin={config.margin}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={26}
                        angle={config.xAxisAngle}
                        padding={config.padding}
                        interval="preserveStartEnd"
                    />
                    {config.showYAxis && (
                        <YAxis
                            domain={[0, 200000]}
                            ticks={[0, 40000, 80000, 120000, 160000, 200000]}
                            axisLine={false}
                            tickLine={false}
                            tickMargin={26}
                            tickFormatter={formatSalesTick}
                            width="auto"
                        />
                    )}
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
