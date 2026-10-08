import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useSocialAccount } from '@/features/settings/hooks'
import { SocialAccountItem } from './SocialAccountItem'
import type { SocialAccount } from '@/features/settings/types'

vi.mock('@/features/settings/hooks', () => ({
    useSocialAccount: vi.fn(),
}))

describe('SocialAccountItem', () => {
    const handleToggleConnection = vi.fn()

    const createAccount = (
        overrides: Partial<SocialAccount> = {},
    ): SocialAccount => ({
        id: 1,
        platform: 'github',
        connected: false,
        ...overrides,
    })

    it('renders the platform label', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({ platform: 'github' })}
            />,
        )

        expect(
            screen.getByRole('heading', {
                level: 4,
                name: 'GitHub',
            }),
        ).toBeInTheDocument()
    })

    it('renders "Not connected" when the account is not connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    platform: 'github',
                    connected: false,
                })}
            />,
        )

        expect(screen.getByText('Not connected')).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('renders "Not connected" when the account is connected but has no URL', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    platform: 'github',
                    connected: true,
                })}
            />,
        )

        expect(screen.getByText('Not connected')).toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('renders the account URL when the account is connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    platform: 'github',
                    connected: true,
                    url: 'github.com/johndoe',
                })}
            />,
        )

        const link = screen.getByRole('link', {
            name: 'github.com/johndoe',
        })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', 'https://github.com/johndoe')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noreferrer')
    })

    it.each([
        ['facebook', 'Facebook'],
        ['twitter', 'Twitter'],
        ['github', 'GitHub'],
        ['dribbble', 'Dribbble'],
    ] as const)('renders the correct label for %s', (platform, label) => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(<SocialAccountItem account={createAccount({ platform })} />)

        expect(
            screen.getByRole('heading', {
                level: 4,
                name: label,
            }),
        ).toBeInTheDocument()
    })

    it('renders "Connect" when the account is not connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem account={createAccount({ connected: false })} />,
        )

        expect(
            screen.getByRole('button', {
                name: 'Connect',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('button', {
                name: 'Disconnect',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders "Disconnect" when the account is connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    connected: true,
                    url: 'github.com/johndoe',
                })}
            />,
        )

        expect(
            screen.getByRole('button', {
                name: 'Disconnect',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('button', {
                name: 'Connect',
            }),
        ).not.toBeInTheDocument()
    })

    it('calls handleToggleConnection when the button is clicked', () => {
        const handleToggleConnection = vi.fn()

        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(<SocialAccountItem account={createAccount()} />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Connect',
            }),
        )

        expect(handleToggleConnection).toHaveBeenCalledTimes(1)
    })

    it('passes the account to useSocialAccount', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        const account = createAccount({
            platform: 'twitter',
            connected: true,
            url: 'twitter.com/johndoe',
        })

        render(<SocialAccountItem account={account} />)

        expect(useSocialAccount).toHaveBeenCalledWith(account)
    })

    it('uses the large size for the button', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(<SocialAccountItem account={createAccount()} />)

        const button = screen.getByRole('button', {
            name: 'Connect',
        })

        expect(button.className).toContain('lg')
    })

    it('uses the primary variant when the account is not connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    connected: false,
                })}
            />,
        )

        const button = screen.getByRole('button', {
            name: 'Connect',
        })

        expect(button.className).toContain('primary')
    })

    it('uses the transparent variant when the account is connected', () => {
        vi.mocked(useSocialAccount).mockReturnValue({
            handleToggleConnection,
        })

        render(
            <SocialAccountItem
                account={createAccount({
                    connected: true,
                    url: 'github.com/johndoe',
                })}
            />,
        )

        const button = screen.getByRole('button', {
            name: 'Disconnect',
        })

        expect(button.className).toContain('transparent')
    })
})
