import type { Page } from '@playwright/test'
import type { UserProfile } from '@/features/profile/types'

export const testProfile: UserProfile = {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'Neil Sims',
    role: 'Front End Developer',
    country: 'United States',
    contact: {
        email: 'neil.sims1@example.com',
        address: '1458 Market Street, San Francisco, CA 94103, United States',
        phone: '+12024560101',
    },
    about: 'Experienced Front End Developer with more than 8 years of experience building scalable web applications using React, TypeScript and modern frontend tooling. Passionate about creating intuitive user experiences, improving performance and collaborating with cross-functional teams to deliver high-quality products.',
    skills: [
        { id: 'react', label: 'React' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'javascript', label: 'JavaScript' },
    ],
    summary: {
        products: {
            count: 138,
            variation: 14,
        },
        users: {
            count: 42,
            variation: 7,
        },
        profile: {
            role: 'Senior Developer',
            status: 'inactive',
            lastLogin: '2026-07-19T15:30:00.000Z',
            memberSince: '2021-03-12T00:00:00.000Z',
        },
    },
    activities: [
        {
            id: 1,
            type: 'product-updated',
            target: 'Admin Dashboard',
            createdAt: '2026-07-19T18:15:00.000Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
            name: 'Developer Laptop',
            category: 'Electronics',
            price: 2499,
            stockQuantity: 12,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2022 - Present',
            title: 'Senior Front End Developer',
            organization: 'TechCorp',
            description:
                'Leading development of enterprise web applications using React, TypeScript and modern frontend architecture.',
        },
    ],
    education: [
        {
            id: 1,
            period: '2013 - 2015',
            title: 'Master of Software Engineering',
            organization: 'University of California',
            description:
                'Focused on web architecture, software design patterns and distributed systems.',
        },
    ],
}

export const mockMyProfile = async (
    page: Page,
    profile: UserProfile = testProfile,
) => {
    await page.route(/\/api\/me\/?$/, async (route) => {
        if (route.request().method() !== 'GET') {
            await route.fallback()
            return
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(profile),
        })
    })
}
