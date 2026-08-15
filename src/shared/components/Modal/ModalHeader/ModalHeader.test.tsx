import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ModalHeader } from './ModalHeader'
import userEvent from '@testing-library/user-event'

describe('ModalHeader', () => {
    describe('rendering', () => {
        it('renders the title', () => {
            render(<ModalHeader title="Edit user" onClose={vi.fn()} />)

            expect(
                screen.getByRole('heading', {
                    name: 'Edit user',
                }),
            ).toBeInTheDocument()
        })

        it('renders the close button', () => {
            render(<ModalHeader title="Edit user" onClose={vi.fn()} />)

            expect(
                screen.getByRole('button', {
                    name: 'Close modal',
                }),
            ).toBeInTheDocument()
        })

        it('sets the close button size to 22', () => {
            render(<ModalHeader title="Edit user" onClose={vi.fn()} />)

            expect(
                screen.getByRole('button', {
                    name: 'Close modal',
                }),
            ).toHaveStyle({
                width: '22px',
                height: '22px',
            })
        })
    })

    describe('interaction', () => {
        it('calls onClose when the close button is clicked', async () => {
            const user = userEvent.setup()
            const handleClose = vi.fn()

            render(<ModalHeader title="Edit user" onClose={handleClose} />)

            await user.click(
                screen.getByRole('button', {
                    name: 'Close modal',
                }),
            )

            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })
})
