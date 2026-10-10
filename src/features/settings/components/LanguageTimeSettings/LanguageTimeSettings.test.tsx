import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { useLanguageTimeForm } from '@/features/settings/hooks'
import { LanguageTimeSettings } from './LanguageTimeSettings'
import type { SettingsPreferences } from '@/features/settings/types'

const mocks = vi.hoisted(() => ({
    onSubmit: vi.fn((event?: React.SubmitEvent<HTMLFormElement>) => {
        event?.preventDefault()
    }),
    register: vi.fn((name: string) => ({
        name,
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
    })),
}))

vi.mock('@/features/settings/hooks', () => ({
    useLanguageTimeForm: vi.fn(),
}))

vi.mock('./LanguageTimeSettingsSkeleton', () => ({
    LanguageTimeSettingsSkeleton: () => (
        <div data-testid="language-time-settings-skeleton">
            Loading language and time settings
        </div>
    ),
}))

const defaultPreferences: SettingsPreferences = {
    language: 'en',
    timezone: 'America/New_York',
}

const setup = ({
    preferences = defaultPreferences,
    loading = false,
    errors = {},
}: {
    preferences?: SettingsPreferences
    loading?: boolean
    errors?: {
        language?: { message?: string }
        timezone?: { message?: string }
    }
} = {}) => {
    vi.mocked(useLanguageTimeForm).mockReturnValue({
        register: mocks.register,
        onSubmit: mocks.onSubmit,
        formState: { errors },
    } as unknown as ReturnType<typeof useLanguageTimeForm>)

    return render(
        <LanguageTimeSettings preferences={preferences} loading={loading} />,
    )
}

describe('LanguageTimeSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mocks.onSubmit.mockImplementation((event) => {
            event?.preventDefault()
        })
    })

    it('renders the skeleton while loading', () => {
        setup({ loading: true })

        expect(
            screen.getByTestId('language-time-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'Language & Time' }),
        ).not.toBeInTheDocument()
    })

    it('renders the settings card title', () => {
        setup()

        expect(
            screen.getByRole('heading', { name: 'Language & Time' }),
        ).toBeInTheDocument()
    })

    it('renders both selection fields', () => {
        setup()

        expect(
            screen.getByRole('combobox', { name: 'Select Language' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('combobox', { name: 'Select Timezone' }),
        ).toBeInTheDocument()
    })

    it.each([
        ['Select Language', 'language'],
        ['Select Timezone', 'timezone'],
    ])('registers the %s field with the form hook', (label, name) => {
        setup()

        expect(mocks.register).toHaveBeenCalledWith(name)
        expect(screen.getByRole('combobox', { name: label })).toHaveAttribute(
            'name',
            name,
        )
    })

    it('renders all language options', () => {
        setup()

        const languageSelect = screen.getByRole('combobox', {
            name: 'Select Language',
        })

        expect(
            within(languageSelect).getByRole('option', { name: 'English' }),
        ).toHaveValue('en')

        expect(
            within(languageSelect).getByRole('option', {
                name: 'Português',
            }),
        ).toHaveValue('pt-BR')

        expect(
            within(languageSelect).getByRole('option', {
                name: 'Español',
            }),
        ).toHaveValue('es')

        expect(within(languageSelect).getAllByRole('option')).toHaveLength(3)
    })

    it('renders all timezone options', () => {
        setup()

        const timezoneSelect = screen.getByRole('combobox', {
            name: 'Select Timezone',
        })

        expect(
            within(timezoneSelect).getByRole('option', {
                name: '(UTC-03:00) São Paulo',
            }),
        ).toHaveValue('America/Sao_Paulo')

        expect(
            within(timezoneSelect).getByRole('option', {
                name: '(UTC-05:00) New York',
            }),
        ).toHaveValue('America/New_York')

        expect(
            within(timezoneSelect).getByRole('option', {
                name: '(UTC+00:00) London',
            }),
        ).toHaveValue('Europe/London')

        expect(within(timezoneSelect).getAllByRole('option')).toHaveLength(3)
    })

    it('renders the Update submit button', () => {
        setup()

        expect(screen.getByRole('button', { name: 'Update' })).toHaveAttribute(
            'type',
            'submit',
        )
    })

    it('calls the form hook with the provided preferences', () => {
        setup({
            preferences: {
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
            },
        })

        expect(useLanguageTimeForm).toHaveBeenCalledWith({
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        })
    })

    it.each([
        ['language', 'Language is required'],
        ['timezone', 'Timezone is required'],
    ] as const)('renders the validation message for %s', (field, message) => {
        setup({
            errors: {
                [field]: { message },
            },
        })

        expect(screen.getByText(message)).toBeInTheDocument()
    })

    it('does not render validation messages when there are no errors', () => {
        setup()

        expect(
            screen.queryByText('Language is required'),
        ).not.toBeInTheDocument()
        expect(
            screen.queryByText('Timezone is required'),
        ).not.toBeInTheDocument()
    })

    it('calls the submit handler when the form is submitted', () => {
        setup()

        const form = screen
            .getByRole('button', { name: 'Update' })
            .closest('form')

        expect(form).not.toBeNull()

        fireEvent.submit(form!)

        expect(mocks.onSubmit).toHaveBeenCalledTimes(1)
    })

    it('renders the form fields even when preferences are empty strings', () => {
        setup({
            preferences: {
                language: '',
                timezone: '',
            },
        })

        expect(
            screen.getByRole('combobox', { name: 'Select Language' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('combobox', { name: 'Select Timezone' }),
        ).toBeInTheDocument()
    })
})
