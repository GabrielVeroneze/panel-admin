import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ModalFooter } from './ModalFooter'

describe('ModalFooter', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<ModalFooter>Footer content</ModalFooter>)

            expect(screen.getByText('Footer content')).toBeInTheDocument()
        })

        it('applies the footer class', () => {
            render(<ModalFooter>Footer content</ModalFooter>)

            expect(screen.getByRole('contentinfo')).toHaveClass('footer')
        })

        it('renders multiple children', () => {
            render(
                <ModalFooter>
                    <button>Cancel</button>
                    <button>Save</button>
                </ModalFooter>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Cancel',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Save',
                }),
            ).toBeInTheDocument()
        })
    })
})
