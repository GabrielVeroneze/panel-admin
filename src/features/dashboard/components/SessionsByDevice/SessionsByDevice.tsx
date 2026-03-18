import { Pie, PieChart, Tooltip } from 'recharts'
import { formatPercent } from '@/shared/utils'
import { ChartTooltip, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { SessionsByDeviceSkeleton } from './SessionsByDeviceSkeleton'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
    DeviceSession,
} from '@/features/dashboard/types'
import styles from './SessionsByDevice.module.scss'

type SessionsByDeviceProps = {
    data?: DeviceSession[]
    loading?: boolean
}

const formatDeviceTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatPercent(value)
}

const formatDeviceTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.device ?? ''
}

export const SessionsByDevice = ({ data, loading }: SessionsByDeviceProps) => {
    if (loading) return <SessionsByDeviceSkeleton />

    if (!data) {
        return (
            <EmptyState
                icon={<ExclamationCircleIcon />}
                title="No device data"
                description="No sessions by device."
            />
        )
    }

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
