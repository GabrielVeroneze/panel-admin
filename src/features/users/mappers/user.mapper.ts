import type { UserFormValues } from '../schemas'
import type { User, UserListItem } from '../types'

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

export const getUserDefaultValues = (user?: User | null): UserFormValues => {
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

export const mapUserToListItem = (user: User): UserListItem => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    position: user.department,
    country: user.country,
    status: user.status,
})
