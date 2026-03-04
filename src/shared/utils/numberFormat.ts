export const formatCompactNumber = (
    value: number,
    options?: {
        decimals?: number
        suffix?: string
    },
) => {
    const { decimals = 0, suffix = 'k' } = options ?? {}

    return `${(value / 1000).toFixed(decimals)}${suffix}`
}

export const formatCurrency = (value: number) => {
    return `$${value}`
}

export const formatCompactCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`
}

export const formatChangePercent = (current: number, previous: number) => {
    if (!previous) return '0%'

    const change = ((current - previous) / previous) * 100

    return `${change.toFixed(0)}%`
}

export const formatPercent = (
    value: number,
    options?: { decimals?: number },
) => {
    const { decimals = 0 } = options ?? {}

    return `${value.toFixed(decimals)}%`
}
