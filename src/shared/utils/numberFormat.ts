export const formatNumber = (
    value: number,
    options?: { decimals?: number },
) => {
    const { decimals = 0 } = options ?? {}

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals,
    }).format(value)
}

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

export const formatCurrency = (
    value: number,
    options?: {
        compact?: boolean
        decimals?: number
    },
) => {
    const { compact = false, decimals = 0 } = options ?? {}

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: compact ? 'compact' : 'standard',
        maximumFractionDigits: decimals,
    }).format(value)
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
