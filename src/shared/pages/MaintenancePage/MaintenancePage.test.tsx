import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MaintenancePage } from './MaintenancePage'
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

describe('MaintenancePage', () => {
    describe('rendering', () => {
        it('renders the maintenance title', () => {
            render(<MaintenancePage />)

            expect(
                screen.getByRole('heading', {
                    name: 'Under Maintenance',
                }),
            ).toBeInTheDocument()
        })

        it('renders the maintenance description', () => {
            render(<MaintenancePage />)

            expect(
                screen.getByText(
                    "We're performing scheduled maintenance to improve our services. The application will be available again shortly. Thank you for your patience.",
                ),
            ).toBeInTheDocument()
        })

        it('renders the Refresh action', () => {
            render(<MaintenancePage />)

            expect(
                screen.getByRole('button', {
                    name: 'Refresh',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('SystemView props', () => {
        it('passes the maintenance image', () => {
            render(<MaintenancePage />)

            expect(systemViewProps.image).toBeTruthy()
        })

        it('passes the expected title', () => {
            render(<MaintenancePage />)

            expect(systemViewProps.title).toBe('Under Maintenance')
        })

        it('passes the expected description', () => {
            render(<MaintenancePage />)

            expect(systemViewProps.description).toBe(
                "We're performing scheduled maintenance to improve our services. The application will be available again shortly. Thank you for your patience.",
            )
        })

        it('passes the Refresh action', () => {
            render(<MaintenancePage />)

            expect(systemViewProps.action?.label).toBe('Refresh')
            expect(systemViewProps.action?.onClick).toEqual(
                expect.any(Function),
            )
        })
    })

    describe('Refresh action', () => {
        it('reloads the page when clicked', async () => {
            const user = userEvent.setup()
            const reload = vi.fn()

            vi.stubGlobal('location', {
                ...window.location,
                reload,
            })

            render(<MaintenancePage />)

            await user.click(
                screen.getByRole('button', {
                    name: 'Refresh',
                }),
            )

            expect(reload).toHaveBeenCalledTimes(1)

            vi.unstubAllGlobals()
        })
    })
})
