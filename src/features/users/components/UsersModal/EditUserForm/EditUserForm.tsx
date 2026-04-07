import { FormField, Input } from '@/shared/components'
import { useUserForm } from '@/features/users/hooks'
import { BaseUserFields } from '../BaseUserFields/BaseUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import styles from './UsersForm.module.scss'

type EditUserFormProps = {
    formId: string
    user?: any
    onSubmit: (data: any) => void
}

export const EditUserForm = ({ formId, user, onSubmit }: EditUserFormProps) => {
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
            <BaseUserFields register={register} errors={errors} />
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
            <AvatarField control={control} errors={errors} />
        </form>
    )
}
