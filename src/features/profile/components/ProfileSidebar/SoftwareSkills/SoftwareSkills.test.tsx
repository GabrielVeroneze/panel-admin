import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SoftwareSkills } from './SoftwareSkills'

describe('SoftwareSkills', () => {
    describe('skills information', () => {
        const skills = [
            {
                id: 'javascript',
                label: 'JavaScript',
            },
            {
                id: 'typescript',
                label: 'TypeScript',
            },
            {
                id: 'react',
                label: 'React',
            },
        ]

        it('renders the software skills section', () => {
            render(<SoftwareSkills skills={skills} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Software Skills',
                }),
            ).toBeInTheDocument()
        })

        it('renders all skill labels', () => {
            render(<SoftwareSkills skills={skills} />)

            expect(screen.getByText('JavaScript')).toBeInTheDocument()
            expect(screen.getByText('TypeScript')).toBeInTheDocument()
            expect(screen.getByText('React')).toBeInTheDocument()
        })

        it('renders the skills inside the skills container', () => {
            const { container } = render(<SoftwareSkills skills={skills} />)

            const skillsContainer = container.querySelector('[class*="skills"]')

            expect(skillsContainer).toBeInTheDocument()
            expect(skillsContainer?.children).toHaveLength(3)
        })

        it('renders the compact profile section card', () => {
            const { container } = render(<SoftwareSkills skills={skills} />)

            expect(container.firstElementChild).toHaveClass('card', 'compact')
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when skills are empty', () => {
            render(<SoftwareSkills skills={[]} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Skills information unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Software skills and technical competencies could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render the skills section when skills are empty', () => {
            render(<SoftwareSkills skills={[]} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Software Skills',
                }),
            ).not.toBeInTheDocument()
        })

        it('renders the empty state when skills are null', () => {
            render(<SoftwareSkills skills={null as never} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Skills information unavailable',
                }),
            ).toBeInTheDocument()
        })
    })
})
