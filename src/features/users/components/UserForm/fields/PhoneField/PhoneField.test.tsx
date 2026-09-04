import { useEffect } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { PhoneField } from './PhoneField'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/components', () => ({
    FormField: ({
        children,
        id,
        label,
        status,
        message,
    }: {
        children: React.ReactNode
        id: string
        label?: string
        status?: string
        message?: string
    }) => (
        <div data-testid="form-field">
            <div data-testid="field-id">{id}</div>
            {label && <label htmlFor={id}>{label}</label>}
            <div data-testid="field-status">{status ?? ''}</div>
            {message && <span role="alert">{message}</span>}
            {children}
        </div>
    ),
    Input: ({
        value,
        onChange,
        onBlur,
        placeholder,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input
            {...props}
            value={value ?? ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
        />
    ),
}))

vi.mock('react-phone-number-input/input', () => ({
    default: ({
        value,
        onChange,
        onBlur,
        placeholder,
        defaultCountry,
        size,
        className,
    }: {
        value?: string
        onChange: (value?: string) => void
        onBlur: () => void
        placeholder?: string
        defaultCountry?: string
        size?: string
        className?: string
    }) => (
        <div data-testid="phone-input">
            <input
                id="phone"
                data-testid="phone-input-field"
                value={value ?? ''}
                onChange={(event) => {
                    onChange(event.target.value)
                }}
                onBlur={onBlur}
                placeholder={placeholder}
                data-default-country={defaultCountry}
                data-size={size}
                className={className}
            />
            <button
                type="button"
                data-testid="trigger-undefined"
                onClick={() => onChange(undefined)}
            >
                Clear phone
            </button>
        </div>
    ),
}))

const TestForm = ({
    defaultValues,
}: {
    defaultValues?: Partial<BaseUserFieldsValues>
}) => {
    const methods = useForm<BaseUserFieldsValues>({
        defaultValues,
    })

    const phone = useWatch({
        control: methods.control,
        name: 'phone',
    })

    const { touchedFields } = useFormState({
        control: methods.control,
    })

    return (
        <FormProvider {...methods}>
            <PhoneField />
            <output data-testid="phone-value">{phone ?? ''}</output>
            <output data-testid="touched-state">
                {touchedFields.phone ? 'touched' : 'untouched'}
            </output>
        </FormProvider>
    )
}

describe('PhoneField', () => {
    it('renders the phone field', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field')).toBeInTheDocument()
        expect(screen.getByTestId('field-id')).toHaveTextContent('phone')
        expect(screen.getByTestId('phone-input')).toBeInTheDocument()
    })

    it('renders the phone field label', () => {
        render(<TestForm />)

        expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
    })

    it('renders the phone input with the correct placeholder', () => {
        render(<TestForm />)

        expect(
            screen.getByPlaceholderText('Enter phone number +(123) 456 7890'),
        ).toBeInTheDocument()
    })

    it('configures the phone input with the US as the default country', () => {
        render(<TestForm />)

        expect(screen.getByTestId('phone-input-field')).toHaveAttribute(
            'data-default-country',
            'US',
        )
    })

    it('uses the phone value from the form', () => {
        render(
            <TestForm
                defaultValues={{
                    phone: '+5511987654321',
                }}
            />,
        )

        expect(screen.getByTestId('phone-input-field')).toHaveValue(
            '+5511987654321',
        )
    })

    it('updates the form value when the phone number changes', async () => {
        const user = userEvent.setup()

        render(<TestForm />)

        const input = screen.getByTestId('phone-input-field')

        await user.type(input, '+5511987654321')

        expect(screen.getByTestId('phone-value')).toHaveTextContent(
            '+5511987654321',
        )
    })

    it('converts undefined from onChange to an empty string', async () => {
        const user = userEvent.setup()

        render(
            <TestForm
                defaultValues={{
                    phone: '+5511987654321',
                }}
            />,
        )

        expect(screen.getByTestId('phone-value')).toHaveTextContent(
            '+5511987654321',
        )

        await user.click(screen.getByTestId('trigger-undefined'))

        expect(screen.getByTestId('phone-value')).toHaveTextContent('')
    })

    it('marks the field as touched when it loses focus', async () => {
        const user = userEvent.setup()

        render(<TestForm />)

        expect(screen.getByTestId('touched-state')).toHaveTextContent(
            'untouched',
        )

        const input = screen.getByTestId('phone-input-field')

        await user.click(input)
        await user.tab()

        expect(screen.getByTestId('touched-state')).toHaveTextContent('touched')
    })

    it('does not display an error when phone has no validation error', () => {
        render(<TestForm />)

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        expect(screen.getByTestId('field-status')).toHaveTextContent('')
    })

    it('displays the phone validation error', async () => {
        const FormWithError = () => {
            const methods = useForm<BaseUserFieldsValues>({
                defaultValues: {
                    phone: '',
                },
            })

            useEffect(() => {
                methods.setError('phone', {
                    type: 'validation',
                    message: 'Invalid phone number',
                })
            }, [methods])

            return (
                <FormProvider {...methods}>
                    <PhoneField />
                </FormProvider>
            )
        }

        render(<FormWithError />)

        expect(await screen.findByRole('alert')).toHaveTextContent(
            'Invalid phone number',
        )

        expect(screen.getByTestId('field-status')).toHaveTextContent('error')
    })
})
