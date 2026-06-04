import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon, UserIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import type { UserProfile } from '@/features/profile/types'
import styles from './AboutSection.module.scss'

type AboutSectionProps = {
    about: UserProfile['about']
}

export const AboutSection = ({ about }: AboutSectionProps) => {
    if (!about) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="About section unavailable"
                    description="No personal description or biography is available for this profile."
                />
            </Card>
        )
    }

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
