import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RecentProductsCard } from './RecentProductsCard'

describe('RecentProductsCard', () => {
    const products = [
        {
            id: 1,
            image: '/images/product-1.jpg',
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 99.99,
            stockQuantity: 10,
        },
        {
            id: 2,
            image: '/images/product-2.jpg',
            name: 'Mechanical Keyboard',
            category: 'Accessories',
            price: 149.99,
            stockQuantity: 5,
        },
        {
            id: 3,
            image: '/images/product-3.jpg',
            name: 'USB-C Cable',
            category: 'Cables',
            price: 19.99,
            stockQuantity: 0,
        },
    ]

    describe('product information', () => {
        it('renders the section title', () => {
            render(<RecentProductsCard products={products} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Recently Managed Products',
                }),
            ).toBeInTheDocument()
        })

        it('renders all product names', () => {
            render(<RecentProductsCard products={products} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Wireless Headphones',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Mechanical Keyboard',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'USB-C Cable',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('product list', () => {
        it('renders the products inside the products container', () => {
            const { container } = render(
                <RecentProductsCard products={products} />,
            )

            const productsList = container.querySelector('[class*="products"]')

            expect(productsList).toBeInTheDocument()
            expect(productsList?.children).toHaveLength(3)
        })

        it('renders a product item for each product', () => {
            const { container } = render(
                <RecentProductsCard products={products} />,
            )

            const productsList = container.querySelector('[class*="products"]')

            expect(productsList?.children[0]).toBeInTheDocument()
            expect(productsList?.children[1]).toBeInTheDocument()
            expect(productsList?.children[2]).toBeInTheDocument()
        })

        it('preserves the product order', () => {
            const { container } = render(
                <RecentProductsCard products={products} />,
            )

            const productsList = container.querySelector('[class*="products"]')

            const items = Array.from(productsList?.children ?? [])

            expect(items[0]).toHaveTextContent('Wireless Headphones')
            expect(items[1]).toHaveTextContent('Mechanical Keyboard')
            expect(items[2]).toHaveTextContent('USB-C Cable')
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when products are empty', () => {
            render(<RecentProductsCard products={[]} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Product activity unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Recently managed products could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('renders the empty state when products are null', () => {
            render(
                <RecentProductsCard
                    products={null as unknown as typeof products}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Product activity unavailable',
                }),
            ).toBeInTheDocument()
        })

        it('does not render the product section when products are unavailable', () => {
            render(<RecentProductsCard products={[]} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recently Managed Products',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 4,
                    name: 'Wireless Headphones',
                }),
            ).not.toBeInTheDocument()
        })
    })
})
