import { Button, FormField, Input } from '@/shared/components'
import { SettingsCard } from '@/features/settings/components'
import styles from './PasswordSettings.module.scss'

type PasswordSettingsProps = {
    loading: boolean
}

export const PasswordSettings = ({ loading }: PasswordSettingsProps) => {
    if (loading) return null

    return (
        <SettingsCard className={styles.card} title="Password information">
            <form className={styles.form}>
                <FormField
                    id="current-password"
                    label="Current Password"
                    size="large"
                >
                    <Input
                        type="password"
                        placeholder="Enter your current password"
                        size="large"
                    />
                </FormField>
                <FormField id="new-password" label="New Password" size="large">
                    <Input
                        type="password"
                        placeholder="Enter your new password"
                        size="large"
                    />
                </FormField>
                <FormField
                    id="confirm-password"
                    label="Confirm Password"
                    size="large"
                >
                    <Input
                        type="password"
                        placeholder="Confirm your new password"
                        size="large"
                    />
                </FormField>
                <div className={styles.requirements}>
                    <p className={styles.title}>Password requirements:</p>
                    <p className={styles.description}>
                        Ensure that these requirements are met:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            At least 10 characters (and up to 100 characters)
                        </li>
                        <li className={styles.item}>
                            At least one lowercase character
                        </li>
                        <li className={styles.item}>
                            Inclusion of at least one special character, e.g. !
                            @ # ?
                        </li>
                    </ul>
                </div>
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}
