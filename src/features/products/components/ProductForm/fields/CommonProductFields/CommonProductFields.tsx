import { useFormContext, useFormState } from 'react-hook-form'
import { FormField, Input, Textarea } from '@/shared/components'
import { ImagesField, PriceField } from '@/features/products/components'
import type { BaseProductFieldsValues } from '@/features/products/schemas'
import styles from './CommonProductFields.module.scss'

export const CommonProductFields = () => {
    const { register, control } = useFormContext<BaseProductFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <>
            <FormField
                id="product-name"
                label="Product Name"
                size="large"
                status={errors.name && 'error'}
                message={errors.name?.message}
            >
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter product name"
                    size="large"
                    {...register('name')}
                />
            </FormField>
            <FormField
                id="category"
                label="Category"
                size="large"
                status={errors.category && 'error'}
                message={errors.category?.message}
            >
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter category"
                    size="large"
                    {...register('category')}
                />
            </FormField>
            <FormField
                id="brand"
                label="Brand"
                size="large"
                status={errors.brand && 'error'}
                message={errors.brand?.message}
            >
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter brand"
                    size="large"
                    {...register('brand')}
                />
            </FormField>
            <PriceField />
            <FormField
                className={styles.textareaField}
                id="details"
                label="Details"
                size="large"
                status={errors.details && 'error'}
                message={errors.details?.message}
            >
                <Textarea
                    className={styles.textarea}
                    placeholder="Enter product details"
                    size="large"
                    {...register('details')}
                />
            </FormField>
            <ImagesField />
        </>
    )
}
