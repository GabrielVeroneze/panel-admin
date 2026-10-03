import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimelineSection } from './TimelineSection'
import type { TimelineEntry } from '@/features/profile/types'

describe('TimelineSection', () => {
    const items = [
        {
            id: 1,
            period: '2020 - 2022',
            title: 'Frontend Developer',
            organization: 'Tech Company',
            description:
                'Developed and maintained web applications using modern frontend technologies.',
        },
        {
            id: 2,
            period: '2018 - 2020',
            title: 'Junior Developer',
            organization: 'Another Company',
            description: 'Worked on web development projects.',
        },
    ]

    const icon = <span data-testid="timeline-icon" />

    describe('timeline information', () => {
        it('renders the section title', () => {
            render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).toBeInTheDocument()
        })

        it('renders the section icon', () => {
            render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            expect(screen.getByTestId('timeline-icon')).toBeInTheDocument()
        })

        it('renders all timeline items', () => {
            render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Frontend Developer',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Junior Developer',
                }),
            ).toBeInTheDocument()
        })

        it('renders the timeline items in the expected order', () => {
            const { container } = render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            const content = container.querySelector('[class*="content"]')

            expect(content?.children).toHaveLength(2)
            expect(content?.children[0]).toHaveTextContent('Frontend Developer')
            expect(content?.children[1]).toHaveTextContent('Junior Developer')
        })
    })

    describe('empty state', () => {
        it.each([
            { items: [], description: 'empty array' },
            { items: null, description: 'null' },
        ])(
            'renders the empty state when items is $description',
            ({ items }) => {
                render(
                    <TimelineSection
                        icon={icon}
                        title="Experience"
                        items={items as TimelineEntry[]}
                    />,
                )

                expect(
                    screen.getByRole('heading', {
                        level: 3,
                        name: 'Timeline information unavailable',
                    }),
                ).toBeInTheDocument()

                expect(
                    screen.getByText(
                        'Career and education history could not be loaded.',
                    ),
                ).toBeInTheDocument()
            },
        )

        it('does not render the timeline section when items are unavailable', () => {
            render(
                <TimelineSection icon={icon} title="Experience" items={[]} />,
            )

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 4,
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('structure', () => {
        it('renders the profile section card with the compact variant', () => {
            const { container } = render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            expect(container.firstElementChild).toHaveClass('card', 'compact')
        })

        it('renders the timeline items inside the content container', () => {
            const { container } = render(
                <TimelineSection
                    icon={icon}
                    title="Experience"
                    items={items}
                />,
            )

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(2)
        })
    })
})
