import { Pie, PieChart, Tooltip } from 'recharts'
import { formatPercent } from '@/shared/utils'
import { ChartTooltip } from '@/shared/components'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
    DeviceSession,
} from '@/features/dashboard/types'
import styles from './SessionsByDevice.module.scss'

type SessionsByDeviceProps = {
    data: DeviceSession[]
}

const formatDeviceTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatPercent(value)
}

const formatDeviceTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.device ?? ''
}

export const SessionsByDevice = ({ data }: SessionsByDeviceProps) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sessions by Device</h2>
            <div className={styles.chartContainer}>
                <PieChart className={styles.chart} responsive>
                    <Pie
                        dataKey="value"
                        nameKey="metric"
                        data={data}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius="55%"
                        outerRadius="100%"
                        stroke="none"
                        isAnimationActive
                    />
                    <Tooltip
                        content={ChartTooltip}
                        labelFormatter={formatDeviceTooltipLabel}
                        formatter={formatDeviceTooltip}
                    />
                </PieChart>
            </div>
        </div>
    )
}
