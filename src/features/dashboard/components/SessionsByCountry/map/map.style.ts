import { maxSessions, sessionsMap } from '../sessions.data'

export const getColor = (value: number, max: number) => {
    if (!value) return '#d1d5db'

    const intensity = value / max

    if (intensity > 0.75) return '#1a56db'
    if (intensity > 0.5) return '#3f83f8'
    if (intensity > 0.25) return '#76a9fa'

    return '#a4cafe'
}

export const getCountryColor = (isoCode: string) => {
    const sessions = sessionsMap.get(isoCode) ?? 0

    return getColor(sessions, maxSessions)
}
