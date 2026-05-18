import { InformationCircleIcon } from '@/shared/assets/icons'
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
                <InfoItem label="Email Address" value={email} />
                <InfoItem label="Home Address" value={address} />
                <InfoItem label="Phone Number" value={phone} />
            </div>
        </ProfileSectionCard>
    )
}
