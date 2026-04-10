import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import styles from './AvatarField.module.scss'

type AvatarFieldProps = {
    onFileSelect: (file: File | undefined) => void
    error?: string
}

export const AvatarField = ({ onFileSelect, error }: AvatarFieldProps) => {
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
                        onFileSelect={field.onChange}
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
