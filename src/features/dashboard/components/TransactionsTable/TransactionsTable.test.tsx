import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransactionsTable } from './TransactionsTable'
import type { Transaction } from '@/features/dashboard/types'

describe('TransactionsTable', () => {
    it('renders the loading state', () => {
        const { container } = render(<TransactionsTable loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when transactions are not provided', () => {
        render(<TransactionsTable />)

        expect(
            screen.getByRole('heading', { name: 'No transactions' }),
        ).toBeVisible()

        expect(screen.getByText('There are no transactions yet.')).toBeVisible()
    })

    it('renders the table title and description when transactions are provided', () => {
        render(<TransactionsTable transactions={[]} />)

        expect(
            screen.getByRole('heading', { name: 'Transactions' }),
        ).toBeVisible()

        expect(
            screen.getByText('This is a list of latest transactions.'),
        ).toBeVisible()
    })

    it('renders all table headers', () => {
        render(<TransactionsTable transactions={[]} />)

        expect(
            screen.getByRole('columnheader', { name: 'Transaction' }),
        ).toBeVisible()

        expect(
            screen.getByRole('columnheader', { name: 'Date & Time' }),
        ).toBeVisible()

        expect(
            screen.getByRole('columnheader', { name: 'Amount' }),
        ).toBeVisible()

        expect(
            screen.getByRole('columnheader', { name: 'Status' }),
        ).toBeVisible()
    })

    it('renders transaction details', () => {
        const transaction: Transaction = {
            id: 1,
            description: {
                text: 'Purchased',
                highlight: 'Premium Plan',
            },
            date: 'Sep 25, 2026 10:30 AM',
            amount: 1250,
            status: 'completed',
        }

        render(<TransactionsTable transactions={[transaction]} />)

        expect(screen.getByText('Purchased')).toBeVisible()
        expect(screen.getByText('Premium Plan')).toBeVisible()
        expect(screen.getByText('Sep 25, 2026 10:30 AM')).toBeVisible()
        expect(screen.getByText('$1,250')).toBeVisible()
    })

    it('renders the transaction highlight as strong text', () => {
        const transaction: Transaction = {
            id: 1,
            description: {
                text: 'Purchased',
                highlight: 'Premium Plan',
            },
            date: 'Sep 25, 2026 10:30 AM',
            amount: 1250,
            status: 'completed',
        }

        render(<TransactionsTable transactions={[transaction]} />)

        const highlight = screen.getByText('Premium Plan')

        expect(highlight.tagName).toBe('STRONG')
    })

    it('renders the completed status', () => {
        const transaction: Transaction = {
            id: 1,
            description: {
                text: 'Purchased',
                highlight: 'Premium Plan',
            },
            date: 'Sep 25, 2026 10:30 AM',
            amount: 1250,
            status: 'completed',
        }

        render(<TransactionsTable transactions={[transaction]} />)

        expect(screen.getByText('Completed')).toBeVisible()
    })

    it('renders the cancelled status', () => {
        const transaction: Transaction = {
            id: 2,
            description: {
                text: 'Refunded',
                highlight: 'Basic Plan',
            },
            date: 'Sep 24, 2026 02:15 PM',
            amount: 500,
            status: 'cancelled',
        }

        render(<TransactionsTable transactions={[transaction]} />)

        expect(screen.getByText('Cancelled')).toBeVisible()
    })

    it('renders the in-progress status', () => {
        const transaction: Transaction = {
            id: 3,
            description: {
                text: 'Processing',
                highlight: 'Enterprise Plan',
            },
            date: 'Sep 23, 2026 09:00 AM',
            amount: 3000,
            status: 'inProgress',
        }

        render(<TransactionsTable transactions={[transaction]} />)

        expect(screen.getByText('In progress')).toBeVisible()
    })

    it('renders all transactions', () => {
        const transactions: Transaction[] = [
            {
                id: 1,
                description: {
                    text: 'Purchased',
                    highlight: 'Premium Plan',
                },
                date: 'Sep 25, 2026 10:30 AM',
                amount: 1250,
                status: 'completed',
            },
            {
                id: 2,
                description: {
                    text: 'Refunded',
                    highlight: 'Basic Plan',
                },
                date: 'Sep 24, 2026 02:15 PM',
                amount: 500,
                status: 'cancelled',
            },
            {
                id: 3,
                description: {
                    text: 'Processing',
                    highlight: 'Enterprise Plan',
                },
                date: 'Sep 23, 2026 09:00 AM',
                amount: 3000,
                status: 'inProgress',
            },
        ]

        render(<TransactionsTable transactions={transactions} />)

        expect(screen.getAllByRole('row')).toHaveLength(4)
    })

    it('renders an empty table body when transactions is an empty array', () => {
        render(<TransactionsTable transactions={[]} />)

        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getAllByRole('columnheader')).toHaveLength(4)
        expect(screen.getAllByRole('row')).toHaveLength(1)
    })
})
