export type CountrySession = {
    countryCode: string
    countryName: string
    sessions: number
    previousWeek: number
}

export type DeviceSession = {
    metric: string
    device: 'Desktop' | 'Tablet' | 'Mobile'
    value: number
    fill: string
}
