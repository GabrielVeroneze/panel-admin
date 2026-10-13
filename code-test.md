import { useSettings } from '@/features/settings/hooks'
import { EmptyState } from '@/shared/components'
import { CogSolidIcon } from '@/shared/assets/icons'
import {
    ConnectedAccountsSettings,
    EmailSettings,
    GeneralInformationSettings,
    LanguageTimeSettings,
    NotificationSettings,
    PasswordSettings,
    ProfileSettings,
    RecentDevicesSettings,
    SocialAccountsSettings,
} from '@/features/settings/components'
import styles from './SettingsPage.module.scss'

export const SettingsPage = () => {
    const { settings, loading } = useSettings()

    if (!settings) {
        return (
            <EmptyState
                icon={<CogSolidIcon />}
                title="Settings unavailable"
                description="We couldn't load your account settings. Please try again later."
            />
        )
    }

    return (
        <section className={styles.settings}>
            <div className={styles.topSection}>
                <ProfileSettings profile={settings.profile} loading={loading} />
                <LanguageTimeSettings
                    preferences={settings.preferences}
                    loading={loading}
                />
                <SocialAccountsSettings
                    accounts={settings.socialAccounts}
                    loading={loading}
                />
                <GeneralInformationSettings
                    data={settings.generalInformation}
                    loading={loading}
                />
            </div>
            <div className={styles.middleSection}>
                <ConnectedAccountsSettings
                    accounts={settings.connectedAccounts}
                    loading={loading}
                />
                <PasswordSettings loading={loading} />
            </div>
            <div className={styles.bottomSection}>
                <NotificationSettings
                    notificationPreferences={settings.notifications}
                    loading={loading}
                />
                <EmailSettings
                    emailPreferences={settings.emailSettings}
                    loading={loading}
                />
                <RecentDevicesSettings
                    devices={settings.recentDevices}
                    loading={loading}
                />
            </div>
        </section>
    )
}

---

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSettings } from '../store'

export const useSettings = () => {
    const dispatch = useAppDispatch()

    const { settings, loading } = useAppSelector((state) => state.settings)

    useEffect(() => {
        dispatch(fetchSettings())
    }, [dispatch])

    return {
        settings,
        loading,
    }
}

---

import { createSlice } from '@reduxjs/toolkit'
import {
    connectAccount,
    disconnectAccount,
    fetchSettings,
    removeConnectedAccount,
    removeDeviceSession,
    saveEmailSettings,
    saveGeneralInformation,
    saveNotifications,
    savePreferences,
    updateAvatar,
} from './settings.thunks'
import type { Settings } from '../types'

type SettingsState = {
    settings: Settings | null
    loading: boolean
}

const initialState: SettingsState = {
    settings: null,
    loading: false,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false
                state.settings = action.payload
            })
            .addCase(fetchSettings.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.profile = action.payload
            })
            .addCase(savePreferences.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.preferences = action.payload
            })
            .addCase(saveGeneralInformation.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.generalInformation = action.payload

                state.settings.profile.name = `${action.payload.firstName} ${action.payload.lastName}`
                state.settings.profile.role = action.payload.role
            })
            .addCase(saveNotifications.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.notifications = action.payload
            })
            .addCase(saveEmailSettings.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.emailSettings = action.payload
            })
            .addCase(connectAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(disconnectAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(removeConnectedAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const remainingConnectedAccounts =
                    state.settings.connectedAccounts.filter(
                        (account) => account.id !== action.payload,
                    )

                state.settings.connectedAccounts = remainingConnectedAccounts
            })
            .addCase(removeDeviceSession.fulfilled, (state, action) => {
                if (!state.settings) return

                const remainingDeviceSessions =
                    state.settings.recentDevices.filter(
                        (device) => device.id !== action.payload,
                    )

                state.settings.recentDevices = remainingDeviceSessions
            })
    },
})

export default settingsSlice.reducer


---

import type { ReactNode } from 'react'
import styles from './EmptyState.module.scss'

type EmptyStateProps = {
    icon?: ReactNode
    title: string
    description?: string
    action?: ReactNode
}

export const EmptyState = ({
    icon,
    title,
    description,
    action,
}: EmptyStateProps) => {
    return (
        <div className={styles.container}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            {description && <p className={styles.description}>{description}</p>}
            {action && <div className={styles.action}>{action}</div>}
        </div>
    )
}

---

import { Button, Card } from '@/shared/components'
import { CogSolidIcon } from '@/shared/assets/icons'
import { useProfileAvatar } from '@/features/settings/hooks'
import { ProfileSettingsSkeleton } from './ProfileSettingsSkeleton'
import type { SettingsProfile } from '@/features/settings/types'
import styles from './ProfileSettings.module.scss'

type ProfileSettingsProps = {
    profile: SettingsProfile
    loading: boolean
}

export const ProfileSettings = ({ profile, loading }: ProfileSettingsProps) => {
    const { inputRef, handleFileChange, openFilePicker } = useProfileAvatar()

    if (loading) return <ProfileSettingsSkeleton />

    return (
        <Card className={styles.card}>
            <img
                className={styles.avatar}
                src={profile.avatar}
                alt={profile.name}
            />
            <div className={styles.info}>
                <h3 className={styles.name}>{profile.name}</h3>
                <p className={styles.role}>{profile.role}</p>
                <Button
                    className={styles.button}
                    icon={<CogSolidIcon />}
                    iconPosition="left"
                    onClick={openFilePicker}
                >
                    Change Picture
                </Button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </div>
        </Card>
    )
}

---

import { Button, FormField, Select, SelectOption } from '@/shared/components'
import { useLanguageTimeForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { languageOptions, timezoneOptions } from './languageTimeOptions'
import { LanguageTimeSettingsSkeleton } from './LanguageTimeSettingsSkeleton'
import type { SettingsPreferences } from '@/features/settings/types'
import styles from './LanguageTimeSettings.module.scss'

type LanguageTimeSettingsProps = {
    preferences: SettingsPreferences
    loading: boolean
}

export const LanguageTimeSettings = ({
    preferences,
    loading,
}: LanguageTimeSettingsProps) => {
    const {
        register,
        onSubmit,
        formState: { errors },
    } = useLanguageTimeForm(preferences)

    if (loading) return <LanguageTimeSettingsSkeleton />

    return (
        <SettingsCard className={styles.card} title="Language & Time">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    className={styles.field}
                    id="language"
                    label="Select Language"
                    size="large"
                    status={errors.language && 'error'}
                    message={errors.language?.message}
                >
                    <Select size="medium" {...register('language')}>
                        {languageOptions.map((language) => (
                            <SelectOption
                                key={language.value}
                                value={language.value}
                            >
                                {language.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
                <FormField
                    className={styles.field}
                    id="timezone"
                    label="Select Timezone"
                    size="large"
                    status={errors.timezone && 'error'}
                    message={errors.timezone?.message}
                >
                    <Select size="medium" {...register('timezone')}>
                        {timezoneOptions.map((timezone) => (
                            <SelectOption
                                key={timezone.value}
                                value={timezone.value}
                            >
                                {timezone.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}

---

import { Card, EmptyState } from '@/shared/components'
import { ShareIcon } from '@/shared/assets/icons'
import { SettingsCard } from '@/features/settings/components'
import { SocialAccountItem } from './SocialAccountItem/SocialAccountItem'
import { SocialAccountsSettingsSkeleton } from './SocialAccountsSettingsSkeleton'
import type { SocialAccount } from '@/features/settings/types'
import styles from './SocialAccountsSettings.module.scss'

type SocialAccountsSettingsProps = {
    accounts?: SocialAccount[]
    loading: boolean
}

export const SocialAccountsSettings = ({
    accounts,
    loading,
}: SocialAccountsSettingsProps) => {
    if (loading) return <SocialAccountsSettingsSkeleton />

    if (!accounts || accounts.length === 0) {
        return (
            <Card className={styles.card}>
                <EmptyState
                    icon={<ShareIcon />}
                    title="No social accounts"
                    description="There are no social accounts available."
                />
            </Card>
        )
    }

    return (
        <SettingsCard className={styles.card} title="Social accounts">
            <div className={styles.list}>
                {accounts.map((account) => (
                    <SocialAccountItem key={account.id} account={account} />
                ))}
            </div>
        </SettingsCard>
    )
}

---

import {
    Button,
    FormField,
    Input,
    Select,
    SelectOption,
} from '@/shared/components'
import { useGeneralInformationForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { countryOptions } from './countryOptions'
import { GeneralInformationSettingsSkeleton } from './GeneralInformationSettingsSkeleton'
import type { GeneralInformation } from '@/features/settings/types'
import styles from './GeneralInformationSettings.module.scss'

type GeneralInformationSettingsProps = {
    data: GeneralInformation
    loading: boolean
}

export const GeneralInformationSettings = ({
    data,
    loading,
}: GeneralInformationSettingsProps) => {
    const { form, onSubmit } = useGeneralInformationForm(data)

    const {
        register,
        formState: { errors },
    } = form

    if (loading) return <GeneralInformationSettingsSkeleton />

    return (
        <SettingsCard className={styles.card} title="General information">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    id="first-name"
                    label="First Name"
                    size="large"
                    status={errors.firstName && 'error'}
                    message={errors.firstName?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter first name"
                        size="large"
                        {...register('firstName')}
                    />
                </FormField>
                <FormField
                    id="last-name"
                    label="Last Name"
                    size="large"
                    status={errors.lastName && 'error'}
                    message={errors.lastName?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter last name"
                        size="large"
                        {...register('lastName')}
                    />
                </FormField>
                <FormField
                    id="email"
                    label="Email"
                    size="large"
                    status={errors.email && 'error'}
                    message={errors.email?.message}
                >
                    <Input
                        type="email"
                        placeholder="Enter email"
                        size="large"
                        {...register('email')}
                    />
                </FormField>
                <FormField
                    id="role"
                    label="Role"
                    size="large"
                    status={errors.role && 'error'}
                    message={errors.role?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter role"
                        size="large"
                        {...register('role')}
                    />
                </FormField>
                <FormField
                    id="phone"
                    label="Phone Number"
                    size="large"
                    status={errors.phone && 'error'}
                    message={errors.phone?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter phone number"
                        size="large"
                        {...register('phone')}
                    />
                </FormField>
                <FormField
                    id="birth-date"
                    label="Birth Date"
                    size="large"
                    status={errors.birthDate && 'error'}
                    message={errors.birthDate?.message}
                >
                    <Input
                        type="date"
                        size="large"
                        {...register('birthDate')}
                    />
                </FormField>
                <FormField
                    id="organization"
                    label="Organization"
                    size="large"
                    status={errors.organization && 'error'}
                    message={errors.organization?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter organization"
                        size="large"
                        {...register('organization')}
                    />
                </FormField>
                <FormField
                    id="department"
                    label="Department"
                    size="large"
                    status={errors.department && 'error'}
                    message={errors.department?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter department"
                        size="large"
                        {...register('department')}
                    />
                </FormField>
                <FormField
                    id="address"
                    label="Address"
                    size="large"
                    status={errors.address && 'error'}
                    message={errors.address?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter address"
                        size="large"
                        {...register('address')}
                    />
                </FormField>
                <FormField
                    id="city"
                    label="City"
                    size="large"
                    status={errors.city && 'error'}
                    message={errors.city?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter city"
                        size="large"
                        {...register('city')}
                    />
                </FormField>
                <FormField
                    id="country"
                    label="Country"
                    size="large"
                    status={errors.country && 'error'}
                    message={errors.country?.message}
                >
                    <Select size="medium" {...register('country')}>
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
                <FormField
                    id="zip-code"
                    label="Zip Code"
                    size="large"
                    status={errors.zipCode && 'error'}
                    message={errors.zipCode?.message}
                >
                    <Input
                        type="text"
                        placeholder="Enter zip code"
                        size="large"
                        {...register('zipCode')}
                    />
                </FormField>
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}

---

import { Card, EmptyState } from '@/shared/components'
import { UsersIcon } from '@/shared/assets/icons'
import { SettingsCard } from '@/features/settings/components'
import { ConnectedAccountItem } from './ConnectedAccountItem/ConnectedAccountItem'
import { ConnectedAccountsSettingsSkeleton } from './ConnectedAccountsSettingsSkeleton'
import type { ConnectedAccount } from '@/features/settings/types'
import styles from './ConnectedAccountsSettings.module.scss'

type ConnectedAccountsSettingsProps = {
    accounts?: ConnectedAccount[]
    loading: boolean
}

export const ConnectedAccountsSettings = ({
    accounts,
    loading,
}: ConnectedAccountsSettingsProps) => {
    if (loading) return <ConnectedAccountsSettingsSkeleton />

    if (!accounts || accounts.length === 0) {
        return (
            <Card className={styles.card}>
                <EmptyState
                    icon={<UsersIcon />}
                    title="No connected accounts"
                    description="There are no connected accounts to display."
                />
            </Card>
        )
    }

    return (
        <SettingsCard className={styles.card} title="Connected accounts">
            <div className={styles.list}>
                {accounts.map((account) => (
                    <ConnectedAccountItem key={account.id} account={account} />
                ))}
            </div>
        </SettingsCard>
    )
}

---

import { Button, FormField, Input } from '@/shared/components'
import { usePasswordForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { PasswordSettingsSkeleton } from './PasswordSettingsSkeleton'
import styles from './PasswordSettings.module.scss'

type PasswordSettingsProps = {
    loading: boolean
}

export const PasswordSettings = ({ loading }: PasswordSettingsProps) => {
    const { form, onSubmit } = usePasswordForm()

    const {
        register,
        formState: { errors },
    } = form

    if (loading) return <PasswordSettingsSkeleton />

    return (
        <SettingsCard className={styles.card} title="Password information">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    id="current-password"
                    label="Current Password"
                    size="large"
                    status={errors.currentPassword && 'error'}
                    message={errors.currentPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Enter your current password"
                        size="large"
                        {...register('currentPassword')}
                    />
                </FormField>
                <FormField
                    id="new-password"
                    label="New Password"
                    size="large"
                    status={errors.newPassword && 'error'}
                    message={errors.newPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Enter your new password"
                        size="large"
                        {...register('newPassword')}
                    />
                </FormField>
                <FormField
                    id="confirm-password"
                    label="Confirm Password"
                    size="large"
                    status={errors.confirmPassword && 'error'}
                    message={errors.confirmPassword?.message}
                >
                    <Input
                        type="password"
                        placeholder="Confirm your new password"
                        size="large"
                        {...register('confirmPassword')}
                    />
                </FormField>
                <div className={styles.requirements}>
                    <p className={styles.title}>Password requirements:</p>
                    <p className={styles.description}>
                        Ensure that these requirements are met:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            Between 8 and 100 characters long
                        </li>
                        <li className={styles.item}>
                            Include both uppercase and lowercase letters
                        </li>
                        <li className={styles.item}>
                            Include at least one number and one special
                            character
                        </li>
                    </ul>
                </div>
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}

---

import { useNotificationPreferences } from '@/features/settings/hooks'
import {
    SettingsCard,
    SettingsToggleItem,
    SettingsToggleList,
} from '@/features/settings/components'
import { NotificationSettingsSkeleton } from './NotificationSettingsSkeleton'
import type { NotificationPreferences } from '@/features/settings/types'
import styles from './NotificationSettings.module.scss'

type NotificationSettingsProps = {
    notificationPreferences: NotificationPreferences
    loading: boolean
}

export const NotificationSettings = ({
    notificationPreferences,
    loading,
}: NotificationSettingsProps) => {
    const { updateNotification } = useNotificationPreferences(
        notificationPreferences,
    )

    if (loading) return <NotificationSettingsSkeleton />

    return (
        <SettingsCard
            className={styles.card}
            title="Alerts & Notifications"
            description="Manage how and when you receive notifications"
        >
            <SettingsToggleList>
                <SettingsToggleItem
                    label="Company News"
                    description="Receive news, announcements, and updates about the platform"
                    enabled={notificationPreferences.companyNews}
                    onChange={() => updateNotification('companyNews')}
                />
                <SettingsToggleItem
                    label="Account Activity"
                    description="Receive important notifications about your account and recent activity"
                    enabled={notificationPreferences.accountActivity}
                    onChange={() => updateNotification('accountActivity')}
                />
                <SettingsToggleItem
                    label="Meetups Near You"
                    description="Receive notifications about events and meetups happening near your location"
                    enabled={notificationPreferences.meetupsNearYou}
                    onChange={() => updateNotification('meetupsNearYou')}
                />
                <SettingsToggleItem
                    label="New Messages"
                    description="Receive notifications when you get new messages or conversations"
                    enabled={notificationPreferences.newMessages}
                    onChange={() => updateNotification('newMessages')}
                />
            </SettingsToggleList>
        </SettingsCard>
    )
}

---

import { useEmailPreferences } from '@/features/settings/hooks'
import {
    SettingsCard,
    SettingsToggleItem,
    SettingsToggleList,
} from '@/features/settings/components'
import { EmailSettingsSkeleton } from './EmailSettingsSkeleton'
import type { EmailPreferences } from '@/features/settings/types'
import styles from './EmailSettings.module.scss'

type EmailSettingsProps = {
    emailPreferences: EmailPreferences
    loading: boolean
}

export const EmailSettings = ({
    emailPreferences,
    loading,
}: EmailSettingsProps) => {
    const { updateEmailPreference } = useEmailPreferences(emailPreferences)

    if (loading) return <EmailSettingsSkeleton />

    return (
        <SettingsCard
            className={styles.card}
            title="Email Settings"
            description="Manage which emails you want to receive"
        >
            <SettingsToggleList>
                <SettingsToggleItem
                    label="Rating reminders"
                    description="Send an email reminding me to rate an item a week after purchase"
                    enabled={emailPreferences.ratingReminders}
                    onChange={() => updateEmailPreference('ratingReminders')}
                />
                <SettingsToggleItem
                    label="Item update notifications"
                    description="Send an email when an item I've purchased is updated"
                    enabled={emailPreferences.itemUpdateNotifications}
                    onChange={() =>
                        updateEmailPreference('itemUpdateNotifications')
                    }
                />
                <SettingsToggleItem
                    label="Item comment notifications"
                    description="Send me an email when someone comments on one of my items"
                    enabled={emailPreferences.itemCommentNotifications}
                    onChange={() =>
                        updateEmailPreference('itemCommentNotifications')
                    }
                />
                <SettingsToggleItem
                    label="Buyer review notifications"
                    description="Send me an email when someone leaves a review with their rating"
                    enabled={emailPreferences.buyerReviewNotifications}
                    onChange={() =>
                        updateEmailPreference('buyerReviewNotifications')
                    }
                />
            </SettingsToggleList>
        </SettingsCard>
    )
}

---

import { useDeviceSessions } from '@/features/settings/hooks'
import {
    Button,
    Card,
    EmptyState,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/shared/components'
import { DesktopComputerIcon } from '@/shared/assets/icons'
import { SettingsCard } from '@/features/settings/components'
import { RecentDevicesSettingsSkeleton } from './RecentDevicesSettingsSkeleton'
import type { DeviceSession } from '@/features/settings/types'
import styles from './RecentDevicesSettings.module.scss'

type RecentDevicesSettingsProps = {
    devices?: DeviceSession[]
    loading: boolean
}

export const RecentDevicesSettings = ({
    devices,
    loading,
}: RecentDevicesSettingsProps) => {
    const { disconnectSession } = useDeviceSessions()

    if (loading) return <RecentDevicesSettingsSkeleton />

    if (!devices || devices.length === 0) {
        return (
            <Card className={styles.card}>
                <EmptyState
                    icon={<DesktopComputerIcon />}
                    title="No recent devices"
                    description="No recent device sessions were found."
                />
            </Card>
        )
    }

    return (
        <SettingsCard
            className={styles.card}
            title="Recent Devices"
            description="Review devices that have recently accessed your account"
        >
            <Table className={styles.table} striped>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.browser} header>
                            Browser
                        </TableCell>
                        <TableCell className={styles.device} header>
                            Device
                        </TableCell>
                        <TableCell className={styles.location} header>
                            Location
                        </TableCell>
                        <TableCell className={styles.lastAccessed} header>
                            Last Accessed
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {devices.map((device) => (
                        <TableRow key={device.id}>
                            <TableCell className={styles.browser}>
                                {device.browser}
                            </TableCell>
                            <TableCell className={styles.device}>
                                {device.device}
                            </TableCell>
                            <TableCell className={styles.location}>
                                {device.location}
                            </TableCell>
                            <TableCell className={styles.lastAccessed}>
                                {device.lastAccessed}
                            </TableCell>
                            <TableCell className={styles.actions}>
                                <Button
                                    size="md"
                                    variant="primary"
                                    onClick={() => disconnectSession(device.id)}
                                >
                                    Disconnect
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </SettingsCard>
    )
}

