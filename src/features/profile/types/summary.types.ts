export type SummaryMetric = {
    count: number
    variation: number
}

export type ProfileStatus = 'active' | 'inactive'

export type ProfileSummary = {
    role: string
    status: ProfileStatus
    lastLogin: string
    memberSince: string
}
