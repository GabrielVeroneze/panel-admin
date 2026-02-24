export const formatCompactNumber = (value: number) => {
    return `${(value / 1000).toFixed(0)}k`
}

export const formatCompactNumberUpper = (value: number) => {
    return `${value / 1000}K`
}

export const formatCurrency = (value: number) => {
    return `$${value}`
}

export const formatCompactCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`
}
