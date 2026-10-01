import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillBadge } from './SkillBadge'

vi.mock('@/shared/assets/software-icons/registry', () => ({
    softwareIcons: {
        javascript: ({ className }: { className?: string }) => (
            <svg
                data-testid="software-icon"
                className={className}
                aria-hidden="true"
            />
        ),
    },
}))

describe('SkillBadge', () => {
    describe('valid skill', () => {
        it('renders the skill label', () => {
            render(<SkillBadge id="javascript" label="JavaScript" />)

            expect(screen.getByText('JavaScript')).toBeInTheDocument()
        })

        it('renders the corresponding software icon', () => {
            render(<SkillBadge id="javascript" label="JavaScript" />)

            expect(screen.getByTestId('software-icon')).toBeInTheDocument()
        })

        it('renders the icon with the expected class', () => {
            render(<SkillBadge id="javascript" label="JavaScript" />)

            expect(screen.getByTestId('software-icon')).toHaveClass('icon')
        })

        it('renders the icon and label inside the badge', () => {
            const { container } = render(
                <SkillBadge id="javascript" label="JavaScript" />,
            )

            const badge = container.firstElementChild

            expect(badge).toHaveClass('badge')
            expect(badge?.children).toHaveLength(2)
            expect(badge?.querySelector('svg')).toBeInTheDocument()
            expect(badge?.querySelector('span')).toHaveTextContent('JavaScript')
        })
    })

    describe('unknown skill', () => {
        it('renders nothing when the skill id is not registered', () => {
            const { container } = render(
                <SkillBadge id="unknown-skill" label="Unknown Skill" />,
            )

            expect(container.firstChild).toBeNull()
        })

        it('does not render the skill label when the icon is not registered', () => {
            render(<SkillBadge id="unknown-skill" label="Unknown Skill" />)

            expect(screen.queryByText('Unknown Skill')).not.toBeInTheDocument()
        })
    })
})
