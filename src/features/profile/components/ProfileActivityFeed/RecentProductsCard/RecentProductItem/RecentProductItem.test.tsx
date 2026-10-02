import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { formatCurrency } from '@/shared/utils'
import { RecentProductItem } from './RecentProductItem'

vi.mock('@/shared/utils', () => ({
    formatCurrency: vi.fn(() => '$99.99'),
}))

describe('RecentProductItem', () => {
    const product = {
        id: 1,
        image: '/images/product.jpg',
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 99.99,
        stockQuantity: 10,
    }

    describe('product information', () => {
        it('renders the product name', () => {
            render(<RecentProductItem {...product} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Wireless Headphones',
                }),
            ).toBeInTheDocument()
        })

        it('renders the product category', () => {
            render(<RecentProductItem {...product} />)

            expect(screen.getByText('Electronics')).toBeInTheDocument()
        })

        it('renders the product image', () => {
            render(<RecentProductItem {...product} />)

            const image = screen.getByRole('img', {
                name: 'Wireless Headphones',
            })

            expect(image).toHaveAttribute('src', '/images/product.jpg')
            expect(image).toHaveAttribute('alt', 'Wireless Headphones')
        })

        it('renders the formatted product price', () => {
            render(<RecentProductItem {...product} />)

            expect(screen.getByText('$99.99')).toBeInTheDocument()
        })

        it('formats the price with two decimal places', () => {
            render(<RecentProductItem {...product} />)

            expect(formatCurrency).toHaveBeenCalledWith(99.99, {
                decimals: 2,
            })
        })
    })

    describe('stock status', () => {
        it.each([
            { stockQuantity: 10, text: 'In Stock', colorClass: 'green' },
            { stockQuantity: 1, text: 'In Stock', colorClass: 'green' },
        ])(
            'renders In Stock when stock quantity is $stockQuantity',
            ({ stockQuantity, text, colorClass }) => {
                render(
                    <RecentProductItem
                        {...product}
                        stockQuantity={stockQuantity}
                    />,
                )

                const badge = screen.getByText(text)

                expect(badge).toBeInTheDocument()
                expect(badge).toHaveClass(colorClass)
            },
        )

        it.each([{ stockQuantity: 0 }, { stockQuantity: -1 }])(
            'renders Sold Out when stock quantity is $stockQuantity',
            ({ stockQuantity }) => {
                render(
                    <RecentProductItem
                        {...product}
                        stockQuantity={stockQuantity}
                    />,
                )

                const badge = screen.getByText('Sold Out')

                expect(badge).toBeInTheDocument()
                expect(badge).toHaveClass('red')
            },
        )
    })

    describe('structure', () => {
        it('renders the product item container', () => {
            const { container } = render(<RecentProductItem {...product} />)

            expect(container.firstElementChild).toHaveClass('item')
        })

        it('renders the product content before the stock badge', () => {
            const { container } = render(<RecentProductItem {...product} />)

            const item = container.firstElementChild

            expect(item?.children).toHaveLength(3)
            expect(item?.children[0]).toHaveClass('image')
            expect(item?.children[1]).toHaveClass('content')
            expect(item?.children[2]).toHaveTextContent('In Stock')
        })
    })
})
