import { usersDatabase, type DatabaseUser } from '../database'
import { updateAuthUser, updateProfile, updateSettings } from './'
import type {
    CreateUserPayload,
    UpdateUserPayload,
} from '@/features/users/types'

type UserUpdatedPayload = Omit<UpdateUserPayload, 'password'> & {
    password?: string
}

const generateId = () => {
    return usersDatabase.length + 1
}

export const getUsers = () => {
    return usersDatabase
}

export const getUserById = (id: number): DatabaseUser | null => {
    return usersDatabase.find((user) => user.id === id) ?? null
}

export const createUser = (payload: CreateUserPayload): DatabaseUser => {
    const user: DatabaseUser = {
        ...payload,
        id: generateId(),
        image: payload.avatar
            ? URL.createObjectURL(payload.avatar)
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name)}&background=random&size=150`,
        country: 'United States',
        status: 'active',
    }

    usersDatabase.push(user)

    return user
}

export const updateUser = (
    id: number,
    payload: UserUpdatedPayload,
): DatabaseUser | null => {
    const user = usersDatabase.find((user) => user.id === id)

    if (!user) {
        return null
    }

    const { avatar, ...data } = payload

    Object.assign(user, data)

    if (avatar) {
        user.image = URL.createObjectURL(avatar)
    }

    updateProfile(id, {
        ...data,
        avatar,
    })

    updateSettings(id, {
        ...data,
        avatar,
    })

    updateAuthUser(id, {
        ...data,
        avatar,
    })

    return user
}

export const deleteUser = (id: number) => {
    const index = usersDatabase.findIndex((user) => user.id === id)

    if (index === -1) {
        return false
    }

    usersDatabase.splice(index, 1)

    return true
}

export const deleteUsers = (ids: number[]) => {
    let deletedCount = 0

    ids.forEach((id) => {
        if (deleteUser(id)) {
            deletedCount++
        }
    })

    return deletedCount
}
