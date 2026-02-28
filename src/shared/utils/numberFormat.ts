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
