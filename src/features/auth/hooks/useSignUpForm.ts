import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './useAuth'
import { signUpSchema, type SignUpFormValues } from '../schemas'

const defaultValues: SignUpFormValues = {
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

        navigate('/auth/sign-in')
    }

    return {
        ...form,
        loading,
        error,
        onSubmit,
    }
}
