export type SocialPlatform = 'facebook' | 'twitter' | 'github' | 'dribbble'

export type SocialAccount = {
    id: number
    platform: SocialPlatform
    connected: boolean
    url?: string
}
