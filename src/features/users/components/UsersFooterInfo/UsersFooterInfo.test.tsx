import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UsersFooterInfo } from './UsersFooterInfo'

vi.mock('@/shared/assets/icons', () => ({
    EyeSolidIcon: ({ className }: { className?: string }) => (
        <span data-testid="eye-icon" className={className} />
    ),
}))

describe('UsersFooterInfo', () => {
    it('renders the last account activity text', () => {
        render(<UsersFooterInfo />)

        expect(screen.getByText('Last account activity:')).toBeInTheDocument()
    })

    it('renders the last account activity time', () => {
        render(<UsersFooterInfo />)

        expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    })

    it('renders the activity time as strong text', () => {
        render(<UsersFooterInfo />)

        const time = screen.getByText('2 hours ago')

        expect(time.tagName).toBe('STRONG')
    })

    it('renders the eye icon', () => {
        render(<UsersFooterInfo />)

        expect(screen.getByTestId('eye-icon')).toBeInTheDocument()
    })

    it('passes the className to the eye icon', () => {
        render(<UsersFooterInfo />)

        const icon = screen.getByTestId('eye-icon')

        expect(icon).toHaveAttribute('class', expect.any(String))
    })
})
