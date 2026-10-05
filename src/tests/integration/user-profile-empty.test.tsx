import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { UserProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { UserProfile } from '@/features/profile/types'

describe('User Profile empty', () => {
    describe('nonexistent user', () => {
        it('handles a nonexistent user', async () => {
            server.use(
                http.get('/api/users/:id', () => {
                    return HttpResponse.json(null, {
                        status: 404,
                    })
                }),
            )

            const store = setupStore()

            renderWithProviders(<UserProfilePage />, {
                initialEntries: ['/users/999'],
                store,
            })

            expect(
                await screen.findByRole('heading', {
                    name: 'Profile details unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    name: 'Activity data unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    name: 'Timeline unavailable',
                }),
            ).toBeInTheDocument()

            expect(store.getState().profile.loading).toBe(false)
            expect(store.getState().profile.userProfile).toBeNull()
        })
    })

    describe('empty response', () => {
        it('handles an API response with empty profile data', async () => {
            const emptyProfile: UserProfile = {
                id: 999,
                avatar: '',
                name: '',
                role: '',
                country: '',
                contact: {
                    email: '',
                    address: '',
                    phone: '',
                },
                about: '',
                skills: [],
                summary: {
                    products: {
                        count: 0,
                        variation: 0,
                    },
                    users: {
                        count: 0,
                        variation: 0,
                    },
                    profile: {
                        role: '',
                        status: 'inactive',
                        lastLogin: '',
                        memberSince: '',
                    },
                },
                activities: [],
                recentProducts: [],
                experience: [],
                education: [],
            }

            server.use(
                http.get('/api/users/:id', () => {
                    return HttpResponse.json(emptyProfile)
                }),
            )

            const store = setupStore()

            renderWithProviders(<UserProfilePage />, {
                initialEntries: ['/users/999'],
                store,
            })

            expect(
                await screen.findByRole('heading', {
                    name: 'Profile details unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    name: 'Activity data unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    name: 'Timeline unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Personal information, contact details, and skills could not be loaded.',
                ),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Recent activity, statistics, and product information could not be loaded.',
                ),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Experience and education history could not be loaded.',
                ),
            ).toBeInTheDocument()

            expect(store.getState().profile.loading).toBe(false)
            expect(store.getState().profile.userProfile).toBeNull()
        })
    })
})
