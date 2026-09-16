import { describe, expect, it } from 'vitest'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { CommonProductFields } from './CommonProductFields'
import type { BaseProductFieldsValues } from '@/features/products/schemas'

const defaultValues: BaseProductFieldsValues = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    details: '',
    images: [],
}

describe('CommonProductFields', () => {
    it('renders all product fields', () => {
        const { result } = renderHook(() =>
            useForm<BaseProductFieldsValues>({
                defaultValues,
            }),
        )

        const methods = result.current

        render(
            <FormProvider {...methods}>
                <CommonProductFields />
            </FormProvider>,
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
            screen.getByRole('textbox', { name: 'Details' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('textbox', { name: 'Price' }),
        ).toBeInTheDocument()

        expect(screen.getByLabelText('File upload')).toBeInTheDocument()
    })

    it('renders the expected placeholders', () => {
        const { result } = renderHook(() =>
            useForm<BaseProductFieldsValues>({
                defaultValues,
            }),
        )

        const methods = result.current

        render(
            <FormProvider {...methods}>
                <CommonProductFields />
            </FormProvider>,
        )

        expect(
            screen.getByPlaceholderText('Enter product name'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter category'),
        ).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Enter brand')).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter product details'),
        ).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Enter price')).toBeInTheDocument()
    })

    it('renders the initial values from the form', () => {
        const { result } = renderHook(() =>
            useForm<BaseProductFieldsValues>({
                defaultValues: {
                    name: 'Product',
                    category: 'Electronics',
                    brand: 'Brand',
                    price: 199.99,
                    details: 'Product details',
                    images: [],
                },
            }),
        )

        const methods = result.current

        render(
            <FormProvider {...methods}>
                <CommonProductFields />
            </FormProvider>,
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

        expect(screen.getByRole('textbox', { name: 'Details' })).toHaveValue(
            'Product details',
        )

        expect(screen.getByRole('textbox', { name: 'Price' })).toHaveValue(
            '$199.99',
        )
    })

    it('updates the product name in the form', () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            const name = useWatch({
                control: methods.control,
                name: 'name',
            })

            return (
                <FormProvider {...methods}>
                    <CommonProductFields />
                    <output data-testid="name">{name}</output>
                </FormProvider>
            )
        }

        render(<TestForm />)

        const input = screen.getByRole('textbox', {
            name: 'Product Name',
        })

        fireEvent.change(input, {
            target: {
                value: 'New Product',
            },
        })

        expect(screen.getByTestId('name')).toHaveTextContent('New Product')
    })

    it('updates the category in the form', () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            const category = useWatch({
                control: methods.control,
                name: 'category',
            })

            return (
                <FormProvider {...methods}>
                    <CommonProductFields />
                    <output data-testid="category">{category}</output>
                </FormProvider>
            )
        }

        render(<TestForm />)

        const input = screen.getByRole('textbox', {
            name: 'Category',
        })

        fireEvent.change(input, {
            target: {
                value: 'Electronics',
            },
        })

        expect(screen.getByTestId('category')).toHaveTextContent('Electronics')
    })

    it('updates the brand in the form', () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            const brand = useWatch({
                control: methods.control,
                name: 'brand',
            })

            return (
                <FormProvider {...methods}>
                    <CommonProductFields />
                    <output data-testid="brand">{brand}</output>
                </FormProvider>
            )
        }

        render(<TestForm />)

        const input = screen.getByRole('textbox', {
            name: 'Brand',
        })

        fireEvent.change(input, {
            target: {
                value: 'New Brand',
            },
        })

        expect(screen.getByTestId('brand')).toHaveTextContent('New Brand')
    })

    it('updates the details in the form', () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            const details = useWatch({
                control: methods.control,
                name: 'details',
            })

            return (
                <FormProvider {...methods}>
                    <CommonProductFields />
                    <output data-testid="details">{details}</output>
                </FormProvider>
            )
        }

        render(<TestForm />)

        const textarea = screen.getByRole('textbox', {
            name: 'Details',
        })

        fireEvent.change(textarea, {
            target: {
                value: 'New product details',
            },
        })

        expect(screen.getByTestId('details')).toHaveTextContent(
            'New product details',
        )
    })

    it('displays validation errors for the text fields', () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            return (
                <FormProvider {...methods}>
                    <CommonProductFields />
                    <button
                        type="button"
                        onClick={() => {
                            methods.setError('name', {
                                type: 'manual',
                                message:
                                    'Product name must have at least 2 characters',
                            })

                            methods.setError('category', {
                                type: 'manual',
                                message:
                                    'Category must have at least 2 characters',
                            })

                            methods.setError('brand', {
                                type: 'manual',
                                message:
                                    'Brand must have at least 2 characters',
                            })

                            methods.setError('details', {
                                type: 'manual',
                                message:
                                    'Details must have at least 5 characters',
                            })
                        }}
                    >
                        Set errors
                    </button>
                </FormProvider>
            )
        }

        render(<TestForm />)

        fireEvent.click(screen.getByRole('button', { name: 'Set errors' }))

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

    it('renders the price field', () => {
        const { result } = renderHook(() =>
            useForm<BaseProductFieldsValues>({
                defaultValues,
            }),
        )

        const methods = result.current

        render(
            <FormProvider {...methods}>
                <CommonProductFields />
            </FormProvider>,
        )

        expect(
            screen.getByRole('textbox', { name: 'Price' }),
        ).toBeInTheDocument()
    })

    it('renders the images field', () => {
        const { result } = renderHook(() =>
            useForm<BaseProductFieldsValues>({
                defaultValues,
            }),
        )

        const methods = result.current

        render(
            <FormProvider {...methods}>
                <CommonProductFields />
            </FormProvider>,
        )

        expect(screen.getByLabelText('File upload')).toBeInTheDocument()

        expect(screen.getByText('Drop files to upload')).toBeInTheDocument()
    })
})
