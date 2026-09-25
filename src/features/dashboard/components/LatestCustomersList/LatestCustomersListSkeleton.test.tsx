import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { LatestCustomersListSkeleton } from './LatestCustomersListSkeleton'

describe('LatestCustomersListSkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the title skeleton', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelector('.titleSkeleton')).toBeInTheDocument()
    })

    it('renders the customers list', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelector('.list')).toBeInTheDocument()
    })

    it('renders six customer skeleton items', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelectorAll('.item')).toHaveLength(6)
    })

    it('renders an avatar skeleton for each customer', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelectorAll('.avatarSkeleton')).toHaveLength(6)
    })

    it('renders a name skeleton for each customer', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelectorAll('.nameSkeleton')).toHaveLength(6)
    })

    it('renders an email skeleton for each customer', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelectorAll('.emailSkeleton')).toHaveLength(6)
    })

    it('renders a value skeleton for each customer', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        expect(container.querySelectorAll('.valueSkeleton')).toHaveLength(6)
    })

    it('renders the customer information container with the small variant', () => {
        const { container } = render(<LatestCustomersListSkeleton />)

        const customerInfo = container.querySelectorAll('.item > .container.sm')

        expect(customerInfo).toHaveLength(6)
    })
})
