import { useEffect } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { CommonUserFields } from './CommonUserFields'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/components', () => ({
    FormField: ({
        id,
        label,
        message,
        children,
    }: {
        id: string
        label?: string
        message?: string
        children: React.ReactNode
    }) => (
        <div data-testid={`form-field-${id}`}>
            {label && <label htmlFor={id}>{label}</label>}
            {children}
            {message && <span>{message}</span>}
        </div>
    ),

    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input {...props} />
    ),
}))

vi.mock('@/features/users/components', () => ({
    PhoneField: () => (
        <div data-testid="phone-field">
            <input
                placeholder="Enter phone number +(123) 456 7890"
                name="phone"
            />
        </div>
    ),
}))

const TestForm = ({
    defaultValues,
}: {
    defaultValues?: Partial<BaseUserFieldsValues>
}) => {
    const form = useForm<BaseUserFieldsValues>({
        defaultValues,
    })

    return (
        <FormProvider {...form}>
            <CommonUserFields />
        </FormProvider>
    )
}

describe('CommonUserFields', () => {
    it('renders all common user fields', () => {
        render(
            <TestForm
                defaultValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    department: '',
                }}
            />,
        )

        expect(
            screen.getByPlaceholderText('Enter first name'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter last name'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter email address'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter phone number +(123) 456 7890'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter company name'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter department name'),
        ).toBeInTheDocument()
    })

    it('renders the first name field correctly', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field-first-name')).toBeInTheDocument()

        expect(screen.getByText('First Name')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Enter first name')

        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('name', 'firstName')
    })

    it('renders the last name field correctly', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field-last-name')).toBeInTheDocument()

        expect(screen.getByText('Last Name')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Enter last name')

        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('name', 'lastName')
    })

    it('renders the email field correctly', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field-email')).toBeInTheDocument()

        expect(screen.getByText('Email')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Enter email address')

        expect(input).toHaveAttribute('type', 'email')
        expect(input).toHaveAttribute('name', 'email')
    })

    it('renders the company field correctly', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field-company')).toBeInTheDocument()

        expect(screen.getByText('Company')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Enter company name')

        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('name', 'company')
    })

    it('renders the department field correctly', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field-department')).toBeInTheDocument()

        expect(screen.getByText('Department')).toBeInTheDocument()

        const input = screen.getByPlaceholderText('Enter department name')

        expect(input).toHaveAttribute('type', 'text')
        expect(input).toHaveAttribute('name', 'department')
    })

    it('renders PhoneField', () => {
        render(<TestForm />)

        expect(screen.getByTestId('phone-field')).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter phone number +(123) 456 7890'),
        ).toBeInTheDocument()
    })

    it('renders values from the form default values', () => {
        render(
            <TestForm
                defaultValues={{
                    firstName: 'Gabriel',
                    lastName: 'Veroneze',
                    email: 'gabriel@example.com',
                    phone: '+5511999999999',
                    company: 'Acme',
                    department: 'Engineering',
                }}
            />,
        )

        expect(screen.getByPlaceholderText('Enter first name')).toHaveValue(
            'Gabriel',
        )

        expect(screen.getByPlaceholderText('Enter last name')).toHaveValue(
            'Veroneze',
        )

        expect(screen.getByPlaceholderText('Enter email address')).toHaveValue(
            'gabriel@example.com',
        )

        expect(screen.getByPlaceholderText('Enter company name')).toHaveValue(
            'Acme',
        )

        expect(
            screen.getByPlaceholderText('Enter department name'),
        ).toHaveValue('Engineering')
    })

    it('updates registered fields when the user types', async () => {
        const user = userEvent.setup()

        render(<TestForm />)

        const firstNameInput = screen.getByPlaceholderText('Enter first name')

        const lastNameInput = screen.getByPlaceholderText('Enter last name')

        const emailInput = screen.getByPlaceholderText('Enter email address')

        const companyInput = screen.getByPlaceholderText('Enter company name')

        const departmentInput = screen.getByPlaceholderText(
            'Enter department name',
        )

        await user.type(firstNameInput, 'Gabriel')
        await user.type(lastNameInput, 'Veroneze')
        await user.type(emailInput, 'gabriel@example.com')
        await user.type(companyInput, 'Acme')
        await user.type(departmentInput, 'Engineering')

        expect(firstNameInput).toHaveValue('Gabriel')
        expect(lastNameInput).toHaveValue('Veroneze')
        expect(emailInput).toHaveValue('gabriel@example.com')
        expect(companyInput).toHaveValue('Acme')
        expect(departmentInput).toHaveValue('Engineering')
    })

    it('displays errors for invalid fields', async () => {
        const TestFormWithErrors = () => {
            const form = useForm<BaseUserFieldsValues>({
                defaultValues: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    department: '',
                },
            })

            const { setError } = form

            useEffect(() => {
                setError('firstName', {
                    type: 'manual',
                    message: 'First name is required',
                })

                setError('lastName', {
                    type: 'manual',
                    message: 'Last name is required',
                })

                setError('email', {
                    type: 'manual',
                    message: 'Invalid email format',
                })

                setError('company', {
                    type: 'manual',
                    message: 'Company is required',
                })

                setError('department', {
                    type: 'manual',
                    message: 'Department is required',
                })
            }, [setError])

            return (
                <FormProvider {...form}>
                    <CommonUserFields />
                </FormProvider>
            )
        }

        render(<TestFormWithErrors />)

        expect(
            await screen.findByText('First name is required'),
        ).toBeInTheDocument()

        expect(screen.getByText('Last name is required')).toBeInTheDocument()

        expect(screen.getByText('Invalid email format')).toBeInTheDocument()

        expect(screen.getByText('Company is required')).toBeInTheDocument()

        expect(screen.getByText('Department is required')).toBeInTheDocument()
    })
})
