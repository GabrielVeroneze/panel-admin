export type User = {
    id: number
    image: string
    name: string
    email: string
    position: string
    country: string
    status: 'active' | 'offline'
}

export type UsersData = {
    list: User[]
    total: number
    page: number
    pageSize: number
}
