import type { AuthUser } from '@/features/auth/types'

export type StoredUser = AuthUser & {
    password: string
}

export type Session = {
    token: string
    userId: number
}

export const SESSION_KEY = 'auth-session'

export const authUsersDatabase: StoredUser[] = [
    {
        id: 5,
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        password: 'Password123*',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
]
