import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileHeader } from './ProfileHeader'

const defaultProps = {
    avatar: '/avatars/user-1.jpg',
    name: 'John Doe',
    role: 'Administrator',
    country: 'Brazil',
}

describe('ProfileHeader', () => {
    describe('profile information', () => {
        it('renders the profile header with the provided information', () => {
            render(<ProfileHeader {...defaultProps} />)

            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('Administrator')).toBeInTheDocument()
            expect(screen.getByText('Brazil')).toBeInTheDocument()
        })

        it('renders the avatar with the correct source and accessible name', () => {
            render(<ProfileHeader {...defaultProps} />)

            const avatar = screen.getByRole('img', {
                name: "John Doe's avatar",
            })

            expect(avatar).toHaveAttribute('src', '/avatars/user-1.jpg')
            expect(avatar).toHaveAttribute('alt', "John Doe's avatar")
        })

        it('renders the profile information inside a header element', () => {
            render(<ProfileHeader {...defaultProps} />)

            const header = screen.getByRole('banner')

            expect(header).toContainElement(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            )
            expect(header).toContainElement(
                screen.getByRole('img', {
                    name: "John Doe's avatar",
                }),
            )
        })
    })

    describe('unavailable information', () => {
        it.each([
            ['avatar', { avatar: '' }],
            ['name', { name: '' }],
            ['role', { role: '' }],
            ['country', { country: '' }],
        ])(
            'renders the empty state when %s is unavailable',
            (_, missingProp) => {
                render(<ProfileHeader {...defaultProps} {...missingProp} />)

                expect(
                    screen.getByRole('heading', {
                        level: 3,
                        name: 'Profile information unavailable',
                    }),
                ).toBeInTheDocument()

                expect(
                    screen.getByText(
                        'Basic profile details such as avatar, name, role, or location could not be loaded.',
                    ),
                ).toBeInTheDocument()
            },
        )

        it('does not render the profile information when data is unavailable', () => {
            render(<ProfileHeader {...defaultProps} name="" />)

            expect(
                screen.queryByRole('img', {
                    name: "John Doe's avatar",
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).not.toBeInTheDocument()
        })
    })
})
