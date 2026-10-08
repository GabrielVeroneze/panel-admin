import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useConnectedAccount } from '@/features/settings/hooks'
import { ConnectedAccountItem } from './ConnectedAccountItem'
import type { ConnectedAccount } from '@/features/settings/types'

vi.mock('@/features/settings/hooks', () => ({
    useConnectedAccount: vi.fn(),
}))

describe('ConnectedAccountItem', () => {
    const account: ConnectedAccount = {
        id: 1,
        name: 'John Doe',
        avatar: '/avatars/john.jpg',
        city: 'São Paulo',
        lastSeen: '5 minutes ago',
    }

    it('renders the account information', () => {
        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect: vi.fn(),
        })

        render(<ConnectedAccountItem account={account} />)

        expect(
            screen.getByRole('heading', { level: 4, name: 'John Doe' }),
        ).toBeInTheDocument()

        expect(screen.getByText('São Paulo')).toBeInTheDocument()
        expect(screen.getByText('Last seen: 5 minutes ago')).toBeInTheDocument()
    })

    it('renders the account avatar with the account data', () => {
        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect: vi.fn(),
        })

        render(<ConnectedAccountItem account={account} />)

        const avatar = screen.getByRole('img', {
            name: 'John Doe',
        })

        expect(avatar).toHaveAttribute('src', '/avatars/john.jpg')
        expect(avatar).toHaveAttribute('alt', 'John Doe')
    })

    it('renders the disconnect button', () => {
        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect: vi.fn(),
        })

        render(<ConnectedAccountItem account={account} />)

        expect(
            screen.getByRole('button', { name: 'Disconnect' }),
        ).toBeInTheDocument()
    })

    it('calls handleDisconnect when the disconnect button is clicked', () => {
        const handleDisconnect = vi.fn()

        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect,
        })

        render(<ConnectedAccountItem account={account} />)

        fireEvent.click(screen.getByRole('button', { name: 'Disconnect' }))

        expect(handleDisconnect).toHaveBeenCalledTimes(1)
    })

    it('passes the account to useConnectedAccount', () => {
        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect: vi.fn(),
        })

        render(<ConnectedAccountItem account={account} />)

        expect(useConnectedAccount).toHaveBeenCalledWith(account)
    })

    it('uses the large transparent variant for the disconnect button', () => {
        vi.mocked(useConnectedAccount).mockReturnValue({
            handleDisconnect: vi.fn(),
        })

        render(<ConnectedAccountItem account={account} />)

        const button = screen.getByRole('button', {
            name: 'Disconnect',
        })

        expect(button.className).toContain('lg')
        expect(button.className).toContain('transparent')
    })
})
