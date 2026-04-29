import { CommonProductFields } from '@/features/products/components'
import type { UpdateProductFormValues } from '@/features/products/schemas'
import type { Product } from '@/features/products/types'
import styles from './EditProductForm.module.scss'

type EditProductFormProps = {
    formId: string
    product?: Product | null
    onSubmit: (data: UpdateProductFormValues) => void
}

export const EditProductForm = ({
    formId,
    product,
    onSubmit,
}: EditProductFormProps) => {
    return (
        <form className={styles.form} id={formId}>
            <CommonProductFields />
        </form>
    )
}
