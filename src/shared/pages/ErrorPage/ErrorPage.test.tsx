import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorPage } from './ErrorPage'
import userEvent from '@testing-library/user-event'

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
                <button onClick={props.action?.onClick}>
                    {props.action?.label}
                </button>
            </section>
        )
    },
}))

describe('ErrorPage', () => {
    describe('rendering', () => {
        it('renders the error title', () => {
            render(<ErrorPage />)

            expect(
                screen.getByRole('heading', {
                    name: 'Something went wrong',
                }),
            ).toBeInTheDocument()
        })

        it('renders the error description', () => {
            render(<ErrorPage />)

            expect(
                screen.getByText(
                    'An unexpected error occurred while processing your request. Please try again. If the problem persists, return to the dashboard and try again later.',
                ),
            ).toBeInTheDocument()
        })

        it('renders the Try Again action', () => {
            render(<ErrorPage />)

            expect(
                screen.getByRole('button', {
                    name: 'Try Again',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('SystemView props', () => {
        it('passes the server error image', () => {
            render(<ErrorPage />)

            expect(systemViewProps.image).toBeTruthy()
        })

        it('passes the expected title', () => {
            render(<ErrorPage />)

            expect(systemViewProps.title).toBe('Something went wrong')
        })

        it('passes the expected description', () => {
            render(<ErrorPage />)

            expect(systemViewProps.description).toBe(
                'An unexpected error occurred while processing your request. Please try again. If the problem persists, return to the dashboard and try again later.',
            )
        })

        it('passes the Try Again action', () => {
            render(<ErrorPage />)

            expect(systemViewProps.action?.label).toBe('Try Again')
            expect(systemViewProps.action?.onClick).toEqual(
                expect.any(Function),
            )
        })
    })

    describe('Try Again action', () => {
        it('reloads the page when clicked', async () => {
            const user = userEvent.setup()
            const reload = vi.fn()

            vi.stubGlobal('location', {
                ...window.location,
                reload,
            })

            render(<ErrorPage />)

            await user.click(
                screen.getByRole('button', {
                    name: 'Try Again',
                }),
            )

            expect(reload).toHaveBeenCalledTimes(1)

            vi.unstubAllGlobals()
        })
    })
})
