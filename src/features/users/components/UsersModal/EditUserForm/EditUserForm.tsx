import { Controller } from 'react-hook-form'
import { useEditUserForm } from '@/features/users/hooks'
import { BaseUserFields } from '../BaseUserFields/BaseUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import type { User } from '@/features/users/types'
import styles from './UsersForm.module.scss'

type EditUserFormProps = {
    formId: string
    user?: User | null
    onSubmit: (data: UpdateUserFormValues) => void
}

export const EditUserForm = ({ formId, user, onSubmit }: EditUserFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useEditUserForm(user)

    return (
        <form
            className={styles.form}
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
        >
            <BaseUserFields register={register} errors={errors} />
            >
            <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                    <AvatarField
                        onFileSelect={field.onChange}
                        error={errors.avatar?.message}
                    />
                )}
            />
        </form>
    )
}
