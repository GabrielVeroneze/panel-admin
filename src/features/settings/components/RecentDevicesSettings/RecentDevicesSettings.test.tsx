import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { RecentDevicesSettings } from './RecentDevicesSettings'
import type { DeviceSession } from '@/features/settings/types'
import type { ReactNode } from 'react'

const mocks = vi.hoisted(() => ({
    disconnectSession: vi.fn(),
}))

vi.mock('@/features/settings/hooks', () => ({
    useDeviceSessions: () => ({
        disconnectSession: mocks.disconnectSession,
    }),
}))

vi.mock('./RecentDevicesSettingsSkeleton', () => ({
    RecentDevicesSettingsSkeleton: () => (
        <div data-testid="recent-devices-settings-skeleton">
            Loading recent devices
        </div>
    ),
}))

vi.mock('@/shared/components', () => ({
    Button: ({
        children,
        onClick,
    }: {
        children: ReactNode
        onClick?: () => void
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
    Card: ({ children }: { children: ReactNode }) => (
        <div data-testid="card">{children}</div>
    ),
    EmptyState: ({
        title,
        description,
    }: {
        title: string
        description?: string
    }) => (
        <div data-testid="empty-state">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </div>
    ),
    Table: ({
        children,
        striped: _striped,
        className,
    }: {
        children: ReactNode
        striped?: boolean
        className?: string
    }) => (
        <table className={className} data-striped={String(_striped ?? false)}>
            {children}
        </table>
    ),
    TableBody: ({ children }: { children: ReactNode }) => (
        <tbody>{children}</tbody>
    ),
    TableCell: ({
        children,
        header,
    }: {
        children: ReactNode
        header?: boolean
    }) => (header ? <th>{children}</th> : <td>{children}</td>),
    TableHead: ({ children }: { children: ReactNode }) => (
        <thead>{children}</thead>
    ),
    TableRow: ({ children }: { children: ReactNode }) => <tr>{children}</tr>,
}))

vi.mock('@/features/settings/components', () => ({
    SettingsCard: ({
        children,
        title,
        description,
    }: {
        children: ReactNode
        title: string
        description?: string
    }) => (
        <section>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
        </section>
    ),
}))

const devices: DeviceSession[] = [
    {
        id: 1,
        browser: 'Google Chrome',
        device: 'Windows PC',
        location: 'Curitiba, Brazil',
        lastAccessed: 'Oct 12, 2026',
    },
    {
        id: 2,
        browser: 'Firefox',
        device: 'MacBook Pro',
        location: 'São Paulo, Brazil',
        lastAccessed: 'Oct 11, 2026',
    },
]

describe('RecentDevicesSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the skeleton while loading', () => {
        render(<RecentDevicesSettings devices={devices} loading />)

        expect(
            screen.getByTestId('recent-devices-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'Recent Devices' }),
        ).not.toBeInTheDocument()
    })

    it('renders the empty state when devices are undefined', () => {
        render(<RecentDevicesSettings loading={false} />)

        expect(screen.getByTestId('empty-state')).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: 'No recent devices' }),
        ).toBeInTheDocument()
        expect(
            screen.getByText('No recent device sessions were found.'),
        ).toBeInTheDocument()
    })

    it('renders the empty state when the devices array is empty', () => {
        render(<RecentDevicesSettings devices={[]} loading={false} />)

        expect(
            screen.getByRole('heading', { name: 'No recent devices' }),
        ).toBeInTheDocument()
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })

    it('renders the settings card title and description', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        expect(
            screen.getByRole('heading', { name: 'Recent Devices' }),
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Review devices that have recently accessed your account',
            ),
        ).toBeInTheDocument()
    })

    it('renders all table column headers', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        const table = screen.getByRole('table')

        for (const header of [
            'Browser',
            'Device',
            'Location',
            'Last Accessed',
        ]) {
            expect(
                within(table).getByRole('columnheader', { name: header }),
            ).toBeInTheDocument()
        }
    })

    it.each([
        ['Google Chrome', 'Windows PC', 'Curitiba, Brazil', 'Oct 12, 2026'],
        ['Firefox', 'MacBook Pro', 'São Paulo, Brazil', 'Oct 11, 2026'],
    ])(
        'renders the device details for %s',
        (browser, device, location, lastAccessed) => {
            render(<RecentDevicesSettings devices={devices} loading={false} />)

            expect(screen.getByText(browser)).toBeInTheDocument()
            expect(screen.getByText(device)).toBeInTheDocument()
            expect(screen.getByText(location)).toBeInTheDocument()
            expect(screen.getByText(lastAccessed)).toBeInTheDocument()
        },
    )

    it('renders one Disconnect button for each device', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        expect(
            screen.getAllByRole('button', { name: 'Disconnect' }),
        ).toHaveLength(devices.length)
    })

    it('disconnects the corresponding device when its button is clicked', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        const buttons = screen.getAllByRole('button', {
            name: 'Disconnect',
        })

        fireEvent.click(buttons[0])

        expect(mocks.disconnectSession).toHaveBeenCalledTimes(1)
        expect(mocks.disconnectSession).toHaveBeenCalledWith(devices[0].id)
    })

    it('disconnects the correct device when another row button is clicked', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        const buttons = screen.getAllByRole('button', {
            name: 'Disconnect',
        })

        fireEvent.click(buttons[1])

        expect(mocks.disconnectSession).toHaveBeenCalledWith(devices[1].id)
    })

    it('does not render the empty state when devices exist', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        expect(
            screen.queryByRole('heading', { name: 'No recent devices' }),
        ).not.toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('renders the table with the expected number of device rows', () => {
        render(<RecentDevicesSettings devices={devices} loading={false} />)

        const table = screen.getByRole('table')
        const rows = within(table).getAllByRole('row')

        expect(rows).toHaveLength(devices.length + 1)
    })
})
