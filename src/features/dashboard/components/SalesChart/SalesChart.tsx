import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { Button, ButtonGroup } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/icons'
import styles from './SalesChart.module.scss'

export const SalesChart = () => {
    const data = [
        { date: '01 Apr', templates: 40000, hosting: 100000 },
        { date: '02 Apr', templates: 80000, hosting: 70000 },
        { date: '03 Apr', templates: 80000, hosting: 140000 },
        { date: '04 Apr', templates: 160000, hosting: 120000 },
        { date: '05 Apr', templates: 140000, hosting: 50000 },
        { date: '06 Apr', templates: 130000, hosting: 90000 },
        { date: '07 Apr', templates: 100000, hosting: 50000 },
    ]

    const formatYAxis = (value: number) => `${value / 1000}K`

    const formatTooltip = (value: number | undefined) => {
        if (value === undefined) return ''

        return `$${value / 1000}k`
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>Sales</h2>
                    <ExclamationCircleIcon />
                </div>
                <ButtonGroup>
                    <Button>Year</Button>
                    <Button>Month</Button>
                    <Button>Day</Button>
                </ButtonGroup>
            </header>
            <div className={styles.chartContainer}>
                <LineChart
                    className={styles.chart}
                    data={data}
                    responsive
                    margin={{
                        right: 6,
                        bottom: 18,
                        left: 2,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        className={styles.axis}
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={26}
                    />
                    <YAxis
                        className={styles.axis}
                        domain={[0, 200000]}
                        ticks={[0, 40000, 80000, 120000, 160000, 200000]}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={26}
                        tickFormatter={formatYAxis}
                        width="auto"
                    />
                    <Tooltip
                        formatter={formatTooltip}
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
