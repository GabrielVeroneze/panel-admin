import {
    DribbbleSolidIcon,
    FacebookFSolidIcon,
    GithubSolidIcon,
    TwitterSolidIcon,
} from '@/shared/assets/icons'
import type { ComponentType, SVGProps } from 'react'
import type { SocialPlatform } from '@/features/settings/types'

type SocialAccountConfigItem = {
    label: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const socialAccountConfig: Record<
    SocialPlatform,
    SocialAccountConfigItem
> = {
    facebook: {
        label: 'Facebook',
        icon: FacebookFSolidIcon,
    },
    twitter: {
        label: 'Twitter',
        icon: TwitterSolidIcon,
    },
    github: {
        label: 'GitHub',
        icon: GithubSolidIcon,
    },
    dribbble: {
        label: 'Dribbble',
        icon: DribbbleSolidIcon,
    },
}
