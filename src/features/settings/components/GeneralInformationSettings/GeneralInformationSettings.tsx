import {
    Button,
    FormField,
    Input,
    Select,
    SelectOption,
} from '@/shared/components'
import { SettingsCard } from '@/features/settings/components'
import { countryOptions } from './countryOptions'
import type { GeneralInformation } from '@/features/settings/types'
import styles from './GeneralInformationSettings.module.scss'

type GeneralInformationSettingsProps = {
    data?: GeneralInformation
    loading: boolean
}

export const GeneralInformationSettings = ({
    data,
    loading,
}: GeneralInformationSettingsProps) => {
    if (loading) return null

    if (!data) {
        return null
    }

    return (
        <SettingsCard className={styles.card} title="General information">
            <form className={styles.form}>
                <FormField id="first-name" label="First Name" size="large">
                    <Input
                        type="text"
                        placeholder="Enter first name"
                        size="large"
                    />
                </FormField>
                <FormField id="last-name" label="Last Name" size="large">
                    <Input
                        type="text"
                        placeholder="Enter last name"
                        size="large"
                    />
                </FormField>
                <FormField id="email" label="Email" size="large">
                    <Input
                        type="email"
                        placeholder="Enter email"
                        size="large"
                    />
                </FormField>
                <FormField id="role" label="Role" size="large">
                    <Input type="text" placeholder="Enter role" size="large" />
                </FormField>
                <FormField id="phone" label="Phone Number" size="large">
                    <Input
                        type="text"
                        placeholder="Enter phone number"
                        size="large"
                    />
                </FormField>
                <FormField id="birth-date" label="Birth Date" size="large">
                    <Input type="date" size="large" />
                </FormField>
                <FormField id="organization" label="Organization" size="large">
                    <Input
                        type="text"
                        placeholder="Enter organization"
                        size="large"
                    />
                </FormField>
                <FormField id="department" label="Department" size="large">
                    <Input
                        type="text"
                        placeholder="Enter department"
                        size="large"
                    />
                </FormField>
                <FormField id="address" label="Address" size="large">
                    <Input
                        type="text"
                        placeholder="Enter address"
                        size="large"
                    />
                </FormField>
                <FormField id="city" label="City" size="large">
                    <Input type="text" placeholder="Enter city" size="large" />
                </FormField>
                <FormField id="country" label="Country" size="large">
                    <Select size="medium">
                        {countryOptions.map((country) => (
                            <SelectOption
                                key={country.value}
                                value={country.value}
                            >
                                {country.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
                <FormField id="zip-code" label="Zip Code" size="large">
                    <Input
                        type="text"
                        placeholder="Enter zip code"
                        size="large"
                    />
                </FormField>
                <Button className={styles.button} size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}
