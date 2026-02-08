import { useState, useEffect } from 'react'

export const useBreakpoint = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const isMobile = width <= 360
    const isTablet = width > 360 && width <= 768
    const isDesktop = width > 768

    return { isMobile, isTablet, isDesktop }
}
