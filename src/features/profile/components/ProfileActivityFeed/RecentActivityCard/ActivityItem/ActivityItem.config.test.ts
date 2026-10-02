import { describe, expect, it } from 'vitest'
import {
    CubeIcon,
    LockClosedIcon,
    LoginIcon,
    PencilIcon,
    TrashIcon,
    UploadIcon,
    UserAddIcon,
    UserCircleIcon,
} from '@/shared/assets/icons'
import { activityConfig } from './ActivityItem.config'

describe('activityConfig', () => {
    describe('configuration entries', () => {
        it.each([
            ['user-created', 'Created User', UserAddIcon, 'green'],
            ['user-updated', 'Updated User', PencilIcon, 'blue'],
            ['user-deleted', 'Deleted User', TrashIcon, 'red'],
            ['product-created', 'Created Product', CubeIcon, 'green'],
            ['product-updated', 'Updated Product', PencilIcon, 'blue'],
            ['product-deleted', 'Deleted Product', TrashIcon, 'red'],
            [
                'product-image-uploaded',
                'Uploaded Product Image',
                UploadIcon,
                'orange',
            ],
            [
                'profile-avatar-updated',
                'Updated Profile Avatar',
                UserCircleIcon,
                'orange',
            ],
            ['password-changed', 'Changed Password', LockClosedIcon, 'purple'],
            ['admin-login', 'Admin Login', LoginIcon, 'purple'],
        ] as const)('configures %s correctly', (type, title, icon, variant) => {
            expect(activityConfig[type]).toEqual({
                title,
                icon,
                variant,
            })
        })
    })

    describe('configuration completeness', () => {
        it('contains a configuration for every activity type', () => {
            const activityTypes = [
                'user-created',
                'user-updated',
                'user-deleted',
                'product-created',
                'product-updated',
                'product-deleted',
                'product-image-uploaded',
                'profile-avatar-updated',
                'password-changed',
                'admin-login',
            ] as const

            expect(Object.keys(activityConfig)).toHaveLength(
                activityTypes.length,
            )

            activityTypes.forEach((type) => {
                expect(activityConfig[type]).toBeDefined()
            })
        })

        it('does not contain unexpected activity types', () => {
            const activityTypes = [
                'user-created',
                'user-updated',
                'user-deleted',
                'product-created',
                'product-updated',
                'product-deleted',
                'product-image-uploaded',
                'profile-avatar-updated',
                'password-changed',
                'admin-login',
            ]

            expect(Object.keys(activityConfig).sort()).toEqual(
                [...activityTypes].sort(),
            )
        })
    })

    describe('configuration structure', () => {
        it('provides a title, icon, and variant for every activity', () => {
            Object.values(activityConfig).forEach((config) => {
                expect(config.title).toEqual(expect.any(String))
                expect(config.title).not.toBe('')
                expect(config.icon).toEqual(expect.any(Function))
                expect(config.variant).toMatch(
                    /^(blue|green|red|orange|purple)$/,
                )
            })
        })
    })
})
