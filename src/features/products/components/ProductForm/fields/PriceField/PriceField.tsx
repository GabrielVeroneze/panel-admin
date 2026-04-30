import { Controller, useFormContext, useFormState } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { FormField, Input } from '@/shared/components'
import type { BaseProductFieldsValues } from '@/features/products/schemas'
import styles from './PriceField.module.scss'

export const PriceField = () => {
    const { control } = useFormContext<BaseProductFieldsValues>()
    const { errors } = useFormState({ control })

    return (
        <Controller
            name="price"
            control={control}
            render={({ field }) => (
                <FormField
                    id="price"
                    label="Price"
                    size="large"
                    status={errors.price && 'error'}
                    message={errors.price?.message}
                >
                    <NumericFormat
                        className={styles.input}
                        customInput={Input}
                        placeholder="Enter price"
                        size="large"
                        prefix="$"
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowNegative={false}
                        value={field.value}
                        onValueChange={(values) =>
                            field.onChange(values.floatValue)
                        }
                        onBlur={field.onBlur}
                    />
                </FormField>
            )}
        />
    )
}
