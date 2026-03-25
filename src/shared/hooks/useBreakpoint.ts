import { useState, useEffect } from 'react'

export const useBreakpoint = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isMobile = width < 576
    const isTablet = width >= 576 && width < 1024
    const isDesktop = width >= 1024

    return { isMobile, isTablet, isDesktop }
}
