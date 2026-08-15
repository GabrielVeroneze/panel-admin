import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DropdownDivider } from './DropdownDivider'

describe('DropdownDivider', () => {
    describe('rendering', () => {
        it('renders the divider', () => {
            render(<DropdownDivider />)

            expect(screen.getByRole('separator')).toBeInTheDocument()
        })

        it('applies the divider class', () => {
            render(<DropdownDivider />)

            expect(screen.getByRole('separator')).toHaveClass('divider')
        })
    })
})
