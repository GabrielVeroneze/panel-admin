import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import { ProfileContactInfo } from './ProfileContactInfo/ProfileContactInfo'
import { AboutSection } from './AboutSection/AboutSection'
import { SoftwareSkills } from './SoftwareSkills/SoftwareSkills'
import { ProfileSidebarSkeleton } from './ProfileSidebarSkeleton'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileSidebar.module.scss'

type ProfileSidebarProps = {
    profile: UserProfile | null
    loading: boolean
}

export const ProfileSidebar = ({ profile, loading }: ProfileSidebarProps) => {
    if (loading) return <ProfileSidebarSkeleton />

    if (!profile) {
        return (
            <Card className={styles.sidebar}>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Profile details unavailable"
                    description="Personal information, contact details, and skills could not be loaded."
                />
            </Card>
        )
    }

    return (
        <aside className={styles.sidebar}>
            <ProfileHeader
                avatar={profile.avatar}
                name={profile.name}
                role={profile.role}
                country={profile.country}
            />
            <ProfileContactInfo contact={profile.contact} />
            <AboutSection about={profile.about} />
            <SoftwareSkills skills={profile.skills} />
        </aside>
    )
}
