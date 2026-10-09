import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useGeneralInformationForm } from '@/features/settings/hooks'
import { GeneralInformationSettings } from './GeneralInformationSettings'
import type { GeneralInformation } from '@/features/settings/types'

const { onSubmit } = vi.hoisted(() => ({
    onSubmit: vi.fn((event?: React.SubmitEvent<HTMLFormElement>) => {
        event?.preventDefault()
    }),
}))

vi.mock('@/features/settings/hooks', () => ({
    useGeneralInformationForm: vi.fn(),
}))

vi.mock('./GeneralInformationSettingsSkeleton', () => ({
    GeneralInformationSettingsSkeleton: () => (
        <div data-testid="general-information-skeleton">
            Loading general information
        </div>
    ),
}))

describe('GeneralInformationSettings', () => {
    const data: GeneralInformation = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        phone: '+14155552671',
        birthDate: '1990-05-15',
        organization: 'Acme Inc.',
        department: 'Engineering',
        address: '123 Main Street',
        city: 'New York',
        country: 'US',
        zipCode: '10001',
    }

    const fields = [
        { label: 'First Name', name: 'firstName' },
        { label: 'Last Name', name: 'lastName' },
        { label: 'Email', name: 'email' },
        { label: 'Role', name: 'role' },
        { label: 'Phone Number', name: 'phone' },
        { label: 'Birth Date', name: 'birthDate' },
        { label: 'Organization', name: 'organization' },
        { label: 'Department', name: 'department' },
        { label: 'Address', name: 'address' },
        { label: 'City', name: 'city' },
        { label: 'Zip Code', name: 'zipCode' },
    ] as const

    const register = (name: string) => ({
        name,
        value: data[name as keyof GeneralInformation],
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
    })

    const form = {
        register,
        formState: {
            errors: {},
        },
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useGeneralInformationForm).mockReturnValue({
            form: form as never,
            onSubmit: onSubmit as never,
        })
    })

    it('renders the skeleton while loading', () => {
        render(<GeneralInformationSettings data={data} loading />)

        expect(
            screen.getByTestId('general-information-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'General information',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders the section title', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(
            screen.getByRole('heading', {
                name: 'General information',
            }),
        ).toBeInTheDocument()
    })

    it.each(fields)('renders the $label field', ({ label }) => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(screen.getByLabelText(label)).toBeInTheDocument()
    })

    it('renders all initial values in the form fields', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(screen.getByLabelText('First Name')).toHaveValue('John')
        expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
        expect(screen.getByLabelText('Email')).toHaveValue(
            'john.doe@example.com',
        )
        expect(screen.getByLabelText('Role')).toHaveValue('Administrator')
        expect(screen.getByLabelText('Phone Number')).toHaveValue(
            '+14155552671',
        )
        expect(screen.getByLabelText('Birth Date')).toHaveValue('1990-05-15')
        expect(screen.getByLabelText('Organization')).toHaveValue('Acme Inc.')
        expect(screen.getByLabelText('Department')).toHaveValue('Engineering')
        expect(screen.getByLabelText('Address')).toHaveValue('123 Main Street')
        expect(screen.getByLabelText('City')).toHaveValue('New York')
        expect(screen.getByLabelText('Country')).toHaveValue('US')
        expect(screen.getByLabelText('Zip Code')).toHaveValue('10001')
    })

    it('renders the available country options', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        const countrySelect = screen.getByLabelText('Country')

        expect(
            screen.getByRole('option', { name: 'United States' }),
        ).toHaveValue('US')

        expect(screen.getByRole('option', { name: 'Brazil' })).toHaveValue('BR')

        expect(screen.getByRole('option', { name: 'Canada' })).toHaveValue('CA')

        expect(
            screen.getByRole('option', { name: 'United Kingdom' }),
        ).toHaveValue('GB')

        expect(screen.getByRole('option', { name: 'Germany' })).toHaveValue(
            'DE',
        )

        expect(screen.getByRole('option', { name: 'France' })).toHaveValue('FR')

        expect(screen.getByRole('option', { name: 'Spain' })).toHaveValue('ES')

        expect(screen.getByRole('option', { name: 'Portugal' })).toHaveValue(
            'PT',
        )

        expect(countrySelect.querySelectorAll('option')).toHaveLength(8)
    })

    it('renders the update button', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(
            screen.getByRole('button', { name: 'Update' }),
        ).toBeInTheDocument()
    })

    it('calls onSubmit when the form is submitted', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        fireEvent.submit(
            screen.getByRole('button', { name: 'Update' }).closest('form')!,
        )

        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('passes the provided data to the form hook', () => {
        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(useGeneralInformationForm).toHaveBeenCalledWith(data)
    })

    it('renders validation messages when fields have errors', () => {
        const formWithErrors = {
            ...form,
            formState: {
                errors: {
                    firstName: { message: 'First name is required' },
                    email: { message: 'Enter a valid email' },
                },
            },
        }

        vi.mocked(useGeneralInformationForm).mockReturnValue({
            form: formWithErrors as never,
            onSubmit: onSubmit as never,
        })

        render(<GeneralInformationSettings data={data} loading={false} />)

        expect(screen.getByText('First name is required')).toBeInTheDocument()

        expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
    })
})
