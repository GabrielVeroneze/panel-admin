export type ActivityType =
    | 'user-created'
    | 'user-updated'
    | 'user-deleted'
    | 'product-created'
    | 'product-updated'
    | 'product-deleted'
    | 'product-image-uploaded'
    | 'profile-avatar-updated'
    | 'password-changed'
    | 'admin-login'

export type Activity = {
    id: number
    type: ActivityType
    target: string
    createdAt: string
}
