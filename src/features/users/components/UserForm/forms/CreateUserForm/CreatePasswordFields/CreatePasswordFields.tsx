import { useFormContext, useFormState } from 'react-hook-form'
import { FormField, Input } from '@/shared/components'
import type { CreateUserFormValues } from '@/features/users/schemas'

export const CreatePasswordFields = () => {
    const { register, control } = useFormContext<CreateUserFormValues>()
    const { errors } = useFormState({ control })

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
                    type="password"
                    placeholder="Enter confirm password"
                    size="large"
                    {...register('confirmPassword')}
                />
            </FormField>
        </>
    )
}
