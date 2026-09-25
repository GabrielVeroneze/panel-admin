import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LatestCustomersList } from './LatestCustomersList'
import type { LatestCustomer } from '@/features/dashboard/types'

describe('LatestCustomersList', () => {
    it('renders the loading state', () => {
        const { container } = render(<LatestCustomersList loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when customers are not provided', () => {
        render(<LatestCustomersList />)

        expect(
            screen.getByRole('heading', { name: 'No customers' }),
        ).toBeVisible()

        expect(screen.getByText('No recent customers found.')).toBeVisible()
    })

    it('renders the list title when customers are provided', () => {
        const customers: LatestCustomer[] = []

        render(<LatestCustomersList customers={customers} />)

        expect(
            screen.getByRole('heading', { name: 'Latest Customers' }),
        ).toBeVisible()
    })

    it('renders all customers', () => {
        const customers: LatestCustomer[] = [
            {
                id: 1,
                image: '/images/john.jpg',
                name: 'John Doe',
                email: 'john@example.com',
                totalSpent: 1250,
            },
            {
                id: 2,
                image: '/images/jane.jpg',
                name: 'Jane Smith',
                email: 'jane@example.com',
                totalSpent: 2750,
            },
        ]

        render(<LatestCustomersList customers={customers} />)

        expect(screen.getByText('John Doe')).toBeVisible()
        expect(screen.getByText('john@example.com')).toBeVisible()
        expect(screen.getByText('Jane Smith')).toBeVisible()
        expect(screen.getByText('jane@example.com')).toBeVisible()
    })

    it('renders each customer total formatted as currency', () => {
        const customers: LatestCustomer[] = [
            {
                id: 1,
                image: '/images/john.jpg',
                name: 'John Doe',
                email: 'john@example.com',
                totalSpent: 1250,
            },
            {
                id: 2,
                image: '/images/jane.jpg',
                name: 'Jane Smith',
                email: 'jane@example.com',
                totalSpent: 2750,
            },
        ]

        render(<LatestCustomersList customers={customers} />)

        expect(screen.getByText('$1,250')).toBeVisible()
        expect(screen.getByText('$2,750')).toBeVisible()
    })

    it('renders one list item for each customer', () => {
        const customers: LatestCustomer[] = [
            {
                id: 1,
                image: '/images/john.jpg',
                name: 'John Doe',
                email: 'john@example.com',
                totalSpent: 1250,
            },
            {
                id: 2,
                image: '/images/jane.jpg',
                name: 'Jane Smith',
                email: 'jane@example.com',
                totalSpent: 2750,
            },
            {
                id: 3,
                image: '/images/bob.jpg',
                name: 'Bob Johnson',
                email: 'bob@example.com',
                totalSpent: 3500,
            },
        ]

        render(<LatestCustomersList customers={customers} />)

        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('renders customer avatars with the provided image and name', () => {
        const customers: LatestCustomer[] = [
            {
                id: 1,
                image: '/images/john.jpg',
                name: 'John Doe',
                email: 'john@example.com',
                totalSpent: 1250,
            },
        ]

        render(<LatestCustomersList customers={customers} />)

        const avatar = screen.getByRole('img', { name: 'John Doe' })

        expect(avatar).toHaveAttribute('src', '/images/john.jpg')
        expect(avatar).toHaveAttribute('alt', 'John Doe')
    })

    it('renders an empty list when customers is an empty array', () => {
        render(<LatestCustomersList customers={[]} />)

        expect(
            screen.getByRole('heading', { name: 'Latest Customers' }),
        ).toBeVisible()

        expect(screen.getByRole('list')).toBeEmptyDOMElement()
    })
})
