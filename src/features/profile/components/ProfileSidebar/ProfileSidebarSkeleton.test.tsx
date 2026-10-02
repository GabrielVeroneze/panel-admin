import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileSidebarSkeleton } from './ProfileSidebarSkeleton'

describe('ProfileSidebarSkeleton', () => {
    describe('structure', () => {
        it('renders the sidebar container', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            expect(container.firstElementChild?.tagName).toBe('ASIDE')
            expect(container.firstElementChild).toHaveClass('sidebar')
        })

        it('renders all profile section skeletons', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            const sidebar = container.firstElementChild

            expect(sidebar?.children).toHaveLength(4)
        })

        it('renders the profile header skeleton', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            const sidebar = container.firstElementChild

            expect(sidebar?.children[0]).toBeInTheDocument()
        })

        it('renders the contact information skeleton', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            const sidebar = container.firstElementChild

            expect(sidebar?.children[1]).toBeInTheDocument()
        })

        it('renders the about section skeleton', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            const sidebar = container.firstElementChild

            expect(sidebar?.children[2]).toBeInTheDocument()
        })

        it('renders the software skills skeleton', () => {
            const { container } = render(<ProfileSidebarSkeleton />)

            const sidebar = container.firstElementChild

            expect(sidebar?.children[3]).toBeInTheDocument()
        })
    })
})
