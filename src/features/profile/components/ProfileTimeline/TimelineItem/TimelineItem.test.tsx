import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TimelineItem } from './TimelineItem'

describe('TimelineItem', () => {
    const timelineEntry = {
        id: 1,
        period: '2020 - 2022',
        title: 'Frontend Developer',
        organization: 'Tech Company',
        description:
            'Developed and maintained web applications using modern frontend technologies.',
    }

    describe('timeline information', () => {
        it('renders the period', () => {
            render(<TimelineItem {...timelineEntry} />)

            expect(screen.getByText('2020 - 2022')).toBeInTheDocument()
        })

        it('renders the title', () => {
            render(<TimelineItem {...timelineEntry} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Frontend Developer',
                }),
            ).toBeInTheDocument()
        })

        it('renders the organization', () => {
            render(<TimelineItem {...timelineEntry} />)

            expect(screen.getByText('Tech Company')).toBeInTheDocument()
        })

        it('renders the description', () => {
            render(<TimelineItem {...timelineEntry} />)

            expect(
                screen.getByText(
                    'Developed and maintained web applications using modern frontend technologies.',
                ),
            ).toBeInTheDocument()
        })
    })

    describe('structure', () => {
        it('renders the timeline item container', () => {
            const { container } = render(<TimelineItem {...timelineEntry} />)

            expect(container.firstElementChild).toHaveClass('item')
        })

        it('renders the indicator with dot and line', () => {
            const { container } = render(<TimelineItem {...timelineEntry} />)

            const indicator = container.querySelector('[class*="indicator"]')

            expect(indicator).toBeInTheDocument()
            expect(indicator?.children).toHaveLength(2)
            expect(indicator?.children[0]).toHaveClass('dot')
            expect(indicator?.children[1]).toHaveClass('line')
        })

        it('renders the content in the expected order', () => {
            const { container } = render(<TimelineItem {...timelineEntry} />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(4)
            expect(content?.children[0]).toHaveClass('period')
            expect(content?.children[1]).toHaveClass('title')
            expect(content?.children[2]).toHaveClass('organization')
            expect(content?.children[3]).toHaveClass('description')
        })
    })
})
