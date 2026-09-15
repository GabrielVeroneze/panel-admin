import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ImagesPreview } from './ImagesPreview'

const createFile = (name: string, type = 'image/jpeg') =>
    new File(['image'], name, { type })

const createObjectURLMock = vi.spyOn(URL, 'createObjectURL')

describe('ImagesPreview', () => {
    beforeEach(() => {
        createObjectURLMock.mockReset()

        createObjectURLMock.mockImplementation(
            (file) => `blob:${(file as File).name}`,
        )
    })

    it('does not render anything when there are no files', () => {
        const onRemove = vi.fn()

        const { container } = render(
            <ImagesPreview files={[]} onRemove={onRemove} />,
        )

        expect(container.firstChild).toBeNull()
    })

    it('renders one preview for each file', () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.png', 'image/png'),
            createFile('product-3.webp', 'image/webp'),
        ]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(screen.getAllByRole('img')).toHaveLength(3)
    })

    it('uses the file name as the image alt text', () => {
        const files = [
            createFile('product-front.jpg'),
            createFile('product-back.jpg'),
        ]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(
            screen.getByRole('img', { name: 'product-front.jpg' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('img', { name: 'product-back.jpg' }),
        ).toBeInTheDocument()
    })

    it('creates an object URL for each file', () => {
        const files = [createFile('product-1.jpg'), createFile('product-2.jpg')]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(createObjectURLMock).toHaveBeenCalledTimes(2)
        expect(createObjectURLMock).toHaveBeenNthCalledWith(1, files[0])
        expect(createObjectURLMock).toHaveBeenNthCalledWith(2, files[1])
    })

    it('uses the generated object URL as the image source', () => {
        const files = [createFile('product-1.jpg'), createFile('product-2.jpg')]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(
            screen.getByRole('img', { name: 'product-1.jpg' }),
        ).toHaveAttribute('src', 'blob:product-1.jpg')

        expect(
            screen.getByRole('img', { name: 'product-2.jpg' }),
        ).toHaveAttribute('src', 'blob:product-2.jpg')
    })

    it('calls onRemove with the correct index when the first remove button is clicked', () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.jpg'),
            createFile('product-3.jpg'),
        ]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[0])

        expect(onRemove).toHaveBeenCalledTimes(1)
        expect(onRemove).toHaveBeenCalledWith(0)
    })

    it('calls onRemove with the correct index when another remove button is clicked', () => {
        const files = [
            createFile('product-1.jpg'),
            createFile('product-2.jpg'),
            createFile('product-3.jpg'),
        ]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        const buttons = screen.getAllByRole('button')

        fireEvent.click(buttons[2])

        expect(onRemove).toHaveBeenCalledTimes(1)
        expect(onRemove).toHaveBeenCalledWith(2)
    })

    it('does not call onRemove when no remove button is clicked', () => {
        const files = [createFile('product.jpg')]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(onRemove).not.toHaveBeenCalled()
    })

    it('renders a single preview when there is only one file', () => {
        const files = [createFile('product.jpg')]

        const onRemove = vi.fn()

        render(<ImagesPreview files={files} onRemove={onRemove} />)

        expect(
            screen.getByRole('img', { name: 'product.jpg' }),
        ).toBeInTheDocument()

        expect(screen.getAllByRole('button')).toHaveLength(1)
    })
})
