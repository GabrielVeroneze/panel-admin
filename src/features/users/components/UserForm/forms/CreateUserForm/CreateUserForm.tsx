import { FormProvider } from 'react-hook-form'
import { FormError } from '@/shared/components'
import { useCreateUserForm } from '@/features/users/hooks'
import { AvatarField, CommonUserFields } from '@/features/users/components'
import { CreatePasswordFields } from './CreatePasswordFields/CreatePasswordFields'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from './CreateUserForm.module.scss'

type CreateUserFormProps = {
    formId: string
    error: string | null
    onSubmit: (data: CreateUserFormValues) => void
}

export const CreateUserForm = ({
    formId,
    error,
    onSubmit,
}: CreateUserFormProps) => {
    const methods = useCreateUserForm()

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                id={formId}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommonUserFields />
                <CreatePasswordFields />
                <AvatarField />
                <FormError message={error} />
            </form>
        </FormProvider>
    )
}
