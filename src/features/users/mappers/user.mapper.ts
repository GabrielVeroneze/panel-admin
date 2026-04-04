import type { UserFormValues } from '../schemas'
import type { UserEntity } from '../types'

const baseDefaultValues: UserFormValues = {
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

export const getUserDefaultValues = (
    user?: UserEntity | null,
): UserFormValues => {
    if (!user) {
        return { ...baseDefaultValues }
    }

    const [firstName, ...rest] = user.name.split(' ')
    const lastName = rest.join(' ')

    return {
        ...baseDefaultValues,
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        email: user.email,
    }
}
