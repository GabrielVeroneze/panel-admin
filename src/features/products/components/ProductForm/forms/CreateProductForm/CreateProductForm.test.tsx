import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'
import { CreateProductForm } from './CreateProductForm'
import type { CreateProductFormValues } from '@/features/products/schemas'
import userEvent from '@testing-library/user-event'

vi.mock('@/features/products/components', () => ({
    CommonProductFields: () => {
        const { register, setValue } = useFormContext<CreateProductFormValues>()

        return (
            <>
                <input aria-label="Product Name" {...register('name')} />
                <input aria-label="Category" {...register('category')} />
                <input aria-label="Brand" {...register('brand')} />
                <input
                    aria-label="Price"
                    type="number"
                    {...register('price', {
                        valueAsNumber: true,
                    })}
                />
                <textarea aria-label="Details" {...register('details')} />
                <input
                    aria-label="Images"
                    type="file"
                    multiple
                    onChange={(event) => {
                        const files = Array.from(event.target.files ?? [])

                        setValue('images', files, {
                            shouldValidate: true,
                            shouldTouch: true,
                        })
                    }}
                />
            </>
        )
    },
}))

describe('CreateProductForm', () => {
    const formId = 'create-product-form'

    const createFile = (name = 'product.png', type = 'image/png') =>
        new File(['image'], name, {
            type,
        })

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the form with the provided id', () => {
        render(<CreateProductForm formId={formId} onSubmit={vi.fn()} />)

        expect(document.getElementById(formId)).toBeInTheDocument()
    })

    it('renders all product fields', () => {
        render(<CreateProductForm formId={formId} onSubmit={vi.fn()} />)

        expect(
            screen.getByRole('textbox', {
                name: 'Product Name',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', {
                name: 'Category',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', {
                name: 'Brand',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('spinbutton', {
                name: 'Price',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', {
                name: 'Details',
            }),
        ).toBeInTheDocument()

        expect(screen.getByLabelText('Images')).toBeInTheDocument()
    })

    it('does not call onSubmit when the form is submitted with invalid data', async () => {
        const onSubmit = vi.fn()

        render(<CreateProductForm formId={formId} onSubmit={onSubmit} />)

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).not.toHaveBeenCalled()
        })
    })

    it('calls onSubmit with the form data when the form is valid', async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()

        render(<CreateProductForm formId={formId} onSubmit={onSubmit} />)

        await user.type(
            screen.getByRole('textbox', {
                name: 'Product Name',
            }),
            'Product',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Category',
            }),
            'Electronics',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Brand',
            }),
            'Brand',
        )

        await user.clear(
            screen.getByRole('spinbutton', {
                name: 'Price',
            }),
        )

        await user.type(
            screen.getByRole('spinbutton', {
                name: 'Price',
            }),
            '100',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Details',
            }),
            'Product details',
        )

        fireEvent.change(screen.getByLabelText('Images'), {
            target: {
                files: [createFile()],
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
            price: 100,
            details: 'Product details',
            images: expect.any(Array),
        })

        expect(submittedData.images).toHaveLength(1)
        expect(submittedData.images[0]).toBeInstanceOf(File)
    })

    it('submits the current form values', async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()

        render(<CreateProductForm formId={formId} onSubmit={onSubmit} />)

        await user.type(
            screen.getByRole('textbox', {
                name: 'Product Name',
            }),
            'Updated Product',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Category',
            }),
            'Updated Category',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Brand',
            }),
            'Updated Brand',
        )

        await user.clear(
            screen.getByRole('spinbutton', {
                name: 'Price',
            }),
        )

        await user.type(
            screen.getByRole('spinbutton', {
                name: 'Price',
            }),
            '500',
        )

        await user.type(
            screen.getByRole('textbox', {
                name: 'Details',
            }),
            'Updated product details',
        )

        fireEvent.change(screen.getByLabelText('Images'), {
            target: {
                files: [createFile('updated.png')],
            },
        })

        fireEvent.submit(document.getElementById(formId)!)

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
        })

        const submittedData = onSubmit.mock.calls[0][0]

        expect(submittedData).toEqual({
            name: 'Updated Product',
            category: 'Updated Category',
            brand: 'Updated Brand',
            price: 500,
            details: 'Updated product details',
            images: expect.any(Array),
        })

        expect(submittedData.images).toHaveLength(1)
        expect(submittedData.images[0]).toBeInstanceOf(File)
    })
})
