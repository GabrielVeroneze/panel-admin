import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthCard } from './AuthCard'

vi.mock('@/shared/components', () => ({
    Card: ({
        children,
        className,
    }: {
        children: React.ReactNode
        className?: string
    }) => (
        <div data-testid="card" className={className}>
            {children}
        </div>
    ),
}))

describe('AuthCard', () => {
    const defaultProps = {
        title: 'Welcome back',
        image: '/images/auth.svg',
        imageAlt: 'Authentication illustration',
    }

    describe('content', () => {
        it('renders the title', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            expect(
                screen.getByRole('heading', {
                    level: 1,
                    name: 'Welcome back',
                }),
            ).toBeInTheDocument()
        })

        it('renders the children', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            expect(screen.getByText('Form content')).toBeInTheDocument()
        })

        it('renders multiple children', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>First content</p>
                    <button type="button">Continue</button>
                </AuthCard>,
            )

            expect(screen.getByText('First content')).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Continue',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('image', () => {
        it('renders the image with the provided source', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            const image = screen.getByRole('img', {
                name: 'Authentication illustration',
            })

            expect(image).toHaveAttribute('src', '/images/auth.svg')
        })

        it('renders the image with the provided alt text', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            expect(
                screen.getByRole('img', {
                    name: 'Authentication illustration',
                }),
            ).toHaveAttribute('alt', 'Authentication illustration')
        })
    })

    describe('structure', () => {
        it('renders the card container', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            expect(screen.getByTestId('card')).toBeInTheDocument()
        })

        it('renders the illustration section', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            const image = screen.getByRole('img', {
                name: 'Authentication illustration',
            })

            expect(image.parentElement?.tagName).toBe('ASIDE')
        })

        it('renders the content section', () => {
            render(
                <AuthCard {...defaultProps}>
                    <p>Form content</p>
                </AuthCard>,
            )

            const heading = screen.getByRole('heading', {
                level: 1,
                name: 'Welcome back',
            })

            expect(heading.parentElement?.tagName).toBe('DIV')
        })
    })

    describe('props', () => {
        it('renders different values correctly', () => {
            render(
                <AuthCard
                    title="Create your account"
                    image="/images/signup.svg"
                    imageAlt="Sign up illustration"
                >
                    <span>Create account form</span>
                </AuthCard>,
            )

            expect(
                screen.getByRole('heading', {
                    level: 1,
                    name: 'Create your account',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('img', {
                    name: 'Sign up illustration',
                }),
            ).toHaveAttribute('src', '/images/signup.svg')

            expect(screen.getByText('Create account form')).toBeInTheDocument()
        })
    })
})
