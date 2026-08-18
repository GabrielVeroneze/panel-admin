import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useBreakpoint } from './useBreakpoint'

describe('useBreakpoint', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('breakpoints', () => {
        it('returns mobile for widths below 576px', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(575)

            const { result } = renderHook(() => useBreakpoint())

            expect(result.current).toEqual({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            })
        })

        it('returns tablet for widths from 576px to 1023px', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(768)

            const { result } = renderHook(() => useBreakpoint())

            expect(result.current).toEqual({
                isMobile: false,
                isTablet: true,
                isDesktop: false,
            })
        })

        it('returns desktop for widths from 1024px', () => {
            vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024)

            const { result } = renderHook(() => useBreakpoint())

            expect(result.current).toEqual({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })
        })
    })

    describe('resize', () => {
        it('updates the breakpoint when the window is resized', () => {
            let width = 500

            vi.spyOn(window, 'innerWidth', 'get').mockImplementation(
                () => width,
            )

            const { result } = renderHook(() => useBreakpoint())

            expect(result.current).toEqual({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            })

            width = 768

            act(() => {
                window.dispatchEvent(new Event('resize'))
            })

            expect(result.current).toEqual({
                isMobile: false,
                isTablet: true,
                isDesktop: false,
            })

            width = 1200

            act(() => {
                window.dispatchEvent(new Event('resize'))
            })

            expect(result.current).toEqual({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })
        })
    })

    describe('lifecycle', () => {
        it('removes the resize listener when unmounted', () => {
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

            const removeEventListenerSpy = vi.spyOn(
                window,
                'removeEventListener',
            )

            const { unmount } = renderHook(() => useBreakpoint())

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                expect.any(Function),
            )

            const resizeHandler = addEventListenerSpy.mock.calls.find(
                ([event]) => event === 'resize',
            )?.[1]

            unmount()

            expect(removeEventListenerSpy).toHaveBeenCalledWith(
                'resize',
                resizeHandler,
            )
        })
    })
})
