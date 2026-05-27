import { Card } from '@/shared/components'
import { LocationMarkerIcon } from '@/shared/assets/icons'
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
