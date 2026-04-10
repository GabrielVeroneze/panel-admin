import { useFormContext } from 'react-hook-form'
import { FormField, Input } from '@/shared/components'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import styles from './EditPasswordFields.module.scss'

export const EditPasswordFields = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<UpdateUserFormValues>()

    return (
        <>
            <FormField
                id="current-password"
                label="Current Password"
                size="large"
                status={errors.currentPassword && 'error'}
                message={errors.currentPassword?.message}
            >
                <Input
                    className={styles.input}
                    type="password"
                    placeholder="Enter current password"
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
                    className={styles.input}
                    type="password"
                    placeholder="Enter new password"
                    size="large"
                    {...register('newPassword')}
                />
            </FormField>
        </>
    )
}
