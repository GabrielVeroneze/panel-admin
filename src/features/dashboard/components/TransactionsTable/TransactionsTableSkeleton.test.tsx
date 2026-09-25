import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { TransactionsTableSkeleton } from './TransactionsTableSkeleton'

describe('TransactionsTableSkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the header', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelector('.header')).toBeInTheDocument()
    })

    it('renders the title skeleton', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelector('.titleSkeleton')).toBeInTheDocument()
    })

    it('renders the text skeleton', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelector('.textSkeleton')).toBeInTheDocument()
    })

    it('renders the table container and skeleton', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelector('.tableContainer')).toBeInTheDocument()

        expect(container.querySelector('.tableSkeleton')).toBeInTheDocument()
    })

    it('renders seven transaction rows', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        const tableSkeleton = container.querySelector('.tableSkeleton')

        expect(tableSkeleton?.children).toHaveLength(7)
    })

    it('renders a transaction skeleton for each row', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelectorAll('.transactionSkeleton')).toHaveLength(
            7,
        )
    })

    it('renders a date skeleton for each row', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelectorAll('.dateSkeleton')).toHaveLength(7)
    })

    it('renders an amount skeleton for each row', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelectorAll('.amountSkeleton')).toHaveLength(7)
    })

    it('renders a status skeleton for each row', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        expect(container.querySelectorAll('.statusSkeleton')).toHaveLength(7)
    })

    it('renders four skeletons in each transaction row', () => {
        const { container } = render(<TransactionsTableSkeleton />)

        const rows = container.querySelector('.tableSkeleton')?.children

        expect(rows).toHaveLength(7)

        Array.from(rows ?? []).forEach((row) => {
            expect(row.children).toHaveLength(4)
        })
    })
})
