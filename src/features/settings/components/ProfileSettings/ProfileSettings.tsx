import { Button, Card } from '@/shared/components'
import { CogSolidIcon } from '@/shared/assets/icons'
import { useProfileAvatar } from '@/features/settings/hooks'
import type { SettingsProfile } from '@/features/settings/types'
import styles from './ProfileSettings.module.scss'

type ProfileSettingsProps = {
    profile?: SettingsProfile
    loading: boolean
}

export const ProfileSettings = ({ profile, loading }: ProfileSettingsProps) => {
    const { inputRef, handleFileChange, openFilePicker } = useProfileAvatar()

    if (loading) return null

    if (!profile) {
        return null
    }

    return (
        <Card className={styles.card}>
            <img
                className={styles.avatar}
                src={profile.avatar}
                alt={profile.name}
            />
            <div className={styles.info}>
                <h3 className={styles.name}>{profile.name}</h3>
                <p className={styles.role}>{profile.role}</p>
                <Button
                    className={styles.button}
                    icon={<CogSolidIcon />}
                    iconPosition="left"
                    onClick={openFilePicker}
                >
                    Change Picture
                </Button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </div>
        </Card>
    )
}
