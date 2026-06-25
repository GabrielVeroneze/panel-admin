import { Button, FormField, Input } from '@/shared/components'
import { usePasswordForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { PasswordSettingsSkeleton } from './PasswordSettingsSkeleton'
import styles from './PasswordSettings.module.scss'

type PasswordSettingsProps = {
    loading: boolean
}

export const PasswordSettings = ({ loading }: PasswordSettingsProps) => {
    const {
        register,
        onSubmit,
        formState: { errors },
    } = usePasswordForm()

    if (loading) return <PasswordSettingsSkeleton />

    return (
        <SettingsCard className={styles.card} title="Password information">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    id="current-password"
                    label="Current Password"
                    size="large"
                    status={errors.currentPassword && 'error'}
                    message={errors.currentPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Enter your current password"
                        size="large"
                        {...register('currentPassword')}
                    />
                </FormField>
                <FormField
                    id="new-password"
                    label="New Password"
                    size="large"
                    status={errors.newPassword && 'error'}
                    message={errors.newPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Enter your new password"
                        size="large"
                        {...register('newPassword')}
                    />
                </FormField>
                <FormField
                    id="confirm-password"
                    label="Confirm Password"
                    size="large"
                    status={errors.confirmPassword && 'error'}
                    message={errors.confirmPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Confirm your new password"
                        size="large"
                        {...register('confirmPassword')}
                    />
                </FormField>
                <div className={styles.requirements}>
                    <p className={styles.title}>Password requirements:</p>
                    <p className={styles.description}>
                        Ensure that these requirements are met:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            Between 8 and 100 characters long
                        </li>
                        <li className={styles.item}>
                            Include both uppercase and lowercase letters
                        </li>
                        <li className={styles.item}>
                            Include at least one number and one special
                            character
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
