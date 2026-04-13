import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import styles from './AvatarField.module.scss'

export const AvatarField = () => {
    const { control } = useFormContext<BaseUserFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
                <FormField
                    className={styles.dropzoneField}
                    id="avatar"
                    size="large"
                    status={errors.avatar && 'error'}
                    message={errors.avatar?.message}
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
                            Drop files to upload your profile picture
                        </span>
                    </UploadDropzone>
                </FormField>
            )}
        />
    )
}
