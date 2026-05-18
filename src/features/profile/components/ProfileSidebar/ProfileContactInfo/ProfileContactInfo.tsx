import { Card } from '@/shared/components'
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
        <Card className={styles.container}>
            <InfoItem label="Email Address" value={email} />
            <InfoItem label="Home Address" value={address} />
            <InfoItem label="Phone Number" value={phone} />
        </Card>
    )
}
