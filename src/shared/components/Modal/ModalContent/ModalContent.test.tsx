import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ModalContent } from './ModalContent'

describe('ModalContent', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<ModalContent>Modal content</ModalContent>)

            expect(screen.getByText('Modal content')).toBeInTheDocument()
        })

        it('applies the content class', () => {
            const { container } = render(
                <ModalContent>Modal content</ModalContent>,
            )

            expect(container.firstElementChild).toHaveClass('content')
        })

        it('renders multiple children', () => {
            render(
                <ModalContent>
                    <p>First paragraph</p>
                    <p>Second paragraph</p>
                </ModalContent>,
            )

            expect(screen.getByText('First paragraph')).toBeInTheDocument()

            expect(screen.getByText('Second paragraph')).toBeInTheDocument()
        })
    })
})
