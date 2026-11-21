import { FormProvider } from 'react-hook-form'
import { FormError } from '@/shared/components'
import { useCreateProductForm } from '@/features/products/hooks'
import { CommonProductFields } from '@/features/products/components'
import type { CreateProductFormValues } from '@/features/products/schemas'
import styles from './CreateProductForm.module.scss'

type CreateProductFormProps = {
    formId: string
    error: string | null
    onSubmit: (data: CreateProductFormValues) => Promise<void>
}

export const CreateProductForm = ({
    formId,
    error,
    onSubmit,
}: CreateProductFormProps) => {
    const methods = useCreateProductForm()

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                id={formId}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommonProductFields />
                <FormError message={error} />
            </form>
        </FormProvider>
    )
}
