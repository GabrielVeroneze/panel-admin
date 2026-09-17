import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { CreateProductModal } from './CreateProductModal'
import userEvent from '@testing-library/user-event'

describe('CreateProductModal', () => {
    const defaultProps = {
        open: true,
        onCreate: vi.fn(),
        onClose: vi.fn(),
    }

    const renderModal = (props: Partial<typeof defaultProps> = {}) => {
        return render(<CreateProductModal {...defaultProps} {...props} />)
    }

    it('renders the modal content when open', () => {
        renderModal()

        expect(screen.getByRole('dialog')).toBeVisible()
        expect(
            screen.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })

    it('renders the create product form fields', () => {
        renderModal()

        expect(screen.getByPlaceholderText('Enter product name')).toBeVisible()

        expect(screen.getByPlaceholderText('Enter category')).toBeVisible()

        expect(screen.getByPlaceholderText('Enter brand')).toBeVisible()

        expect(screen.getByPlaceholderText('Enter price')).toBeVisible()

        expect(
            screen.getByPlaceholderText('Enter product details'),
        ).toBeVisible()

        expect(screen.getByLabelText('File upload')).toBeVisible()
    })

    it('renders the modal with the expected form id', () => {
        renderModal()

        expect(document.getElementById('product-form')).toBeInTheDocument()
    })

    it('renders the modal content when open is true', () => {
        renderModal({ open: true })

        expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('does not display the modal content when open is false', () => {
        const { container } = renderModal({ open: false })

        const dialog = container.querySelector('dialog')

        expect(dialog).toBeInTheDocument()
        expect(dialog).not.toHaveAttribute('open')
    })

    it('calls onClose when the cancel button is clicked', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        renderModal({ onClose })

        await user.click(screen.getByRole('button', { name: 'Cancel' }))

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when the close button is clicked', async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        renderModal({ onClose })

        await user.click(
            screen.getByRole('button', {
                name: 'Close modal',
            }),
        )

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onCreate when submitting an invalid form', async () => {
        const user = userEvent.setup()
        const onCreate = vi.fn()

        renderModal({ onCreate })

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onCreate).not.toHaveBeenCalled()
        })
    })

    it('calls onCreate with the form data when submitting a valid form', async () => {
        const user = userEvent.setup()
        const onCreate = vi.fn()

        render(
            <CreateProductModal open onCreate={onCreate} onClose={vi.fn()} />,
        )

        const file = new File(['image'], 'product.jpg', {
            type: 'image/jpeg',
        })

        await user.type(
            screen.getByPlaceholderText('Enter product name'),
            'iPhone 15',
        )

        await user.type(
            screen.getByPlaceholderText('Enter category'),
            'Smartphones',
        )

        await user.type(screen.getByPlaceholderText('Enter brand'), 'Apple')

        const priceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(priceInput)
        await user.type(priceInput, '999.99')

        await user.type(
            screen.getByPlaceholderText('Enter product details'),
            'Premium smartphone with advanced features.',
        )

        await user.upload(screen.getByLabelText('File upload'), file)

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledTimes(1)

            expect(onCreate).toHaveBeenCalledWith(
                {
                    name: 'iPhone 15',
                    category: 'Smartphones',
                    brand: 'Apple',
                    price: 999.99,
                    details: 'Premium smartphone with advanced features.',
                    images: [file],
                },
                expect.anything(),
            )
        })
    })

    it('submits the form through the Save button outside the form', async () => {
        const user = userEvent.setup()
        const onCreate = vi.fn()

        renderModal({ onCreate })

        await user.type(
            screen.getByPlaceholderText('Enter product name'),
            'iPhone 15',
        )

        await user.type(
            screen.getByPlaceholderText('Enter category'),
            'Smartphones',
        )

        await user.type(screen.getByPlaceholderText('Enter brand'), 'Apple')

        const priceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(priceInput)
        await user.type(priceInput, '999.99')

        await user.type(
            screen.getByPlaceholderText('Enter product details'),
            'Premium smartphone with advanced features.',
        )

        const file = new File(['image'], 'product.jpg', { type: 'image/jpeg' })

        await user.upload(screen.getByLabelText('File upload'), file)

        const saveButton = screen.getByRole('button', {
            name: 'Save',
        })

        expect(saveButton).toHaveAttribute('form', 'product-form')

        await user.click(saveButton)

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledTimes(1)
        })
    })

    it('does not call onClose when the form is submitted successfully', async () => {
        const user = userEvent.setup()
        const onCreate = vi.fn()
        const onClose = vi.fn()

        renderModal({
            onCreate,
            onClose,
        })

        await user.type(
            screen.getByPlaceholderText('Enter product name'),
            'iPhone 15',
        )

        await user.type(
            screen.getByPlaceholderText('Enter category'),
            'Smartphones',
        )

        await user.type(screen.getByPlaceholderText('Enter brand'), 'Apple')

        const priceInput = screen.getByPlaceholderText('Enter price')

        await user.clear(priceInput)
        await user.type(priceInput, '999.99')

        await user.type(
            screen.getByPlaceholderText('Enter product details'),
            'Premium smartphone with advanced features.',
        )

        const file = new File(['image'], 'product.jpg', { type: 'image/jpeg' })

        await user.upload(screen.getByLabelText('File upload'), file)

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onCreate).toHaveBeenCalledTimes(1)
        })

        expect(onClose).not.toHaveBeenCalled()
    })
})
