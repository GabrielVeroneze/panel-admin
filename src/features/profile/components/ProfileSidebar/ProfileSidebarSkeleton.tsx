import { AboutSectionSkeleton } from './AboutSection/AboutSectionSkeleton'
import { ProfileContactInfoSkeleton } from './ProfileContactInfo/ProfileContactInfoSkeleton'
import { ProfileHeaderSkeleton } from './ProfileHeader/ProfileHeaderSkeleton'
import { SoftwareSkillsSkeleton } from './SoftwareSkills/SoftwareSkillsSkeleton'
import styles from './ProfileSidebar.module.scss'

export const ProfileSidebarSkeleton = () => {
    return (
        <aside className={styles.sidebar}>
            <ProfileHeaderSkeleton />
            <ProfileContactInfoSkeleton />
            <AboutSectionSkeleton />
            <SoftwareSkillsSkeleton />
        </aside>
    )
}
