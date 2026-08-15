import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
    beforeAll(() => {
        Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
            configurable: true,
            value: vi.fn(),
        })

        Object.defineProperty(HTMLDialogElement.prototype, 'close', {
            configurable: true,
            value: vi.fn(),
        })
    })

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('rendering', () => {
        it('renders its children', () => {
            render(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(screen.getByText('Modal content')).toBeInTheDocument()
        })

        it('renders a dialog element', () => {
            render(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(
                screen.getByRole('dialog', { hidden: true }),
            ).toBeInTheDocument()
        })

        it('applies the modal class', () => {
            render(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
                'modal',
            )
        })
    })

    describe('open state', () => {
        it('calls showModal when open is true', () => {
            render(
                <Modal open onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(
                1,
            )
        })

        it('calls close when open is false', () => {
            render(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)
        })

        it('calls showModal when open changes to true', () => {
            const { rerender } = render(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            vi.clearAllMocks()

            rerender(
                <Modal open onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(
                1,
            )

            expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled()
        })

        it('calls close when open changes to false', () => {
            const { rerender } = render(
                <Modal open onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            vi.clearAllMocks()

            rerender(
                <Modal open={false} onClose={vi.fn()}>
                    Modal content
                </Modal>,
            )

            expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1)

            expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled()
        })
    })

    describe('closing', () => {
        it('calls onClose when the dialog emits a close event', () => {
            const handleClose = vi.fn()

            render(
                <Modal open onClose={handleClose}>
                    Modal content
                </Modal>,
            )

            const dialog = screen.getByRole('dialog', { hidden: true })

            fireEvent(dialog, new Event('close'))

            expect(handleClose).toHaveBeenCalledTimes(1)
        })

        it('calls onClose when clicking the dialog itself', () => {
            const handleClose = vi.fn()

            render(
                <Modal open onClose={handleClose}>
                    Modal content
                </Modal>,
            )

            const dialog = screen.getByRole('dialog', { hidden: true })

            fireEvent.click(dialog)

            expect(handleClose).toHaveBeenCalledTimes(1)
        })

        it('does not call onClose when clicking its children', () => {
            const handleClose = vi.fn()

            render(
                <Modal open onClose={handleClose}>
                    <button>Save</button>
                </Modal>,
            )

            const button = screen.getByText('Save')

            fireEvent.click(button)

            expect(handleClose).not.toHaveBeenCalled()
        })
    })
})
