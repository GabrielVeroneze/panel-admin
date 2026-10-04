import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { MyProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'

describe('Profile mount', () => {
    it('starts loading when mounted', () => {
        const store = setupStore()

        renderWithProviders(<MyProfilePage />, { store })

        expect(store.getState().profile.loading).toBe(true)

        expect(
            screen.queryByRole('heading', {
                name: 'Profile information unavailable',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Profile details unavailable',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Admin Summary',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Experience',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Education',
            }),
        ).not.toBeInTheDocument()
    })
})
