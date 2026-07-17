import {
    MOCK_SESSION_KEY,
    authUsersDatabase,
    type MockSession,
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

const saveMockSession = (session: MockSession) => {
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
}

const getMockSession = (): MockSession | null => {
    const session = localStorage.getItem(MOCK_SESSION_KEY)

    return session ? JSON.parse(session) : null
}

export const clearMockSession = () => {
    localStorage.removeItem(MOCK_SESSION_KEY)
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

export const createMockSession = (user: AuthUser) => {
    const token = generateToken()

    saveMockSession({
        token,
        user,
    })

    return token
}

export const getCurrentUser = (): AuthUser | null => {
    const session = getMockSession()

    if (!session) {
        return null
    }

    return session.user
}

export const validateToken = (token: string) => {
    const session = getMockSession()

    if (!session) {
        return false
    }

    return session.token === token
}
