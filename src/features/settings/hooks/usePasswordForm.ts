import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { savePassword } from '../store'
import { passwordSchema, type PasswordFormValues } from '../schemas'

const defaultValues: PasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export const usePasswordForm = () => {
    const dispatch = useAppDispatch()

    const passwordLoading = useAppSelector(
        (state) => state.settings.passwordLoading,
    )

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit, reset, setError, clearErrors } = form

    const onSubmit = handleSubmit(async (values) => {
        clearErrors('root.server')

        try {
            await dispatch(savePassword(values)).unwrap()

            reset()

            Toast.success('Password updated successfully.')
        } catch (error) {
            setError('root.server', {
                type: 'server',
                message: getApiErrorMessage(error, {
                    fallback: 'Unable to update password. Please try again.',
                }),
            })
        }
    })

    return {
        form,
        onSubmit,
        passwordLoading,
    }
}
