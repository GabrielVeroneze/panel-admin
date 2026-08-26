import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SignUpPage } from './SignUpPage'

vi.mock('@/features/auth/components', () => ({
    AuthCard: ({
        children,
        title,
        image,
        imageAlt,
    }: {
        children: React.ReactNode
        title: string
        image: string
        imageAlt: string
    }) => (
        <div
            data-testid="auth-card"
            data-title={title}
            data-image={image}
            data-image-alt={imageAlt}
        >
            {children}
        </div>
    ),

    SignUpForm: () => <div data-testid="sign-up-form">Sign Up Form</div>,
}))

vi.mock('@/shared/assets/images', () => ({
    SignUpImage: '/images/sign-up.svg',
}))

describe('SignUpPage', () => {
    it('renders the AuthCard', () => {
        render(<SignUpPage />)

        expect(screen.getByTestId('auth-card')).toBeInTheDocument()
    })

    it('passes the correct title to AuthCard', () => {
        render(<SignUpPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-title',
            'Create Your Account',
        )
    })

    it('passes the correct image to AuthCard', () => {
        render(<SignUpPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-image',
            '/images/sign-up.svg',
        )
    })

    it('passes the correct image alt text to AuthCard', () => {
        render(<SignUpPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-image-alt',
            'Sign up illustration',
        )
    })

    it('renders the SignUpForm inside AuthCard', () => {
        render(<SignUpPage />)

        const authCard = screen.getByTestId('auth-card')
        const signUpForm = screen.getByTestId('sign-up-form')

        expect(authCard).toContainElement(signUpForm)
    })
})
