import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mapUserToUpdateFormValues } from '../mappers'
import { updateUserSchema, type UpdateUserFormValues } from '../schemas'
import type { User } from '../types'

const defaultValues: UpdateUserFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    currentPassword: '',
    newPassword: '',
    avatar: undefined,
}

export const useEditUserForm = (user?: User | null) => {
    const form = useForm<UpdateUserFormValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: user ? mapUserToUpdateFormValues(user) : defaultValues,
        mode: 'onTouched',
    })

    const { reset } = form

    useEffect(() => {
        if (user) {
            reset(mapUserToUpdateFormValues(user))
        }
    }, [user, reset])

    return form
}
