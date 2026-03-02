import { formatCompactNumber } from '@/shared/utils'
import type { TooltipProps } from 'recharts'

type ValueFormatter = TooltipProps<number, string>['formatter']
type LabelFormatter = TooltipProps<number, string>['labelFormatter']

export const getColor = (value: number, max: number) => {
    if (!value) return '#d1d5db'

    const intensity = value / max

    if (intensity > 0.75) return '#1a56db'
    if (intensity > 0.5) return '#3f83f8'
    if (intensity > 0.25) return '#76a9fa'

    return '#a4cafe'
}

export const formatChartValue: ValueFormatter = (value) =>
    value ? formatCompactNumber(value, { decimals: 1 }) : ''

export const formatChartLabel: LabelFormatter = (_label, payload) =>
    payload?.[0]?.payload?.countryName ?? ''
