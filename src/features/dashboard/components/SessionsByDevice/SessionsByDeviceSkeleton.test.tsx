import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SessionsByDeviceSkeleton } from './SessionsByDeviceSkeleton'

describe('SessionsByDeviceSkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<SessionsByDeviceSkeleton />)

        expect(container.firstElementChild).toHaveClass('container')
    })

    it('renders the title skeleton with the expected dimensions', () => {
        const { container } = render(<SessionsByDeviceSkeleton />)

        const skeleton = container.firstElementChild?.firstElementChild

        expect(skeleton).toHaveClass('skeleton')
        expect(skeleton).toHaveStyle({
            width: '160px',
            height: '20px',
        })
    })

    it('renders the chart container', () => {
        const { container } = render(<SessionsByDeviceSkeleton />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the chart skeleton with the expected dimensions', () => {
        const { container } = render(<SessionsByDeviceSkeleton />)

        const chartSkeleton = container.querySelector(
            '.chartContainer > .skeleton',
        )

        expect(chartSkeleton).toBeInTheDocument()
        expect(chartSkeleton).toHaveStyle({
            width: '182px',
            height: '182px',
        })
    })
})
