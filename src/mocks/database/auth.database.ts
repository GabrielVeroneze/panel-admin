import type { AuthUser } from '@/features/auth/types'

export const authUser: AuthUser = {
    id: 1,
    name: 'Bonnie Green',
    email: 'bonnie@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=5',
}

export const authToken = 'mock-jwt-token'
