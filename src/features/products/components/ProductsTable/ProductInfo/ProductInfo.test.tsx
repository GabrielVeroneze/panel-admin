import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductInfo } from './ProductInfo'

describe('ProductInfo', () => {
    it('renders the product image with the provided URL', () => {
        render(
            <ProductInfo
                name="Product 1"
                imageUrl="https://example.com/product.jpg"
            />,
        )

        const image = screen.getByRole('img')

        expect(image).toHaveAttribute('src', 'https://example.com/product.jpg')
    })

    it('renders the product name', () => {
        render(
            <ProductInfo
                name="Product 1"
                imageUrl="https://example.com/product.jpg"
            />,
        )

        expect(screen.getByText('Product 1')).toBeInTheDocument()
    })

    it('uses the product name as the image alt text', () => {
        render(
            <ProductInfo
                name="Product 1"
                imageUrl="https://example.com/product.jpg"
            />,
        )

        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Product 1')
    })

    it('renders different product data correctly', () => {
        render(
            <ProductInfo
                name="Premium Wireless Headphones"
                imageUrl="https://example.com/headphones.png"
            />,
        )

        const image = screen.getByRole('img')

        expect(
            screen.getByText('Premium Wireless Headphones'),
        ).toBeInTheDocument()
        expect(image).toHaveAttribute(
            'src',
            'https://example.com/headphones.png',
        )
        expect(image).toHaveAttribute('alt', 'Premium Wireless Headphones')
    })
})
