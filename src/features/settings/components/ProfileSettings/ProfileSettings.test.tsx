import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useProfileAvatar } from '@/features/settings/hooks'
import { ProfileSettings } from './ProfileSettings'
import type { SettingsProfile } from '@/features/settings/types'

const mocks = vi.hoisted(() => ({
    openFilePicker: vi.fn(),
    handleFileChange: vi.fn(),
    inputRef: {
        current: null as HTMLInputElement | null,
    },
}))

vi.mock('@/features/settings/hooks', () => ({
    useProfileAvatar: vi.fn(() => ({
        inputRef: mocks.inputRef,
        handleFileChange: mocks.handleFileChange,
        openFilePicker: mocks.openFilePicker,
    })),
}))

vi.mock('./ProfileSettingsSkeleton', () => ({
    ProfileSettingsSkeleton: () => (
        <div data-testid="profile-settings-skeleton">
            Loading profile settings
        </div>
    ),
}))

const profile: SettingsProfile = {
    avatar: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    role: 'Administrator',
}

describe('ProfileSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mocks.inputRef.current = null
    })

    it('renders the skeleton while loading', () => {
        render(<ProfileSettings profile={profile} loading />)

        expect(
            screen.getByTestId('profile-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('img', { name: profile.name }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('button', { name: /change picture/i }),
        ).not.toBeInTheDocument()
    })

    it('renders the profile avatar', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        const avatar = screen.getByRole('img', {
            name: profile.name,
        })

        expect(avatar).toBeInTheDocument()
        expect(avatar).toHaveAttribute('src', profile.avatar)
        expect(avatar).toHaveAttribute('alt', profile.name)
    })

    it('renders the profile name', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: profile.name,
            }),
        ).toBeInTheDocument()
    })

    it('renders the profile role', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        expect(screen.getByText(profile.role)).toBeInTheDocument()
    })

    it('renders the Change Picture button', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        expect(
            screen.getByRole('button', { name: /change picture/i }),
        ).toBeInTheDocument()
    })

    it('renders a hidden file input accepting images', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        const input = document.querySelector(
            'input[type="file"]',
        ) as HTMLInputElement | null

        expect(input).not.toBeNull()
        expect(input).toHaveAttribute('accept', 'image/*')
        expect(input).toHaveAttribute('hidden')
        expect(input).not.toBeVisible()
    })

    it('calls openFilePicker when Change Picture is clicked', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        fireEvent.click(screen.getByRole('button', { name: /change picture/i }))

        expect(mocks.openFilePicker).toHaveBeenCalledTimes(1)
    })

    it('passes handleFileChange to the file input', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        const input = document.querySelector(
            'input[type="file"]',
        ) as HTMLInputElement

        const file = new File(['image content'], 'avatar.png', {
            type: 'image/png',
        })

        fireEvent.change(input, {
            target: {
                files: [file],
            },
        })

        expect(mocks.handleFileChange).toHaveBeenCalledTimes(1)
        expect(mocks.handleFileChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: input,
            }),
        )
    })

    it('does not render the skeleton when loading is false', () => {
        render(<ProfileSettings profile={profile} loading={false} />)

        expect(
            screen.queryByTestId('profile-settings-skeleton'),
        ).not.toBeInTheDocument()
    })

    it('calls useProfileAvatar even while loading', () => {
        render(<ProfileSettings profile={profile} loading />)

        expect(useProfileAvatar).toHaveBeenCalledTimes(1)
    })
})
