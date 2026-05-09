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
        <div className={styles.container}>
            <InfoItem label="Email Address" value={email} />
            <InfoItem label="Home Address" value={address} />
            <InfoItem label="Phone Number" value={phone} />
        </div>
    )
}
