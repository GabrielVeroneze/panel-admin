import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import { ProfileContactInfo } from './ProfileContactInfo/ProfileContactInfo'
import { AboutSection } from './AboutSection/AboutSection'
import { SoftwareSkills } from './SoftwareSkills/SoftwareSkills'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileSidebar.module.scss'

type ProfileSidebarProps = {
    profile: UserProfile
}

export const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
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
