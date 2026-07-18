import type { AuthUser } from '@/features/auth/types'

export type StoredUser = AuthUser & {
    password: string
}

export type MockSession = {
    token: string
    user: AuthUser
}

export const MOCK_SESSION_KEY = 'mock-auth-session'

export const authUsersDatabase: StoredUser[] = [
    {
        id: 1,
        name: 'Neil Sims',
        email: 'neil.sims1@example.com',
        password: 'Password123*',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: 2,
        name: 'Roberta Casas',
        email: 'roberta.casas2@example.com',
        password: 'Password123*',
        role: 'manager',
        avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
        id: 3,
        name: 'Michael Gough',
        email: 'michael.gough3@example.com',
        password: 'Password123*',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
        id: 4,
        name: 'Jese Leos',
        email: 'jese.leos4@example.com',
        password: 'Password123*',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
        id: 5,
        name: 'Bonnie Green',
        email: 'bonnie@example.com',
        password: 'Password123*',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?img=5',
    },
]
