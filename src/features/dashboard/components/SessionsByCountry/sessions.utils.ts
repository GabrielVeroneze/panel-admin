import { formatCompactNumber } from '@/shared/utils'
import type {
    ChartLabelFormatter,
    ChartValueFormatter,
    CountrySession,
} from '@/features/dashboard/types'

export const formatSessionsTooltip: ChartValueFormatter = (value) => {
    if (typeof value !== 'number') return value
    return formatCompactNumber(value, { decimals: 1 })
}

export const formatCountryTooltipLabel: ChartLabelFormatter = (_, payload) => {
    return payload?.[0]?.payload?.countryName ?? ''
}

export const getSessionsData = (data: CountrySession[]) => {
    const topCountries = [...data]
        .sort((a, b) => b.sessions - a.sessions)
        .slice(0, 7)

    const sessionsMap = new Map(data.map((c) => [c.countryCode, c.sessions]))

    const previousMap = new Map(
        data.map((c) => [c.countryCode, c.previousWeek]),
    )

    const maxSessions = Math.max(...data.map((c) => c.sessions), 0)

    return {
        topCountries,
        sessionsMap,
        previousMap,
        maxSessions,
    }
}
