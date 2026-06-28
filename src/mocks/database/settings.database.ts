import type { Settings } from '@/features/settings/types'

export const settingsDatabase: Settings = {
    profile: {
        avatar: 'https://i.pravatar.cc/300?img=1',
        name: 'Neil Sims',
        role: 'Administrator',
    },
    preferences: {
        language: 'en',
        timezone: 'America/New_York',
    },
    generalInformation: {
        firstName: 'Neil',
        lastName: 'Sims',
        email: 'neil@example.com',
        role: 'Administrator',
        phone: '+12024560101',
        birthDate: '1994-05-12',
        organization: 'Tech Corp',
        department: 'Engineering',
        address: '1458 Market Street',
        city: 'San Francisco',
        country: 'United States',
        zipCode: '94103',
    },
    socialAccounts: [
        {
            id: 1,
            platform: 'github',
            connected: true,
            url: 'github.com/neilsims',
        },
        {
            id: 2,
            platform: 'twitter',
            connected: false,
            url: 'twitter.com/neilsims',
        },
    ],
    connectedAccounts: [
        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=12',
            name: 'Neil Sims',
            city: 'San Francisco',
            lastSeen: '2 hours ago',
        },
    ],
    notifications: {
        companyNews: true,
        accountActivity: true,
        meetupsNearYou: false,
        newMessages: true,
    },
    emailSettings: {
        ratingReminders: true,
        itemUpdateNotifications: false,
        itemCommentNotifications: true,
        buyerReviewNotifications: false,
    },
    recentDevices: [
        {
            id: 1,
            browser: 'Chrome',
            device: 'Desktop',
            location: 'San Francisco',
            lastAccessed: '2 hours ago',
        },
    ],
}
