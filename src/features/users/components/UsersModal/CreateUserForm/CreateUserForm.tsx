import { FormField, Input } from '@/shared/components'
import { useUserForm } from '@/features/users/hooks'
import { BaseUserFields } from '../BaseUserFields/BaseUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import styles from './CreateUserForm.module.scss'

type CreateUserFormProps = {
    formId: string
    user?: any
    onSubmit: (data: any) => void
}

export const CreateUserForm = ({
    formId,
    user,
    onSubmit,
}: CreateUserFormProps) => {
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
                id="password"
                label="Password"
                size="large"
                status={errors.password && 'error'}
                message={errors.password?.message}
            >
                <Input
                    className={styles.input}
                    type="password"
                    placeholder="Enter password"
                    size="large"
                    {...register('password')}
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
                    className={styles.input}
                    type="password"
                    placeholder="Enter confirm password"
                    size="large"
                    {...register('confirmPassword')}
                />
            </FormField>
            <AvatarField control={control} errors={errors} />
        </form>
    )
}
