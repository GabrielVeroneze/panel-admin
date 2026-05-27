import { UserIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import type { UserProfile } from '@/features/profile/types'
import styles from './AboutSection.module.scss'

type AboutSectionProps = {
    about: UserProfile['about']
}

export const AboutSection = ({ about }: AboutSectionProps) => {
    return (
        <ProfileSectionCard
            variant="compact"
            icon={<UserIcon />}
            title="About me"
        >
            <p className={styles.description}>{about}</p>
        </ProfileSectionCard>
    )
}
