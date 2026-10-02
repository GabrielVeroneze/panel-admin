import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryStat } from './SummaryStat'

vi.mock('@/shared/assets/icons', () => ({
    ArrowDownSolidIcon: () => <svg data-testid="arrow-down-icon" />,
    ArrowUpSolidIcon: () => <svg data-testid="arrow-up-icon" />,
}))

describe('SummaryStat', () => {
    describe('content', () => {
        it('renders the provided label', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(screen.getByText('Products')).toBeInTheDocument()
        })

        it('renders the provided value', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(screen.getByText('120')).toBeInTheDocument()
        })

        it('renders string values', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Revenue"
                    value="$1,250"
                    variation={10}
                />,
            )

            expect(screen.getByText('$1,250')).toBeInTheDocument()
        })

        it('renders the provided icon', () => {
            render(
                <SummaryStat
                    icon={<span data-testid="stat-icon">Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(screen.getByTestId('stat-icon')).toBeInTheDocument()
        })
    })

    describe('variation', () => {
        it('renders a positive variation with a plus sign', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(screen.getByText('+10 this month')).toBeInTheDocument()
        })

        it('renders a negative variation without a plus sign', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={-5}
                />,
            )

            expect(screen.getByText('-5 this month')).toBeInTheDocument()
        })

        it('renders the up arrow for a positive variation', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument()
            expect(
                screen.queryByTestId('arrow-down-icon'),
            ).not.toBeInTheDocument()
        })

        it('renders the down arrow for a negative variation', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={-5}
                />,
            )

            expect(screen.getByTestId('arrow-down-icon')).toBeInTheDocument()
            expect(
                screen.queryByTestId('arrow-up-icon'),
            ).not.toBeInTheDocument()
        })

        it('does not render the variation when it is zero', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={0}
                />,
            )

            expect(screen.queryByText(/this month/)).not.toBeInTheDocument()
            expect(
                screen.queryByTestId('arrow-up-icon'),
            ).not.toBeInTheDocument()
            expect(
                screen.queryByTestId('arrow-down-icon'),
            ).not.toBeInTheDocument()
        })
    })

    describe('color', () => {
        it('uses blue as the default color', () => {
            const { container } = render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(container.firstElementChild).toHaveClass('stat', 'blue')
        })

        it.each(['purple', 'green'] as const)(
            'uses the %s color when provided',
            (color) => {
                const { container } = render(
                    <SummaryStat
                        icon={<span>Icon</span>}
                        label="Products"
                        value={120}
                        variation={10}
                        color={color}
                    />,
                )

                expect(container.firstElementChild).toHaveClass('stat', color)
            },
        )
    })

    describe('structure', () => {
        it('renders the stat as an article', () => {
            const { container } = render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            expect(container.firstElementChild?.tagName).toBe('ARTICLE')
        })

        it('renders the icon inside the icon container', () => {
            const { container } = render(
                <SummaryStat
                    icon={<span data-testid="stat-icon">Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            const icon = screen.getByTestId('stat-icon')
            const iconContainer = container.querySelector('[class*="icon"]')

            expect(iconContainer).toBeInTheDocument()
            expect(iconContainer).toContainElement(icon)
        })

        it('renders the label as a span', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            const label = screen.getByText('Products')

            expect(label.tagName).toBe('SPAN')
        })

        it('renders the value as a strong element', () => {
            render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            const value = screen.getByText('120')

            expect(value.tagName).toBe('STRONG')
        })

        it('renders the label and value inside the content container', () => {
            const { container } = render(
                <SummaryStat
                    icon={<span>Icon</span>}
                    label="Products"
                    value={120}
                    variation={10}
                />,
            )

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content).toContainElement(screen.getByText('Products'))
            expect(content).toContainElement(screen.getByText('120'))
        })
    })
})
