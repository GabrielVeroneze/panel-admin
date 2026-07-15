import { usersProfilesDatabase } from './'
import type {
    AuthUser,
    SignUpPayload,
    SignInPayload,
} from '@/features/auth/types'

type StoredUser = AuthUser & {
    password: string
}

type Session = {
    token: string
    userId: number
}

const SESSION_KEY = 'auth-session'

const users: StoredUser[] = [
    {
        id: 5,
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        password: 'Password123*',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
]

const generateId = () => {
    return users.length + 1
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

export const getCurrentUserId = () => {
    const session = getSession()

    return session?.userId ?? null
}

export const createUser = (data: SignUpPayload): AuthUser => {
    const user: StoredUser = {
        id: generateId(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&size=150`,
    }

    users.push(user)

    usersProfilesDatabase.push({
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        role: 'user',
        country: '',
        contact: {
            email: user.email,
            address: '',
            phone: '',
        },
        about: '',
        skills: [],
        summary: {
            products: {
                count: 0,
                variation: 0,
            },
            users: {
                count: 0,
                variation: 0,
            },
            profile: {
                role: 'user',
                status: 'active',
                lastLogin: 'Just now',
                memberSince: 'Today',
            },
        },
        activities: [],
        recentProducts: [],
        experience: [],
        education: [],
    })

    const { password: _password, ...authUser } = user

    return authUser
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

    const { password: _password, ...authUser } = user

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

    const user = users.find((user) => user.id === session.userId)

    if (!user) {
        return null
    }

    const { password: _password, ...authUser } = user

    return authUser
}

export const validateToken = (token: string) => {
    const session = getSession()

    if (!session) {
        return false
    }

    return session.token === token
}
