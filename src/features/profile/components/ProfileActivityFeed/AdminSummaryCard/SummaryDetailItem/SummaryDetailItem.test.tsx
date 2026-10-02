import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryDetailItem } from './SummaryDetailItem'

describe('SummaryDetailItem', () => {
    describe('content', () => {
        it('renders the provided label', () => {
            render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            expect(screen.getByText('Active Users')).toBeInTheDocument()
        })

        it('renders the provided value', () => {
            render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            expect(screen.getByText('120')).toBeInTheDocument()
        })

        it('renders a React node as the value', () => {
            render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Status"
                    value={<strong data-testid="value">Active</strong>}
                />,
            )

            expect(screen.getByTestId('value')).toBeInTheDocument()
            expect(screen.getByText('Active')).toBeInTheDocument()
        })

        it('renders the provided icon', () => {
            render(
                <SummaryDetailItem
                    icon={<span data-testid="detail-icon">Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            expect(screen.getByTestId('detail-icon')).toBeInTheDocument()
        })
    })

    describe('color', () => {
        it('uses blue as the default color', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const icon = container.querySelector('[class*="icon"]')

            expect(icon).toBeInTheDocument()
            expect(icon).toHaveClass('icon', 'blue')
        })

        it.each(['purple', 'green', 'orange'] as const)(
            'uses the %s color when provided',
            (color) => {
                const { container } = render(
                    <SummaryDetailItem
                        icon={<span>Icon</span>}
                        label="Active Users"
                        value="120"
                        color={color}
                    />,
                )

                const icon = container.querySelector('[class*="icon"]')

                expect(icon).toBeInTheDocument()
                expect(icon).toHaveClass('icon', color)
            },
        )
    })

    describe('structure', () => {
        it('renders the item container', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            expect(container.firstElementChild).toHaveClass('item')
        })

        it('renders the header inside the item', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const item = container.firstElementChild
            const header = item?.firstElementChild

            expect(header).toBeInTheDocument()
            expect(header).toHaveClass('header')
        })

        it('renders the icon inside the icon container', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span data-testid="detail-icon">Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const icon = screen.getByTestId('detail-icon')
            const iconContainer = container.querySelector('[class*="icon"]')

            expect(iconContainer).toBeInTheDocument()
            expect(iconContainer).toContainElement(icon)
        })

        it('renders the label inside the header', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const header = container.querySelector('[class*="header"]')

            expect(header).toBeInTheDocument()
            expect(header).toContainElement(screen.getByText('Active Users'))
        })

        it('renders the value inside the value element', () => {
            const { container } = render(
                <SummaryDetailItem
                    icon={<span>Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const value = screen.getByText('120')

            expect(value.tagName).toBe('SPAN')
            expect(value).toHaveClass('value')
            expect(container.firstElementChild).toContainElement(value)
        })

        it('renders the icon and label inside the header', () => {
            render(
                <SummaryDetailItem
                    icon={<span data-testid="detail-icon">Icon</span>}
                    label="Active Users"
                    value="120"
                />,
            )

            const header = screen.getByText('Active Users').parentElement

            expect(header).toContainElement(screen.getByTestId('detail-icon'))
            expect(header).toContainElement(screen.getByText('Active Users'))
        })
    })
})
