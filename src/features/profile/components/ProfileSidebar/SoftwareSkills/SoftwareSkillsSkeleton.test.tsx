import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SoftwareSkillsSkeleton } from './SoftwareSkillsSkeleton'

describe('SoftwareSkillsSkeleton', () => {
    describe('structure', () => {
        it('renders the compact profile section card skeleton', () => {
            const { container } = render(<SoftwareSkillsSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'compact',
            )
        })

        it('renders the skills container inside the content area', () => {
            const { container } = render(<SoftwareSkillsSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(1)
            expect(content?.firstElementChild).toHaveClass('skills', 'skeleton')
        })

        it('renders six skill skeletons', () => {
            const { container } = render(<SoftwareSkillsSkeleton />)

            const skills = container.querySelector('[class*="skills"]')

            expect(skills?.children).toHaveLength(6)
        })

        it('renders each skill skeleton with the expected class', () => {
            const { container } = render(<SoftwareSkillsSkeleton />)

            const skills = container.querySelector('[class*="skills"]')

            const skeletons = Array.from(skills?.children ?? [])

            expect(skeletons).toHaveLength(6)

            skeletons.forEach((skeleton) => {
                expect(skeleton).toHaveClass('skillSkeleton')
            })
        })
    })
})
