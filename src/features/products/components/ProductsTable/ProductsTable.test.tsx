import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ProductsTable } from './ProductsTable'
import type { ProductListItem } from '@/features/products/types'

const products: ProductListItem[] = [
    {
        id: 1,
        name: 'iPhone 15',
        category: 'Smartphones',
        brand: 'Apple',
        price: '$999.00',
        image: 'https://example.com/iphone.jpg',
    },
    {
        id: 2,
        name: 'Galaxy S24',
        category: 'Smartphones',
        brand: 'Samsung',
        price: '$899.00',
        image: 'https://example.com/galaxy.jpg',
    },
]

describe('ProductsTable', () => {
    it('renders the loading state', () => {
        render(
            <ProductsTable
                products={products}
                loading={true}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()
        expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument()
        expect(screen.queryByText('No products')).not.toBeInTheDocument()
    })

    it('renders the empty state when there are no products', () => {
        render(
            <ProductsTable
                products={[]}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByText('No products')).toBeInTheDocument()
        expect(
            screen.getByText('There are no products to display.'),
        ).toBeInTheDocument()

        expect(screen.queryByText('Name')).not.toBeInTheDocument()
        expect(screen.queryByText('Category')).not.toBeInTheDocument()
    })

    it('renders the table headers', () => {
        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(
            screen.getByRole('columnheader', { name: 'Name' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', { name: 'Category' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', { name: 'Brand' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', { name: 'Price' }),
        ).toBeInTheDocument()
    })

    it('renders all product information', () => {
        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByText('iPhone 15')).toBeInTheDocument()
        expect(screen.getByText('Galaxy S24')).toBeInTheDocument()

        expect(screen.getAllByText('Smartphones')).toHaveLength(2)

        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Samsung')).toBeInTheDocument()

        expect(screen.getByText('$999.00')).toBeInTheDocument()
        expect(screen.getByText('$899.00')).toBeInTheDocument()

        expect(screen.getByRole('img', { name: 'iPhone 15' })).toHaveAttribute(
            'src',
            'https://example.com/iphone.jpg',
        )

        expect(screen.getByRole('img', { name: 'Galaxy S24' })).toHaveAttribute(
            'src',
            'https://example.com/galaxy.jpg',
        )
    })

    it('renders one edit button for each product', () => {
        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(
            screen.getAllByRole('button', { name: 'Edit Item' }),
        ).toHaveLength(2)
    })

    it('calls onEdit with the product id when its edit button is clicked', () => {
        const onEdit = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={onEdit}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const editButtons = screen.getAllByRole('button', {
            name: 'Edit Item',
        })

        fireEvent.click(editButtons[0])

        expect(onEdit).toHaveBeenCalledTimes(1)
        expect(onEdit).toHaveBeenCalledWith(1)
    })

    it('calls onEdit with the correct id for each product', () => {
        const onEdit = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={onEdit}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const editButtons = screen.getAllByRole('button', {
            name: 'Edit Item',
        })

        fireEvent.click(editButtons[1])

        expect(onEdit).toHaveBeenCalledTimes(1)
        expect(onEdit).toHaveBeenCalledWith(2)
    })

    it('renders the select-all checkbox with the provided checked state', () => {
        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={true}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes[0]).toBeChecked()
    })

    it('renders the select-all checkbox unchecked when allSelected is false', () => {
        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes[0]).not.toBeChecked()
    })

    it('calls onToggleSelectAll when the select-all checkbox changes', () => {
        const onToggleSelectAll = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={onToggleSelectAll}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        fireEvent.click(checkboxes[0])

        expect(onToggleSelectAll).toHaveBeenCalledTimes(1)
    })

    it('reflects the selected state of each product', () => {
        const isSelected = vi.fn((id: number) => id === 1)

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={isSelected}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes).toHaveLength(3)
        expect(checkboxes[0]).not.toBeChecked()
        expect(checkboxes[1]).toBeChecked()
        expect(checkboxes[2]).not.toBeChecked()
    })

    it('calls onToggleSelect with the product id when its checkbox changes', () => {
        const onToggleSelect = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        fireEvent.click(checkboxes[1])

        expect(onToggleSelect).toHaveBeenCalledTimes(1)
        expect(onToggleSelect).toHaveBeenCalledWith(1)
    })

    it('calls onToggleSelect with the correct product id', () => {
        const onToggleSelect = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        fireEvent.click(checkboxes[2])

        expect(onToggleSelect).toHaveBeenCalledTimes(1)
        expect(onToggleSelect).toHaveBeenCalledWith(2)
    })

    it('does not render the table when loading is true', () => {
        render(
            <ProductsTable
                products={products}
                loading={true}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.queryByRole('table')).not.toBeInTheDocument()
    })

    it('does not call product callbacks while rendering', () => {
        const onEdit = vi.fn()
        const onToggleSelect = vi.fn()
        const onToggleSelectAll = vi.fn()
        const isSelected = vi.fn()

        render(
            <ProductsTable
                products={products}
                loading={false}
                onEdit={onEdit}
                isSelected={isSelected}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={onToggleSelectAll}
                allSelected={false}
            />,
        )

        expect(onEdit).not.toHaveBeenCalled()
        expect(onToggleSelect).not.toHaveBeenCalled()
        expect(onToggleSelectAll).not.toHaveBeenCalled()
    })
})
