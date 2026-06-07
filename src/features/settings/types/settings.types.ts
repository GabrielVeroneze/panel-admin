export type Settings = {
    profile: SettingsProfile
    preferences: SettingsPreferences
    generalInformation: GeneralInformation
    socialAccounts: SocialAccount[]
    connectedAccounts: ConnectedAccount[]
    notifications: NotificationSettings
    emailSettings: EmailSettings
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
    organization: string
    department: string
    email: string
    phoneNumber: string
    birthday: string
    address: string
    city: string
    country: string
    postalCode: string
}

export type SocialAccount = {
    id: number
    platform: string
    connected: boolean
}

export type ConnectedAccount = {
    id: number
    name: string
    city: string
    lastSeen: string
}

export type NotificationSettings = {
    companyNews: boolean
    accountActivity: boolean
    meetupsNearYou: boolean
    newMessages: boolean
}

export type EmailSettings = {
    ratingReminders: boolean
    itemUpdateNotifications: boolean
    itemCommentNotifications: boolean
    buyerReviewNotifications: boolean
}

export type DeviceSession = {
    id: number
    browser: string
    device: string
    location: string
    lastAccessed: string
}
