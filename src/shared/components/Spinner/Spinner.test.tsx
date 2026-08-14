import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
    describe('rendering', () => {
        it('renders the spinner', () => {
            const { container } = render(<Spinner />)

            expect(container.firstElementChild).toBeInTheDocument()
        })

        it('applies the spinner class', () => {
            const { container } = render(<Spinner />)

            expect(container.firstElementChild).toHaveClass('spinner')
        })
    })
})
