import { Card, EmptyState } from '@/shared/components'
import {
    ExclamationCircleIcon,
    LocationMarkerIcon,
} from '@/shared/assets/icons'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileHeader.module.scss'

type ProfileHeaderProps = Pick<
    UserProfile,
    'avatar' | 'name' | 'role' | 'country'
>

export const ProfileHeader = ({
    avatar,
    name,
    role,
    country,
}: ProfileHeaderProps) => {
    if (!avatar || !name || !role || !country) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Profile information unavailable"
                    description="Basic profile details such as avatar, name, role, or location could not be loaded."
                />
            </Card>
        )
    }

    return (
        <Card className={styles.header} as="header">
            <img
                className={styles.avatar}
                src={avatar}
                alt={`${name}'s avatar`}
            />
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.role}>{role}</p>
                <p className={styles.country}>
                    <LocationMarkerIcon className={styles.icon} />
                    {country}
                </p>
            </div>
        </Card>
    )
}
