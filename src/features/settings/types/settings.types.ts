import type {
    ConnectedAccount,
    DeviceSession,
    SocialAccount,
} from '@/features/settings/types'

export type Settings = {
    profile: SettingsProfile
    preferences: SettingsPreferences
    generalInformation: GeneralInformation
    socialAccounts: SocialAccount[]
    connectedAccounts: ConnectedAccount[]
    notifications: NotificationPreferences
    emailSettings: EmailPreferences
    recentDevices: DeviceSession[]
}

export type SettingsProfile = {
    avatar: string
    name: string
    role: string
}

export type SettingsPreferences = {
    language: string
    timezone: string
}

export type GeneralInformation = {
    firstName: string
    lastName: string
    email: string
    role: string
    phone: string
    birthDate: string
    organization: string
    department: string
    address: string
    city: string
    country: string
    zipCode: string
}

export type NotificationPreferences = {
    companyNews: boolean
    accountActivity: boolean
    meetupsNearYou: boolean
    newMessages: boolean
}

export type EmailPreferences = {
    ratingReminders: boolean
    itemUpdateNotifications: boolean
    itemCommentNotifications: boolean
    buyerReviewNotifications: boolean
}
