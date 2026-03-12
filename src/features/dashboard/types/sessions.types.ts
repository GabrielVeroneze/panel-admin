export type CountrySession = {
    countryCode: string
    countryName: string
    sessions: number
    previousWeek: number
}

export type DeviceSession = {
    metric: string
    device: string
    value: number
    fill: string
}
