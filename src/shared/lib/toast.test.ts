import { describe, expect, it, vi } from 'vitest'
import { toast } from 'sonner'
import { Toast } from './toast'

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn(),
    },
}))

describe('Toast', () => {
    describe('success', () => {
        it('shows a success toast with the provided message', () => {
            Toast.success('Operation completed successfully')

            expect(toast.success).toHaveBeenCalledWith(
                'Operation completed successfully',
            )
        })
    })

    describe('error', () => {
        it('shows an error toast with the provided message', () => {
            Toast.error('Something went wrong')

            expect(toast.error).toHaveBeenCalledWith('Something went wrong')
        })
    })

    describe('info', () => {
        it('shows an info toast with the provided message', () => {
            Toast.info('New information available')

            expect(toast.info).toHaveBeenCalledWith('New information available')
        })
    })

    describe('warning', () => {
        it('shows a warning toast with the provided message', () => {
            Toast.warning('Please check your input')

            expect(toast.warning).toHaveBeenCalledWith(
                'Please check your input',
            )
        })
    })
})
