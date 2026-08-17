import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserInfo } from './UserInfo'
import userEvent from '@testing-library/user-event'

describe('UserInfo', () => {
    describe('rendering', () => {
        it('renders the user name', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                />,
            )

            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })

        it('renders the user email', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                />,
            )

            expect(screen.getByText('john@example.com')).toBeInTheDocument()
        })

        it('renders the user avatar', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                />,
            )

            expect(
                screen.getByRole('img', {
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()
        })

        it('passes the avatar url to the user avatar', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/john.jpg"
                />,
            )

            expect(
                screen.getByRole('img', {
                    name: 'John Doe',
                }),
            ).toHaveAttribute('src', '/john.jpg')
        })
    })

    describe('variant', () => {
        it('uses md as the default variant', () => {
            const { container } = render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                />,
            )

            expect(container.firstChild).toHaveClass('md')
        })

        it('applies the sm variant', () => {
            const { container } = render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                    variant="sm"
                />,
            )

            expect(container.firstChild).toHaveClass('sm')
        })

        it('uses the correct avatar size for the sm variant', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                    variant="sm"
                />,
            )

            expect(screen.getByRole('button')).toHaveStyle({
                height: '28px',
                width: '28px',
            })
        })

        it('uses the correct avatar size for the md variant', () => {
            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                    variant="md"
                />,
            )

            expect(screen.getByRole('button')).toHaveStyle({
                height: '50px',
                width: '50px',
            })
        })
    })

    describe('interaction', () => {
        it('calls onClick when the avatar is clicked', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <UserInfo
                    name="John Doe"
                    email="john@example.com"
                    avatarUrl="/avatar.jpg"
                    onClick={handleClick}
                />,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'John Doe',
                }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })
})
