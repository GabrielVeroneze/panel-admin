import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import { ImagesPreview } from './ImagesPreview/ImagesPreview'
import type { BaseProductFieldsValues } from '@/features/products/schemas'
import styles from './ImagesField.module.scss'

export const ImagesField = () => {
    const { control } = useFormContext<BaseProductFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <Controller
            name="images"
            control={control}
            render={({ field }) => {
                const files = field.value || []

                const handleRemove = (index: number) => {
                    const updated = files.filter((_, i) => i !== index)
                    field.onChange(updated)
                }

                return (
                    <div className={styles.container}>
                        <ImagesPreview files={files} onRemove={handleRemove} />
                        <FormField
                            className={styles.dropzoneField}
                            id="images"
                            size="large"
                            status={errors.images && 'error'}
                            message={errors.images?.message}
                        >
                            <UploadDropzone
                                multiple
                                accept="image/*"
                                onFileSelect={(files) => {
                                    const current = field.value || []
                                    const newFiles = Array.isArray(files)
                                        ? files
                                        : [files]

                                    field.onChange([...current, ...newFiles])
                                    field.onBlur()
                                }}
                            >
                                <PhotographIcon className={styles.icon} />
                                <span className={styles.text}>
                                    Drop files to upload
                                </span>
                            </UploadDropzone>
                        </FormField>
                    </div>
                )
            }}
        />
    )
}
