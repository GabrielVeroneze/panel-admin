import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

    const { handleSubmit } = form

    const onSubmit = handleSubmit(async (values) => {
        await dispatch(savePassword(values))
    })

    return {
        ...form,
        onSubmit,
    }
}
