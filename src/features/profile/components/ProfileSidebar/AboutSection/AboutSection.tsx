import { UserIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import styles from './AboutSection.module.scss'

type AboutSectionProps = {
    about: string
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
