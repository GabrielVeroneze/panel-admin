import {
    SESSION_KEY,
    authUsersDatabase,
    type Session,
    type StoredUser,
} from '../database'
import type {
    AuthUser,
    SignUpPayload,
    SignInPayload,
} from '@/features/auth/types'

const generateId = () => {
    return authUsersDatabase.length + 1
}

const generateToken = () => {
    return crypto.randomUUID()
}

const saveSession = (session: Session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

const getSession = (): Session | null => {
    const session = localStorage.getItem(SESSION_KEY)

    return session ? JSON.parse(session) : null
}

export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
}

export const emailAlreadyExists = (email: string) => {
    return authUsersDatabase.some((user) => user.email === email)
}

export const createAuthUser = (data: SignUpPayload): AuthUser => {
    const user: StoredUser = {
        id: generateId(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&size=150`,
    }

    authUsersDatabase.push(user)

    const { password: _, ...authUser } = user

    return authUser
}

export const findUserById = (id: number): AuthUser | null => {
    const user = authUsersDatabase.find((user) => user.id === id)

    if (!user) {
        return null
    }

    const { password: _, ...authUser } = user

    return authUser
}

export const findUserByCredentials = (data: SignInPayload): AuthUser | null => {
    const user = authUsersDatabase.find(
        (user) => user.email === data.email && user.password === data.password,
    )

    if (!user) {
        return null
    }

    const { password: _, ...authUser } = user

    return authUser
}

export const createSession = (user: AuthUser) => {
    const token = generateToken()

    saveSession({
        token,
        userId: user.id,
    })

    return token
}

export const getCurrentUser = (): AuthUser | null => {
    const session = getSession()

    if (!session) {
        return null
    }

    return findUserById(session.userId)
}

export const validateToken = (token: string) => {
    const session = getSession()

    if (!session) {
        return false
    }

    return session.token === token
}
