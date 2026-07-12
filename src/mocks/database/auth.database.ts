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
        id: 1,
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        password: '123456',
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

const saveSession = (session: Session, rememberMe: boolean) => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)

    const storage = rememberMe ? localStorage : sessionStorage

    storage.setItem(SESSION_KEY, JSON.stringify(session))
}

const getSession = (): Session | null => {
    const session =
        localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)

    if (!session) {
        return null
    }

    return JSON.parse(session)
}

export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
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

export const createSession = (user: AuthUser, rememberMe: boolean) => {
    const token = generateToken()

    saveSession(
        {
            token,
            userId: user.id,
        },
        rememberMe,
    )

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
