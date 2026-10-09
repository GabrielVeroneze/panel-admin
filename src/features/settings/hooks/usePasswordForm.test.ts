import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { Toast } from '@/shared/lib'
import { savePassword } from '../store'
import { usePasswordForm } from './usePasswordForm'
import type { PasswordFormValues } from '../schemas'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    savePassword: vi.fn(),
}))

vi.mock('@/shared/lib', () => ({
    Toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

describe('usePasswordForm', () => {
    const dispatch = vi.fn()

    const validValues: PasswordFormValues = {
        currentPassword: 'Current123!',
        newPassword: 'NewPassword123!',
        confirmPassword: 'NewPassword123!',
    }

    const createPasswordAction = (unwrap: () => Promise<void>) => ({
        unwrap,
    })

    const renderPasswordForm = () =>
        renderHook(() => {
            const passwordForm = usePasswordForm()
            const { errors } = passwordForm.form.formState

            return {
                ...passwordForm,
                errors,
            }
        })

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)
    })

    it('returns the form and onSubmit function', () => {
        const { result } = renderPasswordForm()

        expect(result.current.form).toBeDefined()
        expect(result.current.onSubmit).toEqual(expect.any(Function))
    })

    it('initializes the form with empty default values', () => {
        const { result } = renderPasswordForm()

        expect(result.current.form.getValues()).toEqual({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        })
    })

    it('dispatches savePassword with valid values', async () => {
        const unwrap = vi.fn().mockResolvedValue(undefined)
        const passwordAction = createPasswordAction(unwrap)

        vi.mocked(savePassword).mockReturnValue(passwordAction as never)
        dispatch.mockReturnValue(passwordAction)

        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue('newPassword', validValues.newPassword)
            result.current.form.setValue(
                'confirmPassword',
                validValues.confirmPassword,
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(savePassword).toHaveBeenCalledTimes(1)
        expect(savePassword).toHaveBeenCalledWith(validValues)
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(passwordAction)
        expect(unwrap).toHaveBeenCalledTimes(1)
    })

    it('resets the form and shows a success toast after a successful submission', async () => {
        const unwrap = vi.fn().mockResolvedValue(undefined)
        const passwordAction = createPasswordAction(unwrap)

        vi.mocked(savePassword).mockReturnValue(passwordAction as never)
        dispatch.mockReturnValue(passwordAction)

        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue('newPassword', validValues.newPassword)
            result.current.form.setValue(
                'confirmPassword',
                validValues.confirmPassword,
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        await waitFor(() => {
            expect(result.current.form.getValues()).toEqual({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        })

        expect(Toast.success).toHaveBeenCalledTimes(1)
        expect(Toast.success).toHaveBeenCalledWith(
            'Password updated successfully',
        )
        expect(Toast.error).not.toHaveBeenCalled()
    })

    it('shows an error toast when password updating fails', async () => {
        const errorMessage = 'Current password is incorrect'
        const unwrap = vi.fn().mockRejectedValue(errorMessage)
        const passwordAction = createPasswordAction(unwrap)

        vi.mocked(savePassword).mockReturnValue(passwordAction as never)
        dispatch.mockReturnValue(passwordAction)

        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue('newPassword', validValues.newPassword)
            result.current.form.setValue(
                'confirmPassword',
                validValues.confirmPassword,
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(Toast.error).toHaveBeenCalledTimes(1)
        expect(Toast.error).toHaveBeenCalledWith(errorMessage)
        expect(Toast.success).not.toHaveBeenCalled()
    })

    it('does not reset the form when password updating fails', async () => {
        const unwrap = vi
            .fn()
            .mockRejectedValue('Current password is incorrect')
        const passwordAction = createPasswordAction(unwrap)

        vi.mocked(savePassword).mockReturnValue(passwordAction as never)
        dispatch.mockReturnValue(passwordAction)

        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue('newPassword', validValues.newPassword)
            result.current.form.setValue(
                'confirmPassword',
                validValues.confirmPassword,
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(result.current.form.getValues()).toEqual(validValues)
    })

    it('does not dispatch when all fields are empty', async () => {
        const { result } = renderPasswordForm()

        await act(async () => {
            await result.current.onSubmit()
        })

        await waitFor(() => {
            expect(result.current.errors.currentPassword?.message).toBe(
                'Current password is required',
            )

            expect(result.current.errors.newPassword).toBeDefined()

            expect(result.current.errors.confirmPassword?.message).toBe(
                'Confirm password is required',
            )
        })

        expect(savePassword).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
        expect(Toast.success).not.toHaveBeenCalled()
        expect(Toast.error).not.toHaveBeenCalled()
    })

    it.each([
        {
            field: 'currentPassword',
            value: '',
            error: 'Current password is required',
        },
        {
            field: 'newPassword',
            value: 'short',
            error: 'Password must be at least 8 characters',
        },
        {
            field: 'newPassword',
            value: 'lowercase123!',
            error: 'Password must contain at least one uppercase letter',
        },
        {
            field: 'newPassword',
            value: 'UPPERCASE123!',
            error: 'Password must contain at least one lowercase letter',
        },
        {
            field: 'newPassword',
            value: 'NoNumbers!',
            error: 'Password must contain at least one number',
        },
        {
            field: 'newPassword',
            value: 'NoSpecial123',
            error: 'Password must contain at least one special character',
        },
        {
            field: 'confirmPassword',
            value: '',
            error: 'Confirm password is required',
        },
    ] as const)(
        'does not submit when $field is invalid',
        async ({ field, value, error }) => {
            const { result } = renderPasswordForm()

            act(() => {
                result.current.form.setValue(
                    'currentPassword',
                    validValues.currentPassword,
                )
                result.current.form.setValue(
                    'newPassword',
                    validValues.newPassword,
                )
                result.current.form.setValue(
                    'confirmPassword',
                    validValues.confirmPassword,
                )
                result.current.form.setValue(field, value)
            })

            await act(async () => {
                await result.current.onSubmit()
            })

            await waitFor(() => {
                expect(result.current.errors[field]?.message).toBe(error)
            })

            expect(savePassword).not.toHaveBeenCalled()
            expect(dispatch).not.toHaveBeenCalled()
        },
    )

    it('does not submit when the new password and confirmation do not match', async () => {
        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue('newPassword', validValues.newPassword)
            result.current.form.setValue(
                'confirmPassword',
                'DifferentPassword123!',
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        await waitFor(() => {
            expect(result.current.errors.confirmPassword?.message).toBe(
                'Passwords do not match',
            )
        })

        expect(savePassword).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('does not submit when the new password equals the current password', async () => {
        const { result } = renderPasswordForm()

        act(() => {
            result.current.form.setValue(
                'currentPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue(
                'newPassword',
                validValues.currentPassword,
            )
            result.current.form.setValue(
                'confirmPassword',
                validValues.currentPassword,
            )
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        await waitFor(() => {
            expect(result.current.errors.newPassword?.message).toBe(
                'New password must be different from current password',
            )
        })

        expect(savePassword).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })
})
