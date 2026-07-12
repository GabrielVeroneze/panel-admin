export type SignInPayload = {
    email: string
    password: string
    rememberMe: boolean
}

export type SignUpPayload = {
    name: string
    email: string
    password: string
}

export type UserRole = 'admin' | 'manager' | 'user'

export type AuthUser = {
    id: number
    name: string
    email: string
    role: UserRole
    avatar: string
}

export type AuthResponse = {
    token: string
    user: AuthUser
}
