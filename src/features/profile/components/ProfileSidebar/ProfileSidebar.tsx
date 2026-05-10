import { ProfileHeader } from './ProfileHeader/ProfileHeader'
import { ProfileContactInfo } from './ProfileContactInfo/ProfileContactInfo'
import { AboutSection } from './AboutSection/AboutSection'
import { SoftwareSkills } from './SoftwareSkills/SoftwareSkills'
import styles from './ProfileSidebar.module.scss'

type Skill = {
    id: string
    label: string
}

type ProfileSidebarProps = {
    avatar: string
    name: string
    role: string
    country: string
    email: string
    address: string
    phone: string
    about: string
    skills: Skill[]
}

export const ProfileSidebar = ({
    avatar,
    name,
    role,
    country,
    email,
    address,
    phone,
    about,
    skills,
}: ProfileSidebarProps) => {
    return (
        <aside className={styles.sidebar}>
            <ProfileHeader
                avatar={avatar}
                name={name}
                role={role}
                country={country}
            />
            <ProfileContactInfo email={email} address={address} phone={phone} />
            <AboutSection about={about} />
            <SoftwareSkills skills={skills} />
        </aside>
    )
}
