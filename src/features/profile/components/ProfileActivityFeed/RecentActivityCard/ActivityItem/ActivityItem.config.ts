import {
    CubeIcon,
    LockClosedIcon,
    LoginIcon,
    PencilIcon,
    TrashIcon,
    UploadIcon,
    UserAddIcon,
    UserCircleIcon,
} from '@/shared/assets/icons'
import type { ComponentType, SVGProps } from 'react'
import type { ActivityType } from '@/features/profile/types'

type ActivityVariant = 'blue' | 'green' | 'red' | 'orange' | 'purple'

type ActivityConfigItem = {
    title: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
    variant: ActivityVariant
}

export const activityConfig: Record<ActivityType, ActivityConfigItem> = {
   'user-created': {
        title: 'Created User',
        icon: UserAddIcon,
        variant: 'green',
    },
    'user-updated': {
        title: 'Updated User',
        icon: PencilIcon,
        variant: 'blue',
    },
    'user-deleted': {
        title: 'Deleted User',
        icon: TrashIcon,
        variant: 'red',
    },
    'product-created': {
        title: 'Created Product',
        icon: CubeIcon,
        variant: 'green',
    },
    'product-updated': {
        title: 'Updated Product',
        icon: PencilIcon,
        variant: 'blue',
    },
    'product-deleted': {
        title: 'Deleted Product',
        icon: TrashIcon,
        variant: 'red',
    },
    'product-image-uploaded': {
        title: 'Uploaded Product Image',
        icon: UploadIcon,
        variant: 'orange',
    },
    'profile-avatar-updated': {
        title: 'Updated Profile Avatar',
        icon: UserCircleIcon,
        variant: 'orange',
    },
    'password-changed': {
        title: 'Changed Password',
        icon: LockClosedIcon,
        variant: 'purple',
    },
    'admin-login': {
        title: 'Admin Login',
        icon: LoginIcon,
        variant: 'purple',
    },
}
