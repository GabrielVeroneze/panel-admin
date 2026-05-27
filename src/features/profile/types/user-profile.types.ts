import type {
    Activity,
    ProfileSummary,
    RecentProduct,
    Skill,
    SummaryMetric,
    TimelineEntry,
} from '@/features/profile/types'

export type UserProfile = {
    id: number
    avatar: string
    name: string
    role: string
    country: string
    contact: {
        email: string
        address: string
        phone: string
    }
    about: string
    skills: Skill[]
    summary: {
        products: SummaryMetric
        users: SummaryMetric
        profile: ProfileSummary
    }
    activities: Activity[]
    recentProducts: RecentProduct[]
    experience: TimelineEntry[]
    education: TimelineEntry[]
}
