import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './useAuth'
import { signInSchema, type SignInFormValues } from '../schemas'

const defaultValues: SignInFormValues = {
    email: '',
    password: '',
    rememberMe: false,
}

export const useSignInForm = () => {
    const navigate = useNavigate()

    const { signIn, loading, error } = useAuth()

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    })

    const onSubmit = async (data: SignInFormValues) => {
        await signIn(data)

        navigate('/')
    }

    return {
        ...form,
        loading,
        error,
        onSubmit,
    }
}
