import { formatCompactNumber } from '@/shared/utils'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
} from '@/features/dashboard/types'

export const formatSessionsTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactNumber(value, { decimals: 1 })
}

export const formatCountryTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.countryName ?? ''
}
