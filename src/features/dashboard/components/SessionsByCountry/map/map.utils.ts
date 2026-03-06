import { maxSessions, previousMap, sessionsMap } from '../sessions.data'

export const getCountryMetrics = (countryCode: string) => {
    const sessions = sessionsMap.get(countryCode) ?? 0
    const previous = previousMap.get(countryCode) ?? 0

    return { sessions, previous }
}

export const getCountryColor = (isoCode: string) => {
    const { sessions } = getCountryMetrics(isoCode)

    if (!sessions) return '#d1d5db'

    const intensity = sessions / maxSessions

    if (intensity > 0.75) return '#1a56db'
    if (intensity > 0.5) return '#3f83f8'
    if (intensity > 0.25) return '#76a9fa'

    return '#a4cafe'
}
