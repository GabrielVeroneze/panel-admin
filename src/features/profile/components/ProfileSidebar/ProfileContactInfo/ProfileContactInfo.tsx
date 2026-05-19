import {
    InformationCircleIcon,
    LocationMarkerIcon,
    MailIcon,
    PhoneIcon,
} from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { InfoItem } from './InfoItem/InfoItem'
import styles from './ProfileContactInfo.module.scss'

type ProfileContactInfoProps = {
    email: string
    address: string
    phone: string
}

export const ProfileContactInfo = ({
    email,
    address,
    phone,
}: ProfileContactInfoProps) => {
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
                    value={email}
                />
                <InfoItem
                    icon={<LocationMarkerIcon />}
                    label="Home Address"
                    value={address}
                />
                <InfoItem
                    icon={<PhoneIcon />}
                    label="Phone Number"
                    value={phone}
                />
            </div>
        </ProfileSectionCard>
    )
}
