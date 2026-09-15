import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { PriceField } from './PriceField'
import type { BaseProductFieldsValues } from '@/features/products/schemas'
import userEvent from '@testing-library/user-event'

const defaultValues: BaseProductFieldsValues = {
    name: '',
    category: '',
    brand: '',
    price: 0,
    details: '',
    images: [],
}

const renderPriceField = (values: Partial<BaseProductFieldsValues> = {}) => {
    const Wrapper = () => {
        const methods = useForm<BaseProductFieldsValues>({
            defaultValues: {
                ...defaultValues,
                ...values,
            },
        })

        return (
            <FormProvider {...methods}>
                <PriceField />
            </FormProvider>
        )
    }

    return render(<Wrapper />)
}

describe('PriceField', () => {
    it('renders the price field with the expected label and placeholder', () => {
        renderPriceField()

        expect(
            screen.getByRole('textbox', { name: 'Price' }),
        ).toBeInTheDocument()

        expect(screen.getByPlaceholderText('Enter price')).toBeInTheDocument()
    })

    it('renders the initial price value', () => {
        renderPriceField({
            price: 1234.5,
        })

        const input = screen.getByRole('textbox', {
            name: 'Price',
        })

        expect(input).toHaveValue('$1,234.50')
    })

    it('formats the price with two decimal places', () => {
        renderPriceField({
            price: 25,
        })

        const input = screen.getByRole('textbox', {
            name: 'Price',
        })

        expect(input).toHaveValue('$25.00')
    })

    it('formats thousands using the configured separator', () => {
        renderPriceField({
            price: 1234567.89,
        })

        const input = screen.getByRole('textbox', {
            name: 'Price',
        })

        expect(input).toHaveValue('$1,234,567.89')
    })

    it('updates the form value as a number when the user enters a price', async () => {
        const user = userEvent.setup()
        const handleSubmit = vi.fn()

        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            return (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <PriceField />
                        <button type="submit">Submit</button>
                    </form>
                </FormProvider>
            )
        }

        render(<TestForm />)

        const input = screen.getByRole('textbox', {
            name: 'Price',
        })

        await user.clear(input)
        await user.type(input, '1234.56')

        await user.click(
            screen.getByRole('button', {
                name: 'Submit',
            }),
        )

        expect(handleSubmit).toHaveBeenCalledTimes(1)

        expect(handleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                price: 1234.56,
            }),
            expect.anything(),
        )
    })

    it('does not allow negative values', async () => {
        const user = userEvent.setup()

        renderPriceField({
            price: 50,
        })

        const input = screen.getByRole('textbox', {
            name: 'Price',
        })

        await user.type(input, '-100')

        expect(input).toHaveValue('$50.00')
    })

    it('displays the validation error when the price field has an error', async () => {
        const TestForm = () => {
            const methods = useForm<BaseProductFieldsValues>({
                defaultValues,
            })

            return (
                <FormProvider {...methods}>
                    <PriceField />
                    <button
                        type="button"
                        onClick={() =>
                            methods.setError('price', {
                                type: 'manual',
                                message:
                                    'Price must be greater than or equal to 0',
                            })
                        }
                    >
                        Set error
                    </button>
                </FormProvider>
            )
        }

        const user = userEvent.setup()

        render(<TestForm />)

        await user.click(
            screen.getByRole('button', {
                name: 'Set error',
            }),
        )

        expect(
            await screen.findByText('Price must be greater than or equal to 0'),
        ).toBeInTheDocument()
    })

    it('uses the price field value from the form', () => {
        renderPriceField({
            price: 99.99,
        })

        expect(
            screen.getByRole('textbox', {
                name: 'Price',
            }),
        ).toHaveValue('$99.99')
    })
})
