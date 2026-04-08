import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserSchema, type CreateUserFormValues } from '../schemas'

const defaultValues: CreateUserFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    password: '',
    confirmPassword: '',
    avatar: undefined,
}

export const useCreateUserForm = () => {
    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    })

    return form
}
