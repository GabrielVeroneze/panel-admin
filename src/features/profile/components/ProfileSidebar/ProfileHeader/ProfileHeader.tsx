import { BriefcaseSolidIcon, LocationMarkerIcon } from '@/shared/assets/icons'
import styles from './ProfileHeader.module.scss'

type ProfileHeaderProps = {
    avatar: string
    name: string
    role: string
    country: string
}

export const ProfileHeader = ({
    avatar,
    name,
    role,
    country,
}: ProfileHeaderProps) => {
    return (
        <header className={styles.header}>
            <img
                className={styles.avatar}
                src={avatar}
                alt={`${name}'s avatar`}
            />
            <div className={styles.info}>
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.role}>
                    <BriefcaseSolidIcon className={styles.icon} />
                    {role}
                </p>
                <p className={styles.country}>
                    <LocationMarkerIcon className={styles.icon} />
                    {country}
                </p>
            </div>
        </header>
    )
}
