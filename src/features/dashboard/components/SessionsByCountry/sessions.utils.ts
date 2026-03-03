import { formatCompactNumber } from '@/shared/utils'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
} from '@/features/dashboard/types'

export const getColor = (value: number, max: number) => {
    if (!value) return '#d1d5db'

    const intensity = value / max

    if (intensity > 0.75) return '#1a56db'
    if (intensity > 0.5) return '#3f83f8'
    if (intensity > 0.25) return '#76a9fa'

    return '#a4cafe'
}

export const formatSessionsTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactNumber(value, { decimals: 1 })
}

export const formatCountryTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.countryName ?? ''
}
