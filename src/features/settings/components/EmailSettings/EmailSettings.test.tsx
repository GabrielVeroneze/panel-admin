import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useEmailPreferences } from '@/features/settings/hooks'
import { EmailSettings } from './EmailSettings'
import type { EmailPreferences } from '@/features/settings/types'

const { updateEmailPreference } = vi.hoisted(() => ({
    updateEmailPreference: vi.fn(),
}))

vi.mock('@/features/settings/hooks', () => ({
    useEmailPreferences: vi.fn(),
}))

vi.mock('./EmailSettingsSkeleton', () => ({
    EmailSettingsSkeleton: () => (
        <div data-testid="email-settings-skeleton">Loading email settings</div>
    ),
}))

vi.mock('@/features/settings/components', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@/features/settings/components')>()

    return {
        ...actual,
        SettingsCard: ({
            children,
            title,
            description,
        }: {
            children: React.ReactNode
            title: string
            description?: string
        }) => (
            <section>
                <h2>{title}</h2>
                {description && <p>{description}</p>}
                {children}
            </section>
        ),
        SettingsToggleList: ({ children }: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
        SettingsToggleItem: ({
            label,
            description,
            enabled,
            onChange,
        }: {
            label: string
            description: string
            enabled: boolean
            onChange: () => void
        }) => (
            <div>
                <span>{label}</span>
                <p>{description}</p>
                <button
                    type="button"
                    aria-label={label}
                    aria-pressed={enabled}
                    onClick={onChange}
                >
                    {enabled ? 'Enabled' : 'Disabled'}
                </button>
            </div>
        ),
    }
})

describe('EmailSettings', () => {
    const emailPreferences: EmailPreferences = {
        ratingReminders: true,
        itemUpdateNotifications: false,
        itemCommentNotifications: true,
        buyerReviewNotifications: false,
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useEmailPreferences).mockReturnValue({
            updateEmailPreference,
        })
    })

    it('renders the skeleton while loading', () => {
        render(<EmailSettings emailPreferences={emailPreferences} loading />)

        expect(
            screen.getByTestId('email-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Email Settings',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders the section title and description', () => {
        render(
            <EmailSettings
                emailPreferences={emailPreferences}
                loading={false}
            />,
        )

        expect(
            screen.getByRole('heading', {
                name: 'Email Settings',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Manage which emails you want to receive'),
        ).toBeInTheDocument()
    })

    it('renders all four email preference options', () => {
        render(
            <EmailSettings
                emailPreferences={emailPreferences}
                loading={false}
            />,
        )

        expect(
            screen.getByRole('button', { name: 'Rating reminders' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Item update notifications',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Item comment notifications',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Buyer review notifications',
            }),
        ).toBeInTheDocument()
    })

    it('renders each preference with its initial enabled state', () => {
        render(
            <EmailSettings
                emailPreferences={emailPreferences}
                loading={false}
            />,
        )

        expect(
            screen.getByRole('button', { name: 'Rating reminders' }),
        ).toHaveAttribute('aria-pressed', 'true')

        expect(
            screen.getByRole('button', {
                name: 'Item update notifications',
            }),
        ).toHaveAttribute('aria-pressed', 'false')

        expect(
            screen.getByRole('button', {
                name: 'Item comment notifications',
            }),
        ).toHaveAttribute('aria-pressed', 'true')

        expect(
            screen.getByRole('button', {
                name: 'Buyer review notifications',
            }),
        ).toHaveAttribute('aria-pressed', 'false')
    })

    it.each([
        ['Rating reminders', 'ratingReminders'],
        ['Item update notifications', 'itemUpdateNotifications'],
        ['Item comment notifications', 'itemCommentNotifications'],
        ['Buyer review notifications', 'buyerReviewNotifications'],
    ] as const)(
        'calls updateEmailPreference with the correct field for %s',
        (label, field) => {
            render(
                <EmailSettings
                    emailPreferences={emailPreferences}
                    loading={false}
                />,
            )

            fireEvent.click(screen.getByRole('button', { name: label }))

            expect(updateEmailPreference).toHaveBeenCalledTimes(1)
            expect(updateEmailPreference).toHaveBeenCalledWith(field)
        },
    )

    it('passes the current email preferences to the hook', () => {
        render(
            <EmailSettings
                emailPreferences={emailPreferences}
                loading={false}
            />,
        )

        expect(useEmailPreferences).toHaveBeenCalledWith(emailPreferences)
    })
})
