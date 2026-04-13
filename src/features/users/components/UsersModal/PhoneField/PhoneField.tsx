import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { FormField, Input } from '@/shared/components'
import PhoneInput from 'react-phone-number-input/input'
import type { BaseUserFieldsValues } from '@/features/users/schemas'
import styles from './PhoneField.module.scss'

export const PhoneField = () => {
    const { control } = useFormContext<BaseUserFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <Controller
            name="phone"
            control={control}
            render={({ field }) => (
                <FormField
                    id="phone"
                    label="Phone number"
                    size="large"
                    status={errors.phone && 'error'}
                    message={errors.phone?.message}
                >
                    <PhoneInput
                        className={styles.input}
                        placeholder="Enter phone number +(123) 456 7890"
                        size="large"
                        defaultCountry="US"
                        value={field.value}
                        onChange={(value) => field.onChange(value ?? '')}
                        onBlur={field.onBlur}
                        inputComponent={Input}
                    />
                </FormField>
            )}
        />
    )
}
