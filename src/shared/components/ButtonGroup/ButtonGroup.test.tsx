import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ButtonGroup } from './ButtonGroup'

describe('ButtonGroup', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(
                <ButtonGroup>
                    <button>Save</button>
                </ButtonGroup>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Save',
                }),
            ).toBeInTheDocument()
        })

        it('renders multiple children', () => {
            render(
                <ButtonGroup>
                    <button>Save</button>
                    <button>Cancel</button>
                </ButtonGroup>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Save',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Cancel',
                }),
            ).toBeInTheDocument()
        })

        it('applies the group class', () => {
            render(
                <ButtonGroup>
                    <button>Save</button>
                </ButtonGroup>,
            )

            const button = screen.getByRole('button', {
                name: 'Save',
            })

            expect(button.parentElement).toHaveClass('group')
        })
    })
})
