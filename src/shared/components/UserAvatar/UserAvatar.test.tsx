import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserAvatar } from './UserAvatar'
import userEvent from '@testing-library/user-event'

describe('UserAvatar', () => {
    describe('rendering', () => {
        it('renders the avatar image', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            expect(screen.getByRole('img')).toBeInTheDocument()
        })

        it('uses the provided src', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            expect(screen.getByRole('img')).toHaveAttribute(
                'src',
                '/avatar.jpg',
            )
        })

        it('uses the default alt text', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            expect(
                screen.getByRole('img', {
                    name: 'Avatar do usuário',
                }),
            ).toBeInTheDocument()
        })

        it('uses the provided alt text', () => {
            render(<UserAvatar src="/avatar.jpg" alt="Gabriel" />)

            expect(
                screen.getByRole('img', {
                    name: 'Gabriel',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('size', () => {
        it('uses the default size', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            const avatar = screen.getByRole('button')
            const image = screen.getByRole('img')

            expect(avatar).toHaveStyle({
                height: '32px',
                width: '32px',
            })

            expect(image).toHaveAttribute('height', '32')
            expect(image).toHaveAttribute('width', '32')
        })

        it('applies the provided size to the container and image', () => {
            render(<UserAvatar src="/avatar.jpg" size={48} />)

            const avatar = screen.getByRole('button')
            const image = screen.getByRole('img')

            expect(avatar).toHaveStyle({
                height: '48px',
                width: '48px',
            })

            expect(image).toHaveAttribute('height', '48')
            expect(image).toHaveAttribute('width', '48')
        })
    })

    describe('button behavior', () => {
        it('renders as a button by default', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('uses the alt text as the button accessible name', () => {
            render(<UserAvatar src="/avatar.jpg" alt="User profile" />)

            expect(
                screen.getByRole('button', {
                    name: 'User profile',
                }),
            ).toBeInTheDocument()
        })

        it('calls onClick when clicked', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(<UserAvatar src="/avatar.jpg" onClick={handleClick} />)

            await user.click(screen.getByRole('button'))

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not require onClick to render as a button', () => {
            render(<UserAvatar src="/avatar.jpg" />)

            expect(screen.getByRole('button')).toBeInTheDocument()
        })
    })

    describe('non-button variant', () => {
        it('renders as a div when asButton is false', () => {
            render(<UserAvatar src="/avatar.jpg" asButton={false} />)

            expect(screen.queryByRole('button')).not.toBeInTheDocument()

            expect(screen.getByRole('img')).toBeInTheDocument()
        })

        it('uses the alt text as the aria-label', () => {
            render(
                <UserAvatar
                    src="/avatar.jpg"
                    alt="User avatar"
                    asButton={false}
                />,
            )

            const avatar = screen.getByLabelText('User avatar')

            expect(avatar.tagName).toBe('DIV')
        })

        it('does not trigger onClick when rendered as a div', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <UserAvatar
                    src="/avatar.jpg"
                    asButton={false}
                    onClick={handleClick}
                />,
            )

            const avatar = screen.getByLabelText('Avatar do usuário')

            await user.click(avatar)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })
})
