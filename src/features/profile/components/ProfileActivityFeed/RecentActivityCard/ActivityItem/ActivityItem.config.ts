import {
    CubeIcon,
    LockClosedIcon,
    PencilIcon,
    TrashIcon,
    UserAddIcon,
} from '@/shared/assets/icons'
import type { ComponentType, SVGProps } from 'react'
import type { ActivityType, ActivityVariant } from '@/features/profile/types'

type ActivityConfigItem = {
    title: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    variant: ActivityVariant
}

export const activityConfig: Record<ActivityType, ActivityConfigItem> = {
    'product-updated': {
        title: 'Updated Product',
        icon: PencilIcon,
        variant: 'blue',
    },
    'user-created': {
        title: 'Created new user',
        icon: UserAddIcon,
        variant: 'green',
    },
    'product-deleted': {
        title: 'Deleted Product',
        icon: TrashIcon,
        variant: 'red',
    },
    'stock-updated': {
        title: 'Updated stock',
        icon: CubeIcon,
        variant: 'orange',
    },
    'password-changed': {
        title: 'Changed Password',
        icon: LockClosedIcon,
        variant: 'purple',
    },
}
