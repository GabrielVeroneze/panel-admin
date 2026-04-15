import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas'
import type {
    CreateUserPayload,
    UpdateUserPayload,
    User,
    UserListItem,
} from '../types'

export const mapUserToUpdateFormValues = (user: User): UpdateUserFormValues => {
    const [firstName, ...rest] = user.name.split(' ')
    const lastName = rest.join(' ')

    return {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        email: user.email,
        phone: user.phone,
        company: user.company,
        department: user.department,
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

export const mapFormToCreatePayload = (
    data: CreateUserFormValues,
): CreateUserPayload => ({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    company: data.company,
    department: data.department,
    password: data.password,
    avatar: data.avatar,
})

export const mapFormToUpdatePayload = (
    data: UpdateUserFormValues,
): UpdateUserPayload => ({
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    company: data.company,
    department: data.department,
    ...(data.currentPassword &&
        data.newPassword && {
            password: {
                current: data.currentPassword,
                new: data.newPassword,
            },
        }),
    ...(data.avatar && { avatar: data.avatar }),
})
