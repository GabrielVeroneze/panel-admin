import { CommonProductFields } from '@/features/products/components'
import type { CreateProductFormValues } from '@/features/products/schemas'
import styles from './CreateProductForm.module.scss'

type CreateProductFormProps = {
    formId: string
    onSubmit: (data: CreateProductFormValues) => void
}

export const CreateProductForm = ({
    formId,
    onSubmit,
}: CreateProductFormProps) => {
    return (
        <form className={styles.form} id={formId}>
            <CommonProductFields />
        </form>
    )
}
