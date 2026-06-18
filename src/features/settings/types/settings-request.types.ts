export type UpdateProfileAvatarPayload = {
    avatar: File
}

export type UpdatePasswordPayload = {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
