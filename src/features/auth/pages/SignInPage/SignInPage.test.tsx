import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SignInPage } from './SignInPage'

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

    SignInForm: () => <div data-testid="sign-in-form">Sign In Form</div>,
}))

vi.mock('@/shared/assets/images', () => ({
    SignInImage: '/images/sign-in.svg',
}))

describe('SignInPage', () => {
    it('renders the AuthCard', () => {
        render(<SignInPage />)

        expect(screen.getByTestId('auth-card')).toBeInTheDocument()
    })

    it('passes the correct title to AuthCard', () => {
        render(<SignInPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-title',
            'Sign In',
        )
    })

    it('passes the correct image to AuthCard', () => {
        render(<SignInPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-image',
            '/images/sign-in.svg',
        )
    })

    it('passes the correct image alt text to AuthCard', () => {
        render(<SignInPage />)

        expect(screen.getByTestId('auth-card')).toHaveAttribute(
            'data-image-alt',
            'Sign in illustration',
        )
    })

    it('renders the SignInForm inside AuthCard', () => {
        render(<SignInPage />)

        const authCard = screen.getByTestId('auth-card')
        const signInForm = screen.getByTestId('sign-in-form')

        expect(authCard).toContainElement(signInForm)
    })
})
