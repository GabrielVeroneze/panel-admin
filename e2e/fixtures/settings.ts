import type { Page } from '@playwright/test'
import type { Settings } from '@/features/settings/types'

export const testSettings: Settings = {
    profile: {
        avatar: 'https://i.pravatar.cc/300?img=1',
        name: 'Neil Sims',
        role: 'Front End Developer',
    },
    preferences: {
        language: 'en',
        timezone: 'America/New_York',
    },
    generalInformation: {
        firstName: 'Neil',
        lastName: 'Sims',
        email: 'neil.sims1@example.com',
        role: 'Front End Developer',
        phone: '+12024560101',
        birthDate: '1994-05-12',
        organization: 'TechCorp',
        department: 'Front End Developer',
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
            platform: 'facebook',
            connected: true,
            url: 'facebook.com/neilsims',
        },
        {
            id: 3,
            platform: 'twitter',
            connected: false,
            url: 'twitter.com/neil_sims',
        },
    ],
    connectedAccounts: [
        {
            id: 1,
            avatar: 'https://i.pravatar.cc/150?img=12',
            name: 'Sarah Johnson',
            city: 'San Francisco',
            lastSeen: '2 hours ago',
        },
        {
            id: 2,
            avatar: 'https://i.pravatar.cc/150?img=18',
            name: 'Daniel Moore',
            city: 'San Francisco',
            lastSeen: 'Yesterday',
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
        {
            id: 2,
            browser: 'Safari',
            device: 'Laptop',
            location: 'San Francisco',
            lastAccessed: 'Yesterday',
        },
    ],
}

export const mockSettings = async (
    page: Page,
    settings: Settings | null = testSettings,
) => {
    await page.route('**/api/settings', async (route) => {
        if (route.request().method() !== 'GET') {
            await route.fallback()
            return
        }

        if (!settings) {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Settings not found',
                }),
            })

            return
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(settings),
        })
    })
}
