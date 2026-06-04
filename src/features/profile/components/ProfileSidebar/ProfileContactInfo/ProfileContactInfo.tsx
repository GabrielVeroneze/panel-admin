import { Card, EmptyState } from '@/shared/components'
import {
    ExclamationCircleIcon,
    InformationCircleIcon,
    LocationMarkerIcon,
    MailIcon,
    PhoneIcon,
} from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { InfoItem } from './InfoItem/InfoItem'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileContactInfo.module.scss'

type ProfileContactInfoProps = {
    contact: UserProfile['contact']
}

export const ProfileContactInfo = ({ contact }: ProfileContactInfoProps) => {
    if (!contact) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Contact information unavailable"
                    description="Email address, phone number, and location details are currently unavailable."
                />
            </Card>
        )
    }

    return (
        <ProfileSectionCard
            variant="compact"
            icon={<InformationCircleIcon />}
            title="Contact Information"
        >
            <div className={styles.infoList}>
                <InfoItem
                    icon={<MailIcon />}
                    label="Email Address"
                    value={contact.email}
                />
                <InfoItem
                    icon={<LocationMarkerIcon />}
                    label="Home Address"
                    value={contact.address}
                />
                <InfoItem
                    icon={<PhoneIcon />}
                    label="Phone Number"
                    value={contact.phone}
                />
            </div>
        </ProfileSectionCard>
    )
}
