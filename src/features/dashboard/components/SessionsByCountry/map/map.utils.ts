export const getCountryMetrics = (
    countryCode: string,
    sessionsMap: Map<string, number>,
    previousMap: Map<string, number>,
) => {
    const sessions = sessionsMap.get(countryCode) ?? 0
    const previous = previousMap.get(countryCode) ?? 0

    return { sessions, previous }
}

export const getCountryColor = (
    isoCode: string,
    sessionsMap: Map<string, number>,
    maxSessions: number,
) => {
    const sessions = sessionsMap.get(isoCode) ?? 0

    if (!sessions) return '#d1d5db'

    const intensity = sessions / maxSessions

    if (intensity > 0.75) return '#1a56db'
    if (intensity > 0.5) return '#3f83f8'
    if (intensity > 0.25) return '#76a9fa'

    return '#a4cafe'
}
