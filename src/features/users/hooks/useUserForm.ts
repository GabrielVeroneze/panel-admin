import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserDefaultValues } from '../mappers'
import { userFormSchema, type UserFormValues } from '../schemas'
import type { User } from '../types'

type UseUserFormProps = {
    user?: User | null
}

export const useUserForm = ({ user }: UseUserFormProps) => {
    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: getUserDefaultValues(user),
        mode: 'onTouched',
    })

    const { reset } = form

    useEffect(() => {
        if (user) {
            reset(getUserDefaultValues(user))
        }
    }, [user, reset])

    return form
}
