import { useUserForm } from '@/features/users/hooks'
import type { User } from '@/features/users/types'
import type { UserFormValues } from '@/features/users/schemas'
import styles from './UsersForm.module.scss'

type UsersFormProps = {
    formId: string
    user?: User | null
    onSubmit: (data: UserFormValues) => void
}

export const UsersForm = ({ formId, user, onSubmit }: UsersFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useUserForm({ user })

    return (
        <form
            className={styles.form}
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
        >
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
        </form>
    )
}
