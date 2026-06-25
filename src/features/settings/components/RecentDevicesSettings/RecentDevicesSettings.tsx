import { useDeviceSessions } from '@/features/settings/hooks'
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/shared/components'
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
        return null
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
