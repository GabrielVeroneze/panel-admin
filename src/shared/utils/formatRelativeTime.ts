export const formatRelativeTime = (date: string, locale = 'en'): string => {
    const rtf = new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',
    })

    const now = Date.now()
    const target = new Date(date).getTime()

    const seconds = Math.round((target - now) / 1000)

    const intervals = [
        { unit: 'year', seconds: 31536000 },
        { unit: 'month', seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ] as const

    for (const interval of intervals) {
        const value = Math.round(seconds / interval.seconds)

        if (Math.abs(value) >= 1) {
            return rtf.format(value, interval.unit)
        }
    }

    return 'Just now'
}
