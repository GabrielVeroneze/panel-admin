import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm, useFormState, useWatch } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { AvatarField } from './AvatarField'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/components', () => ({
    FormField: ({
        children,
        id,
        status,
        message,
    }: {
        children: React.ReactNode
        id: string
        status?: string
        message?: string
    }) => (
        <div data-testid="form-field">
            <div data-testid="field-id">{id}</div>
            <div data-testid="field-status">{status ?? ''}</div>
            {children}
            {message && <span role="alert">{message}</span>}
        </div>
    ),

    UploadDropzone: ({
        children,
        accept,
        onFileSelect,
    }: {
        children: React.ReactNode
        accept?: string
        onFileSelect: (file: File) => void
    }) => (
        <div data-testid="upload-dropzone">
            <span data-testid="accept">{accept}</span>
            <input
                data-testid="file-input"
                type="file"
                accept={accept}
                onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                        onFileSelect(file)
                    }
                }}
            />
            {children}
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

    return (
        <FormProvider {...methods}>
            <AvatarField />
        </FormProvider>
    )
}

describe('AvatarField', () => {
    it('renders the avatar field', () => {
        render(<TestForm />)

        expect(screen.getByTestId('form-field')).toBeInTheDocument()
        expect(screen.getByTestId('field-id')).toHaveTextContent('avatar')
        expect(screen.getByTestId('upload-dropzone')).toBeInTheDocument()
    })

    it('renders the upload instructions', () => {
        render(<TestForm />)

        expect(
            screen.getByText('Drop files to upload your profile picture'),
        ).toBeInTheDocument()
    })

    it('configures the dropzone to accept images', () => {
        render(<TestForm />)

        expect(screen.getByTestId('accept')).toHaveTextContent('image/*')

        expect(screen.getByTestId('file-input')).toHaveAttribute(
            'accept',
            'image/*',
        )
    })

    it('does not display an error when avatar has no validation error', () => {
        render(<TestForm />)

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()

        expect(screen.getByTestId('field-status')).toHaveTextContent('')
    })

    it('updates the form value when a file is selected', async () => {
        const user = userEvent.setup()

        const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })

        const FormWithValue = () => {
            const methods = useForm<BaseUserFieldsValues>({
                defaultValues: {
                    avatar: undefined,
                },
            })

            const avatar = useWatch({
                control: methods.control,
                name: 'avatar',
            })

            return (
                <FormProvider {...methods}>
                    <AvatarField />
                    <output data-testid="avatar-value">
                        {avatar?.name ?? ''}
                    </output>
                </FormProvider>
            )
        }

        render(<FormWithValue />)

        await user.upload(screen.getByTestId('file-input'), file)

        expect(screen.getByTestId('avatar-value')).toHaveTextContent(
            'avatar.png',
        )
    })

    it('marks the avatar field as touched after a file is selected', async () => {
        const user = userEvent.setup()

        const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })

        const FormWithTouchedState = () => {
            const methods = useForm<BaseUserFieldsValues>({
                defaultValues: {
                    avatar: undefined,
                },
            })

            const { touchedFields } = useFormState({
                control: methods.control,
            })

            return (
                <FormProvider {...methods}>
                    <AvatarField />
                    <output data-testid="touched-state">
                        {touchedFields.avatar ? 'touched' : 'untouched'}
                    </output>
                </FormProvider>
            )
        }

        render(<FormWithTouchedState />)

        expect(screen.getByTestId('touched-state')).toHaveTextContent(
            'untouched',
        )

        await user.upload(screen.getByTestId('file-input'), file)

        expect(screen.getByTestId('touched-state')).toHaveTextContent('touched')
    })

    it('displays the avatar validation error', async () => {
        const FormWithError = () => {
            const methods = useForm<BaseUserFieldsValues>()

            const setAvatarError = () => {
                methods.setError('avatar', {
                    type: 'validation',
                    message: 'Invalid image format',
                })
            }

            return (
                <FormProvider {...methods}>
                    <AvatarField />
                    <button type="button" onClick={setAvatarError}>
                        Set error
                    </button>
                </FormProvider>
            )
        }

        const user = userEvent.setup()

        render(<FormWithError />)

        await user.click(
            screen.getByRole('button', {
                name: 'Set error',
            }),
        )

        expect(screen.getByRole('alert')).toHaveTextContent(
            'Invalid image format',
        )

        expect(screen.getByTestId('field-status')).toHaveTextContent('error')
    })

    it('renders the photograph icon and upload text', () => {
        render(<TestForm />)

        expect(screen.getByTestId('upload-dropzone')).toContainElement(
            screen.getByText('Drop files to upload your profile picture'),
        )
    })
})
