import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { EditProductModal } from './EditProductModal'
import type { Product } from '@/features/products/types'
import type { UpdateProductFormValues } from '@/features/products/schemas'
import userEvent from '@testing-library/user-event'

const product: Product = {
    id: 1,
    name: 'iPhone 15',
    category: 'Smartphones',
    brand: 'Apple',
    price: 999.99,
    description: 'Premium smartphone with advanced features.',
    images: [
        'https://example.com/iphone-15.jpg',
        'https://example.com/iphone-15-2.jpg',
    ],
}

const renderModal = (
    overrides: Partial<React.ComponentProps<typeof EditProductModal>> = {},
) => {
    const onUpdate = vi.fn()
    const onClose = vi.fn()
    const onDelete = vi.fn()

    render(
        <EditProductModal
            open
            product={product}
            onUpdate={onUpdate}
            onClose={onClose}
            onDelete={onDelete}
            {...overrides}
        />,
    )

    return {
        onUpdate,
        onClose,
        onDelete,
    }
}

describe('EditProductModal', () => {
    it('renders the modal content when open', () => {
        renderModal()

        expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
            'open',
        )

        expect(
            screen.getByRole('heading', { name: 'Edit product' }),
        ).toBeVisible()

        expect(screen.getByRole('button', { name: 'Save' })).toBeVisible()

        expect(
            screen.getByRole('button', { name: 'Delete product' }),
        ).toBeVisible()
    })

    it('does not display the modal when open is false', () => {
        renderModal({ open: false })

        const dialog = screen.getByRole('dialog', { hidden: true })

        expect(dialog).not.toHaveAttribute('open')
        expect(dialog).not.toBeVisible()
    })

    it('renders the product values in the form', () => {
        renderModal()

        expect(screen.getByLabelText('Product Name')).toHaveValue(product.name)

        expect(screen.getByLabelText('Category')).toHaveValue(product.category)

        expect(screen.getByLabelText('Brand')).toHaveValue(product.brand)

        expect(screen.getByLabelText('Price')).toHaveValue('$999.99')

        expect(screen.getByLabelText('Details')).toHaveValue(
            product.description,
        )
    })

    it('does not render existing product images as new file previews', () => {
        renderModal()

        expect(screen.queryByAltText('iphone-15.jpg')).not.toBeInTheDocument()

        expect(screen.queryByAltText('iphone-15-2.jpg')).not.toBeInTheDocument()

        expect(screen.queryByText('Drop files to upload')).toBeInTheDocument()
    })

    it('renders the expected form id on the Save button', () => {
        renderModal()

        expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
            'form',
            'product-form',
        )
    })

    it('calls onClose when the close button is clicked', async () => {
        const user = userEvent.setup()
        const { onClose } = renderModal()

        await user.click(screen.getByRole('button', { name: 'Close modal' }))

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onDelete when the delete button is clicked', async () => {
        const user = userEvent.setup()
        const { onDelete } = renderModal()

        await user.click(screen.getByRole('button', { name: 'Delete product' }))

        expect(onDelete).toHaveBeenCalledTimes(1)
    })

    it('does not throw when the delete button is clicked without onDelete', async () => {
        const user = userEvent.setup()

        renderModal({
            onDelete: undefined,
        })

        await expect(
            user.click(screen.getByRole('button', { name: 'Delete product' })),
        ).resolves.not.toThrow()
    })

    it('does not call onUpdate when submitting an invalid form', async () => {
        const user = userEvent.setup()
        const { onUpdate } = renderModal()

        const nameInput = screen.getByLabelText('Product Name')

        await user.clear(nameInput)

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onUpdate).not.toHaveBeenCalled()
        })
    })

    it('calls onUpdate with the product form values when saving without changes', async () => {
        const user = userEvent.setup()
        const { onUpdate } = renderModal()

        await user.click(screen.getByRole('button', { name: 'Save' }))

        const expectedValues: UpdateProductFormValues = {
            name: product.name,
            category: product.category,
            brand: product.brand,
            price: product.price,
            details: product.description,
            images: [],
        }

        await waitFor(() => {
            expect(onUpdate).toHaveBeenCalledTimes(1)
        })

        expect(onUpdate.mock.calls[0][0]).toEqual(expectedValues)
    })

    it('calls onUpdate with the updated form values', async () => {
        const user = userEvent.setup()
        const { onUpdate } = renderModal()

        const nameInput = screen.getByLabelText('Product Name')
        const categoryInput = screen.getByLabelText('Category')
        const brandInput = screen.getByLabelText('Brand')
        const priceInput = screen.getByLabelText('Price')
        const detailsInput = screen.getByLabelText('Details')

        await user.clear(nameInput)
        await user.type(nameInput, 'Galaxy S24')

        await user.clear(categoryInput)
        await user.type(categoryInput, 'Smartphones')

        await user.clear(brandInput)
        await user.type(brandInput, 'Samsung')

        await user.clear(priceInput)
        await user.type(priceInput, '899.99')

        await user.clear(detailsInput)
        await user.type(
            detailsInput,
            'Updated product with new specifications.',
        )

        await user.click(screen.getByRole('button', { name: 'Save' }))

        const expectedValues: UpdateProductFormValues = {
            name: 'Galaxy S24',
            category: 'Smartphones',
            brand: 'Samsung',
            price: 899.99,
            details: 'Updated product with new specifications.',
            images: [],
        }

        await waitFor(() => {
            expect(onUpdate).toHaveBeenCalledTimes(1)
        })

        expect(onUpdate.mock.calls[0][0]).toEqual(expectedValues)
    })

    it('includes a newly selected image when saving the form', async () => {
        const user = userEvent.setup()
        const { onUpdate } = renderModal()

        const file = new File(['image'], 'new-product.jpg', {
            type: 'image/jpeg',
        })

        const fileInput = screen.getByLabelText('File upload')

        await user.upload(fileInput, file)

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onUpdate).toHaveBeenCalledTimes(1)
        })

        const submittedValues = onUpdate.mock
            .calls[0][0] as UpdateProductFormValues

        expect(submittedValues).toEqual({
            name: product.name,
            category: product.category,
            brand: product.brand,
            price: product.price,
            details: product.description,
            images: [file],
        })
    })

    it('does not call onClose when saving the form', async () => {
        const user = userEvent.setup()
        const { onClose, onUpdate } = renderModal()

        await user.click(screen.getByRole('button', { name: 'Save' }))

        await waitFor(() => {
            expect(onUpdate).toHaveBeenCalledTimes(1)
        })

        expect(onClose).not.toHaveBeenCalled()
    })
})
