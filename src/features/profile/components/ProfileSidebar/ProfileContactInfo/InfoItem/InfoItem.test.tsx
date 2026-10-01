import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InfoItem } from './InfoItem'

describe('InfoItem', () => {
    describe('content', () => {
        it('renders the provided label and value', () => {
            render(
                <InfoItem
                    icon={<span>Icon</span>}
                    label="Email"
                    value="john@example.com"
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Email',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('john@example.com')).toBeInTheDocument()
        })

        it('renders the value inside a paragraph', () => {
            render(
                <InfoItem
                    icon={<span>Icon</span>}
                    label="Phone"
                    value="+55 11 99999-9999"
                />,
            )

            const value = screen.getByText('+55 11 99999-9999')

            expect(value.tagName).toBe('P')
        })
    })

    describe('icon', () => {
        it('renders the provided icon', () => {
            render(
                <InfoItem
                    icon={<span data-testid="info-icon">Icon</span>}
                    label="Email"
                    value="john@example.com"
                />,
            )

            expect(screen.getByTestId('info-icon')).toBeInTheDocument()
        })

        it('renders the icon inside its container', () => {
            render(
                <InfoItem
                    icon={<span data-testid="info-icon">Icon</span>}
                    label="Email"
                    value="john@example.com"
                />,
            )

            const icon = screen.getByTestId('info-icon')
            const iconContainer = icon.parentElement

            expect(iconContainer).toBeInTheDocument()
            expect(iconContainer?.children).toHaveLength(1)
        })
    })

    describe('structure', () => {
        it('renders the label as a level-three heading', () => {
            render(
                <InfoItem
                    icon={<span>Icon</span>}
                    label="Location"
                    value="Brazil"
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Location',
                }),
            ).toBeInTheDocument()
        })

        it('renders the label and value inside the content container', () => {
            const { container } = render(
                <InfoItem
                    icon={<span>Icon</span>}
                    label="Address"
                    value="Main Street, 123"
                />,
            )

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(2)
            expect(content?.querySelector('h3')).toHaveTextContent('Address')
            expect(content?.querySelector('p')).toHaveTextContent(
                'Main Street, 123',
            )
        })
    })
})
