import { useFormContext } from 'react-hook-form'
import { FormField, Input } from '@/shared/components'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from './CreatePasswordFields.module.scss'

export const CreatePasswordFields = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<CreateUserFormValues>()

    return (
        <>
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
        </>
    )
}
