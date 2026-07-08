import type {
    AuthUser,
    SignUpPayload,
    SignInPayload,
} from '@/features/auth/types'

type StoredUser = AuthUser & {
    password: string
}

const users: StoredUser[] = [
    {
        id: 1,
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        password: '123456',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
]

let currentToken: string | null = null

let currentUserId: number | null = null

const generateId = () => {
    return users.length + 1
}

const generateToken = () => {
    return crypto.randomUUID()
}

export const createUser = (data: SignUpPayload): AuthUser => {
    const user: StoredUser = {
        id: generateId(),
        name: '',
        email: data.email,
        password: data.password,
        role: 'user',
        avatar: '',
    }

    users.push(user)

    return user
}

export const emailAlreadyExists = (email: string) => {
    return users.some((user) => user.email === email)
}

export const findUserByCredentials = (data: SignInPayload): AuthUser | null => {
    const user = users.find(
        (user) => user.email === data.email && user.password === data.password,
    )

    if (!user) {
        return null
    }

    return user
}

export const createSession = (user: AuthUser) => {
    currentUserId = user.id
    currentToken = generateToken()

    return currentToken
}

export const getCurrentUser = () => {
    if (!currentUserId) {
        return null
    }

    const user = users.find((user) => user.id === currentUserId)

    if (!user) {
        return null
    }

    return user
}

export const validateToken = (token: string) => {
    return token === currentToken
}

export const clearSession = () => {
    currentToken = null
    currentUserId = null
}
