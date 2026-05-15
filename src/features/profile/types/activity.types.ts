export type ActivityType =
    | 'product-updated'
    | 'product-deleted'
    | 'user-created'
    | 'stock-updated'
    | 'password-changed'

export type ActivityVariant = 'blue' | 'green' | 'red' | 'orange' | 'purple'

export type Activity = {
    id: number
    type: ActivityType
    target: string
    createdAt: string
}
