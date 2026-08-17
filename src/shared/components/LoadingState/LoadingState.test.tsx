import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LoadingState } from './LoadingState'

describe('LoadingState', () => {
    describe('text layout', () => {
        it('renders the default text loading state', () => {
            const { container } = render(<LoadingState />)

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(3)
        })

        it('renders the provided number of lines', () => {
            const { container } = render(<LoadingState lines={5} />)

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(5)
        })

        it('renders no skeletons when lines is zero', () => {
            const { container } = render(<LoadingState lines={0} />)

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(0)
        })
    })

    describe('avatar layout', () => {
        it('renders the avatar loading state', () => {
            const { container } = render(<LoadingState type="avatar" />)

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(4)
        })

        it('renders the avatar skeleton with the expected size', () => {
            const { container } = render(<LoadingState type="avatar" />)

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(skeletons[0]).toHaveStyle({
                height: '90px',
                width: '90px',
            })
        })
    })

    describe('table layout', () => {
        it('renders the default table loading state', () => {
            const { container } = render(<LoadingState type="table" />)

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(9)
        })

        it('renders the provided number of rows', () => {
            const { container } = render(
                <LoadingState type="table" lines={5} />,
            )

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(15)
        })

        it('renders the provided number of columns', () => {
            const { container } = render(
                <LoadingState type="table" columns={5} />,
            )

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(15)
        })

        it('renders the correct number of skeletons based on rows and columns', () => {
            const { container } = render(
                <LoadingState type="table" lines={4} columns={2} />,
            )

            expect(
                container.querySelectorAll('[class*="skeleton"]'),
            ).toHaveLength(8)
        })
    })

    describe('variant', () => {
        it('applies the compact variant', () => {
            const { container } = render(<LoadingState variant="compact" />)

            expect(container.firstChild).toHaveClass('compact')
        })

        it('applies the compact variant to the avatar layout', () => {
            const { container } = render(
                <LoadingState type="avatar" variant="compact" />,
            )

            expect(container.firstChild).toHaveClass('compact')
        })

        it('applies the compact variant to the table layout', () => {
            const { container } = render(
                <LoadingState type="table" variant="compact" />,
            )

            expect(container.firstChild).toHaveClass('compact')
        })
    })
})
