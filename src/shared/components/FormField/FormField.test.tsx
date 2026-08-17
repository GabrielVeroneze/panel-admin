import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from '@/shared/components'
import { FormField } from './FormField'

describe('FormField', () => {
    describe('rendering', () => {
        it('renders the child field', () => {
            render(
                <FormField>
                    <input />
                </FormField>,
            )

            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders the label when provided', () => {
            render(
                <FormField id="email" label="Email">
                    <input />
                </FormField>,
            )

            expect(screen.getByText('Email')).toBeInTheDocument()
        })

        it('associates the label with the child field', () => {
            render(
                <FormField id="email" label="Email">
                    <input />
                </FormField>,
            )

            expect(screen.getByLabelText('Email')).toBeInTheDocument()
        })

        it('renders the message when provided', () => {
            render(
                <FormField message="Invalid email">
                    <input />
                </FormField>,
            )

            expect(screen.getByText('Invalid email')).toBeInTheDocument()
        })
    })

    describe('child field', () => {
        it('passes the id to the child field', () => {
            render(
                <FormField id="email">
                    <input />
                </FormField>,
            )

            expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email')
        })

        it('passes the status to the child field', () => {
            render(
                <FormField status="error">
                    <Input />
                </FormField>,
            )

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(wrapper).toHaveClass('error')
        })

        it('passes both id and status to the child field', () => {
            render(
                <FormField id="email" status="success">
                    <Input />
                </FormField>,
            )

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(input).toHaveAttribute('id', 'email')
            expect(wrapper).toHaveClass('success')
        })
    })

    describe('message', () => {
        it('applies the status to the message', () => {
            render(
                <FormField status="error" message="Invalid email">
                    <input />
                </FormField>,
            )

            expect(screen.getByText('Invalid email')).toHaveClass('error')
        })

        it('renders the message without a status when status is not provided', () => {
            render(
                <FormField message="Optional message">
                    <input />
                </FormField>,
            )

            expect(screen.getByText('Optional message')).toBeInTheDocument()
        })
    })

    describe('optional content', () => {
        it('does not render the label when it is not provided', () => {
            render(
                <FormField>
                    <input />
                </FormField>,
            )

            expect(screen.queryByText('Email')).not.toBeInTheDocument()
        })

        it('does not render the message when it is not provided', () => {
            render(
                <FormField>
                    <input />
                </FormField>,
            )

            expect(screen.queryByText('Invalid email')).not.toBeInTheDocument()
        })
    })

    describe('field configuration', () => {
        it('applies the provided size', () => {
            const { container } = render(
                <FormField size="large">
                    <input />
                </FormField>,
            )

            expect(container.firstChild).toHaveClass('large')
        })

        it('applies the provided className', () => {
            const { container } = render(
                <FormField className="custom-field">
                    <input />
                </FormField>,
            )

            expect(container.firstChild).toHaveClass('custom-field')
        })
    })
})
