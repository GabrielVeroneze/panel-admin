import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileContactInfo } from './ProfileContactInfo'

describe('ProfileContactInfo', () => {
    describe('contact information', () => {
        const contact = {
            email: 'john@example.com',
            address: '123 Main Street, São Paulo',
            phone: '+55 11 99999-9999',
        }

        it('renders the contact section title', () => {
            render(<ProfileContactInfo contact={contact} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).toBeInTheDocument()
        })

        it('renders the email address', () => {
            render(<ProfileContactInfo contact={contact} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Email Address',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('john@example.com')).toBeInTheDocument()
        })

        it('renders the home address', () => {
            render(<ProfileContactInfo contact={contact} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Home Address',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText('123 Main Street, São Paulo'),
            ).toBeInTheDocument()
        })

        it('renders the phone number', () => {
            render(<ProfileContactInfo contact={contact} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Phone Number',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('+55 11 99999-9999')).toBeInTheDocument()
        })

        it('renders all contact information items', () => {
            render(<ProfileContactInfo contact={contact} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Email Address',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Home Address',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Phone Number',
                }),
            ).toBeInTheDocument()
        })

        it('renders the compact profile section card', () => {
            const { container } = render(
                <ProfileContactInfo contact={contact} />,
            )

            expect(container.firstElementChild).toHaveClass('card', 'compact')
        })

        it('renders the contact items inside the content area', () => {
            const { container } = render(
                <ProfileContactInfo contact={contact} />,
            )

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(1)
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when contact information is unavailable', () => {
            render(<ProfileContactInfo contact={null as never} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Contact information unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Email address, phone number, and location details are currently unavailable.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render the contact section when information is unavailable', () => {
            render(<ProfileContactInfo contact={null as never} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).not.toBeInTheDocument()
        })
    })
})
