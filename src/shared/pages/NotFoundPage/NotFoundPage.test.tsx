import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NotFoundPage } from './NotFoundPage'

const systemViewProps = vi.hoisted(() => ({
    image: '',
    title: '',
    description: '',
    action: undefined as
        | {
              label: string
              to?: string
              onClick?: () => void
          }
        | undefined,
}))

vi.mock('@/shared/components', () => ({
    SystemView: (props: typeof systemViewProps) => {
        systemViewProps.image = props.image
        systemViewProps.title = props.title
        systemViewProps.description = props.description
        systemViewProps.action = props.action

        return (
            <section>
                <img src={props.image} alt={props.title} />
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <button>{props.action?.label}</button>
            </section>
        )
    },
}))

describe('NotFoundPage', () => {
    describe('rendering', () => {
        it('renders the not found title', () => {
            render(<NotFoundPage />)

            expect(
                screen.getByRole('heading', {
                    name: 'Page Not Found',
                }),
            ).toBeInTheDocument()
        })

        it('renders the not found description', () => {
            render(<NotFoundPage />)

            expect(
                screen.getByText(
                    "Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.",
                ),
            ).toBeInTheDocument()
        })

        it('renders the Back to Dashboard action', () => {
            render(<NotFoundPage />)

            expect(
                screen.getByRole('button', {
                    name: 'Back to Dashboard',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('SystemView props', () => {
        it('passes the not found image', () => {
            render(<NotFoundPage />)

            expect(systemViewProps.image).toBeTruthy()
        })

        it('passes the expected title', () => {
            render(<NotFoundPage />)

            expect(systemViewProps.title).toBe('Page Not Found')
        })

        it('passes the expected description', () => {
            render(<NotFoundPage />)

            expect(systemViewProps.description).toBe(
                "Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.",
            )
        })

        it('passes the Back to Dashboard action', () => {
            render(<NotFoundPage />)

            expect(systemViewProps.action).toEqual({
                label: 'Back to Dashboard',
                to: '/',
            })
        })
    })
})
