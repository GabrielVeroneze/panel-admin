import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartTooltip } from '@/shared/components'
import { SessionsYAxisTick } from './SessionsYAxisTick'
import {
    formatCountryTooltipLabel,
    formatSessionsTooltip,
} from '../sessions.utils'
import type { CountrySession } from '@/features/dashboard/types'

type SessionsChartProps = {
    className?: string
    topCountries: CountrySession[]
}

export const SessionsChart = ({
    className,
    topCountries,
}: SessionsChartProps) => {
    return (
        <BarChart
            className={className}
            layout="vertical"
            data={topCountries}
            barSize={16}
            responsive
            margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
            }}
        >
            <YAxis
                type="category"
                dataKey="countryCode"
                tick={SessionsYAxisTick}
                tickFormatter={(_value, index) =>
                    topCountries[index].countryName
                }
                axisLine={false}
                tickLine={false}
                tickMargin={46}
                width={152}
            />
            <XAxis type="number" hide />
            <Tooltip
                content={ChartTooltip}
                labelFormatter={formatCountryTooltipLabel}
                formatter={formatSessionsTooltip}
                cursor={false}
            />
            <Bar
                dataKey="sessions"
                name="Sessions"
                fill="#1c64f2"
                radius={4}
                background={{ fill: '#f4f4f5', radius: 4 }}
            />
        </BarChart>
    )
}
