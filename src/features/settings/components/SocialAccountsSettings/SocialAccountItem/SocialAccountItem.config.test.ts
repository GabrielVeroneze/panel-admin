import { describe, expect, it } from 'vitest'
import {
    DribbbleSolidIcon,
    FacebookFSolidIcon,
    GithubSolidIcon,
    TwitterSolidIcon,
} from '@/shared/assets/icons'
import { socialAccountConfig } from './SocialAccountItem.config'
import type { SocialPlatform } from '@/features/settings/types'

describe('socialAccountConfig', () => {
    const platforms: SocialPlatform[] = [
        'facebook',
        'twitter',
        'github',
        'dribbble',
    ]

    it('contains all supported social platforms', () => {
        expect(Object.keys(socialAccountConfig)).toHaveLength(platforms.length)
        expect(Object.keys(socialAccountConfig)).toEqual(platforms)
    })

    it('contains the expected configuration for each platform', () => {
        expect(socialAccountConfig).toEqual({
            facebook: {
                label: 'Facebook',
                icon: FacebookFSolidIcon,
            },
            twitter: {
                label: 'Twitter',
                icon: TwitterSolidIcon,
            },
            github: {
                label: 'GitHub',
                icon: GithubSolidIcon,
            },
            dribbble: {
                label: 'Dribbble',
                icon: DribbbleSolidIcon,
            },
        })
    })

    it.each([
        ['facebook', 'Facebook'],
        ['twitter', 'Twitter'],
        ['github', 'GitHub'],
        ['dribbble', 'Dribbble'],
    ] as const)('has the expected label for %s', (platform, label) => {
        expect(socialAccountConfig[platform].label).toBe(label)
    })

    it.each([
        ['facebook', FacebookFSolidIcon],
        ['twitter', TwitterSolidIcon],
        ['github', GithubSolidIcon],
        ['dribbble', DribbbleSolidIcon],
    ] as const)('has the expected icon for %s', (platform, icon) => {
        expect(socialAccountConfig[platform].icon).toBe(icon)
    })

    it('has a non-empty label and an icon for every platform', () => {
        platforms.forEach((platform) => {
            const config = socialAccountConfig[platform]

            expect(config.label).toBeTruthy()
            expect(config.icon).toBeDefined()
            expect(typeof config.icon).toBe('function')
        })
    })
})
