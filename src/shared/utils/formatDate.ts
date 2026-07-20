export const formatDate = (date: string, locale = 'en-US'): string => {
    return new Intl.DateTimeFormat(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date))
}
