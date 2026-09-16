import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { ImagesField } from './ImagesField'
import type { BaseProductFieldsValues } from '@/features/products/schemas'

const defaultValues: BaseProductFieldsValues = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    details: '',
    images: [],
}

const createFile = (name: string, type = 'image/jpeg') =>
    new File(['image'], name, { type })

const renderImagesField = (values: Partial<BaseProductFieldsValues> = {}) => {
    const TestForm = () => {
        const methods = useForm<BaseProductFieldsValues>({
            defaultValues: {
                ...defaultValues,
                ...values,
            },
        })

        const images = useWatch({
            control: methods.control,
            name: 'images',
        })

        return (
            <FormProvider {...methods}>
                <ImagesField />
                <output data-testid="images">
                    {images.map((file) => file.name).join(',')}
                </output>
            </FormProvider>
        )
    }

    return render(<TestForm />)
}

describe('ImagesField', () => {
    beforeEach(() => {
        vi.spyOn(URL, 'createObjectURL').mockImplementation(
            (file) => `blob:${(file as File).name}`,
        )
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the upload area', () => {
        renderImagesField()

        expect(screen.getByLabelText('Upload files')).toBeInTheDocument()

        expect(screen.getByText('Drop files to upload')).toBeInTheDocument()
    })

    it('renders the file input with multiple image selection enabled', () => {
        renderImagesField()

        const input = screen.getByLabelText('File upload')

        expect(input).toHaveAttribute('type', 'file')
        expect(input).toHaveAttribute('accept', 'image/*')
        expect(input).toHaveAttribute('multiple')
    })

    it('renders the existing image previews', () => {
        const files = [createFile('product-1.jpg'), createFile('product-2.jpg')]

        renderImagesField({
            images: files,
        })

        expect(
            screen.getByRole('img', { name: 'product-1.jpg' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('img', { name: 'product-2.jpg' }),
        ).toBeInTheDocument()
    })

    it('adds a single selected file to the form value', async () => {
        const file = createFile('product.jpg')

        renderImagesField()

        const input = screen.getByLabelText('File upload')

        fireEvent.change(input, {
            target: {
                files: [file],
            },
        })

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'product.jpg',
            )
        })
    })

    it('adds multiple selected files to the form value', async () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.jpg'),
            createFile('product-3.jpg'),
        ]

        renderImagesField()

        const input = screen.getByLabelText('File upload')

        fireEvent.change(input, {
            target: {
                files,
            },
        })

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'product-1.jpg,product-2.jpg,product-3.jpg',
            )
        })
    })

    it('keeps existing files when new files are selected', async () => {
        const existingFile = createFile('existing.jpg')
        const newFile = createFile('new.jpg')

        renderImagesField({
            images: [existingFile],
        })

        const input = screen.getByLabelText('File upload')

        fireEvent.change(input, {
            target: {
                files: [newFile],
            },
        })

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'existing.jpg,new.jpg',
            )
        })
    })

    it('removes the selected file when its remove button is clicked', async () => {
        const files = [createFile('product-1.jpg'), createFile('product-2.jpg')]

        renderImagesField({
            images: files,
        })

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[0])

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'product-2.jpg',
            )
        })

        expect(
            screen.queryByRole('img', { name: 'product-1.jpg' }),
        ).not.toBeInTheDocument()
    })

    it('removes the correct file when another preview is removed', async () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.jpg'),
            createFile('product-3.jpg'),
        ]

        renderImagesField({
            images: files,
        })

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[1])

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'product-1.jpg,product-3.jpg',
            )
        })

        expect(
            screen.queryByRole('img', { name: 'product-2.jpg' }),
        ).not.toBeInTheDocument()
    })

    it('removes the last file when the last remove button is clicked', async () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.jpg'),
            createFile('product-3.jpg'),
        ]

        renderImagesField({
            images: files,
        })

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[2])

        await waitFor(() => {
            expect(screen.getByTestId('images')).toHaveTextContent(
                'product-1.jpg,product-2.jpg',
            )
        })

        expect(
            screen.queryByRole('img', { name: 'product-3.jpg' }),
        ).not.toBeInTheDocument()
    })

    it('displays the validation error for images', async () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            return (
                <FormProvider {...methods}>
                    <ImagesField />
                    <button
                        type="button"
                        onClick={() =>
                            methods.setError('images', {
                                type: 'manual',
                                message: 'At least one image is required',
                            })
                        }
                    >
                        Set error
                    </button>
                </FormProvider>
            )
        }

        render(<TestForm />)

        fireEvent.click(
            screen.getByRole('button', {
                name: 'Set error',
            }),
        )

        expect(
            await screen.findByText('At least one image is required'),
        ).toBeInTheDocument()
    })
})
