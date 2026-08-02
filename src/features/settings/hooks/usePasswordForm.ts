import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/shared/lib'
import { useAppDispatch } from '@/store'
import { savePassword } from '../store'
import { passwordSchema, type PasswordFormValues } from '../schemas'

const defaultValues: PasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export const usePasswordForm = () => {
    const dispatch = useAppDispatch()

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit, reset } = form

    const onSubmit = handleSubmit(async (values) => {
        try {
            await dispatch(savePassword(values)).unwrap()

            reset()

            Toast.success('Password updated successfully')
        } catch (error) {
            Toast.error(String(error))
        }
    })

    return {
        form,
        onSubmit,
    }
}
