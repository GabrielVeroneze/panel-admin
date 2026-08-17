import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { DataTableSkeleton } from './DataTableSkeleton'

describe('DataTableSkeleton', () => {
    describe('rendering', () => {
        it('renders the default number of rows and columns', () => {
            const { container } = render(<DataTableSkeleton />)

            const rows = container.querySelectorAll('[class*="row"]')

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(rows).toHaveLength(15)
            expect(skeletons).toHaveLength(90)
        })

        it('renders the provided number of rows', () => {
            const { container } = render(<DataTableSkeleton rows={5} />)

            const rows = container.querySelectorAll('[class*="row"]')

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(rows).toHaveLength(5)
            expect(skeletons).toHaveLength(30)
        })

        it('renders the provided number of columns', () => {
            const { container } = render(<DataTableSkeleton columns={4} />)

            const rows = container.querySelectorAll('[class*="row"]')

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(rows).toHaveLength(15)
            expect(skeletons).toHaveLength(60)
        })

        it('renders the correct number of skeletons based on rows and columns', () => {
            const { container } = render(
                <DataTableSkeleton rows={4} columns={3} />,
            )

            const rows = container.querySelectorAll('[class*="row"]')

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(rows).toHaveLength(4)
            expect(skeletons).toHaveLength(12)
        })
    })

    describe('className', () => {
        it('applies the provided className to the table', () => {
            const { container } = render(
                <DataTableSkeleton className="custom-table" />,
            )

            const table = container.querySelector('[class*="table"]')

            expect(table).toHaveClass('custom-table')
        })
    })
})
