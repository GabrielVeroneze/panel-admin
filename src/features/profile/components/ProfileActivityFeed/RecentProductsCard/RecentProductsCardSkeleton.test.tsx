import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { RecentProductsCardSkeleton } from './RecentProductsCardSkeleton'

describe('RecentProductsCardSkeleton', () => {
    describe('structure', () => {
        it('renders the profile section card skeleton', () => {
            const { container } = render(<RecentProductsCardSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'default',
            )
        })

        it('renders the products container inside the content area', () => {
            const { container } = render(<RecentProductsCardSkeleton />)

            const content = container.querySelector('[class*="content"]')
            const products = content?.firstElementChild

            expect(content).toBeInTheDocument()
            expect(products).toBeInTheDocument()
            expect(products).toHaveClass('products', 'skeleton')
        })

        it('renders three product skeletons', () => {
            const { container } = render(<RecentProductsCardSkeleton />)

            const products = container.querySelector('[class*="products"]')

            expect(products?.children).toHaveLength(3)
        })

        it('renders the products container with the expected skeleton items', () => {
            const { container } = render(<RecentProductsCardSkeleton />)

            const products = container.querySelector('[class*="products"]')

            expect(products?.children).toHaveLength(3)

            Array.from(products?.children ?? []).forEach((item) => {
                expect(item).toHaveClass('productSkeleton')
            })
        })
    })
})
