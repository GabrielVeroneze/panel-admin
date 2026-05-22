import type {
    Activity,
    ProfileSummary,
    RecentProduct,
    Skill,
    StatValue,
    TimelineEntry,
} from '@/features/profile/types'

export type ProfileSidebarData = {
    avatar: string
    name: string
    role: string
    country: string
    email: string
    address: string
    phone: string
    about: string
    skills: Skill[]
}

export type ProfileActivityFeedData = {
    products: StatValue
    users: StatValue
    profile: ProfileSummary
    activities: Activity[]
    recentProducts: RecentProduct[]
}

export type ProfileTimelineData = {
    experience: TimelineEntry[]
    education: TimelineEntry[]
}

export type ProfileResponse = {
    sidebar: ProfileSidebarData
    activityFeed: ProfileActivityFeedData
    timeline: ProfileTimelineData
}
