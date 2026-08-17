import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
    describe('rendering', () => {
        it('renders the skeleton element', () => {
            const { container } = render(<Skeleton />)

            expect(container.firstChild).toBeInTheDocument()
        })

        it('renders without dimensions when they are not provided', () => {
            const { container } = render(<Skeleton />)

            expect(container.firstChild).toHaveStyle({
                maxWidth: '100%',
            })

            expect(container.firstChild).not.toHaveStyle({
                height: '0px',
                width: '0px',
            })
        })
    })

    describe('dimensions', () => {
        it('applies height and width as numbers', () => {
            const { container } = render(<Skeleton height={40} width={120} />)

            expect(container.firstChild).toHaveStyle({
                height: '40px',
                width: '120px',
            })
        })

        it('applies height and width as strings', () => {
            const { container } = render(<Skeleton height="2rem" width="50%" />)

            expect(container.firstChild).toHaveStyle({
                height: '2rem',
                width: '50%',
            })
        })

        it('always applies a maximum width of 100%', () => {
            const { container } = render(<Skeleton height={40} width={500} />)

            expect(container.firstChild).toHaveStyle({
                maxWidth: '100%',
            })
        })
    })

    describe('className', () => {
        it('applies the provided className', () => {
            const { container } = render(
                <Skeleton className="custom-skeleton" />,
            )

            expect(container.firstChild).toHaveClass('custom-skeleton')
        })
    })
})
