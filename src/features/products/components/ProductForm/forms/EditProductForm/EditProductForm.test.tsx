import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditProductForm } from './EditProductForm'
import type { Product } from '@/features/products/types'
import userEvent from '@testing-library/user-event'

const formId = 'edit-product-form'

const product: Product = {
    id: 1,
    name: 'Product',
    category: 'Electronics',
    brand: 'Brand',
    price: 199.99,
    description: 'Product description',
    images: ['product.jpg'],
}

describe('EditProductForm', () => {
    it('renders the form with the provided id', () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        const form = document.getElementById(formId)

        expect(form).toBeInTheDocument()
        expect(form).toHaveAttribute('id', formId)
    })

    it('renders all product fields', () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        expect(
            screen.getByRole('textbox', { name: 'Product Name' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', { name: 'Category' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', { name: 'Brand' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', { name: 'Price' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', { name: 'Details' }),
        ).toBeInTheDocument()

        expect(screen.getByLabelText('File upload')).toBeInTheDocument()
    })

    it('renders the product values when a product is provided', () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        expect(
            screen.getByRole('textbox', { name: 'Product Name' }),
        ).toHaveValue('Product')

        expect(screen.getByRole('textbox', { name: 'Category' })).toHaveValue(
            'Electronics',
        )

        expect(screen.getByRole('textbox', { name: 'Brand' })).toHaveValue(
            'Brand',
        )

        expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
            '$199.99',
        )

        expect(screen.getByRole('textbox', { name: 'Details' })).toHaveValue(
            'Product description',
        )
    })

    it('does not render the existing product image as a new upload', () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        expect(
            screen.queryByRole('img', { name: 'product.jpg' }),
        ).not.toBeInTheDocument()
    })

    it('uses empty default values when no product is provided', () => {
        const onSubmit = vi.fn()

        render(<EditProductForm formId={formId} onSubmit={onSubmit} />)

        expect(
            screen.getByRole('textbox', { name: 'Product Name' }),
        ).toHaveValue('')

        expect(screen.getByRole('textbox', { name: 'Category' })).toHaveValue(
            '',
        )

        expect(screen.getByRole('textbox', { name: 'Brand' })).toHaveValue('')

        expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
            '$0.00',
        )

        expect(screen.getByRole('textbox', { name: 'Details' })).toHaveValue('')
    })

    it('uses empty default values when the product is null', () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={null}
                onSubmit={onSubmit}
            />,
        )

        expect(
            screen.getByRole('textbox', { name: 'Product Name' }),
        ).toHaveValue('')

        expect(screen.getByRole('textbox', { name: 'Category' })).toHaveValue(
            '',
        )

        expect(screen.getByRole('textbox', { name: 'Brand' })).toHaveValue('')

        expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
            '$0.00',
        )

        expect(screen.getByRole('textbox', { name: 'Details' })).toHaveValue('')
    })

    it('does not call onSubmit when the form is submitted with invalid data', async () => {
        const onSubmit = vi.fn()

        render(<EditProductForm formId={formId} onSubmit={onSubmit} />)

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalled()
        })

        expect(
            screen.getByText('Product name must have at least 2 characters'),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Category must have at least 2 characters'),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Brand must have at least 2 characters'),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Details must have at least 5 characters'),
        ).toBeInTheDocument()
    })

    it('calls onSubmit with the product values when the form is submitted without changes', async () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
        })

        const submittedData = onSubmit.mock.calls[0][0]

        expect(submittedData).toEqual({
            name: 'Product',
            category: 'Electronics',
            brand: 'Brand',
            price: 199.99,
            details: 'Product description',
            images: [],
        })
    })

    it('calls onSubmit with the updated form values', async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        const nameInput = screen.getByRole('textbox', {
            name: 'Product Name',
        })

        const categoryInput = screen.getByRole('textbox', {
            name: 'Category',
        })

        const brandInput = screen.getByRole('textbox', {
            name: 'Brand',
        })

        const priceInput = screen.getByRole('textbox', {
            name: 'Price',
        })

        const detailsInput = screen.getByRole('textbox', {
            name: 'Details',
        })

        await user.clear(nameInput)
        await user.type(nameInput, 'Updated Product')

        await user.clear(categoryInput)
        await user.type(categoryInput, 'Updated Category')

        await user.clear(brandInput)
        await user.type(brandInput, 'Updated Brand')

        await user.clear(priceInput)
        await user.type(priceInput, '299.99')

        await user.clear(detailsInput)
        await user.type(detailsInput, 'Updated product description')

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
        })

        const submittedData = onSubmit.mock.calls[0][0]

        expect(submittedData).toEqual({
            name: 'Updated Product',
            category: 'Updated Category',
            brand: 'Updated Brand',
            price: 299.99,
            details: 'Updated product description',
            images: [],
        })
    })

    it('includes newly selected images in the submitted values', async () => {
        const onSubmit = vi.fn()

        render(
            <EditProductForm
                formId={formId}
                product={product}
                onSubmit={onSubmit}
            />,
        )

        const file = new File(['image'], 'new-product.jpg', {
            type: 'image/jpeg',
        })

        fireEvent.change(screen.getByLabelText('File upload'), {
            target: {
                files: [file],
            },
        })

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
        })

        const submittedData = onSubmit.mock.calls[0][0]

        expect(submittedData).toEqual({
            name: 'Product',
            category: 'Electronics',
            brand: 'Brand',
            price: 199.99,
            details: 'Product description',
            images: [file],
        })
    })
})
