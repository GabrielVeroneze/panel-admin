import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import type { BaseProductFieldsValues } from '@/features/products/schemas'
import styles from './ImagesField.module.scss'

export const ImagesField = () => {
    const { control } = useFormContext<BaseProductFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <Controller
            name="images"
            control={control}
            render={({ field }) => (
                <FormField
                    className={styles.dropzoneField}
                    id="images"
                    size="large"
                    status={errors.images && 'error'}
                    message={errors.images?.message}
                >
                    <UploadDropzone
                        accept="image/*"
                        onFileSelect={(file) => {
                            field.onChange(file)
                            field.onBlur()
                        }}
                    >
                        <PhotographIcon className={styles.icon} />
                        <span className={styles.text}>
                            Drop files to upload
                        </span>
                    </UploadDropzone>
                </FormField>
            )}
        />
    )
}
