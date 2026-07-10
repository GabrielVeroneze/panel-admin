import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/shared/lib'
import { useAuth } from './useAuth'
import { signUpSchema, type SignUpFormValues } from '../schemas'

const defaultValues: SignUpFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
}

export const useSignUpForm = () => {
    const navigate = useNavigate()

    const { signUp, loading, error } = useAuth()

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    })

    const onSubmit = async (data: SignUpFormValues) => {
        await signUp(data)

        Toast.success('Account successfully created')

        navigate('/auth/sign-in')
    }

    return {
        form,
        loading,
        error,
        onSubmit,
    }
}
