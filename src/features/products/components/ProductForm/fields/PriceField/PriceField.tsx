import { NumericFormat } from 'react-number-format'
import { FormField, Input } from '@/shared/components'
import styles from './PriceField.module.scss'

export const PriceField = () => {
    return (
        <FormField id="price" label="Price" size="large">
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
            />
        </FormField>
    )
}
