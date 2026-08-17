import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
    describe('rendering', () => {
        it('renders the title', () => {
            render(<EmptyState title="No users found" />)

            expect(
                screen.getByRole('heading', {
                    name: 'No users found',
                    level: 3,
                }),
            ).toBeInTheDocument()
        })

        it('renders the description when provided', () => {
            render(
                <EmptyState
                    title="No users found"
                    description="There are no users to display."
                />,
            )

            expect(
                screen.getByText('There are no users to display.'),
            ).toBeInTheDocument()
        })

        it('renders the icon when provided', () => {
            render(
                <EmptyState
                    title="No users found"
                    icon={<span data-testid="empty-state-icon">Icon</span>}
                />,
            )

            expect(screen.getByTestId('empty-state-icon')).toBeInTheDocument()
        })

        it('renders the action when provided', () => {
            render(
                <EmptyState
                    title="No users found"
                    action={<button>Create user</button>}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Create user',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('optional content', () => {
        it('does not render the description when it is not provided', () => {
            render(<EmptyState title="No users found" />)

            expect(
                screen.queryByText('There are no users to display.'),
            ).not.toBeInTheDocument()
        })

        it('does not render the icon when it is not provided', () => {
            render(<EmptyState title="No users found" />)

            expect(
                screen.queryByTestId('empty-state-icon'),
            ).not.toBeInTheDocument()
        })

        it('does not render the action when it is not provided', () => {
            render(<EmptyState title="No users found" />)

            expect(
                screen.queryByRole('button', {
                    name: 'Create user',
                }),
            ).not.toBeInTheDocument()
        })
    })
})
