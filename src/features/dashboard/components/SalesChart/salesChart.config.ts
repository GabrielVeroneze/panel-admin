type ChartDevice = 'mobile' | 'tablet' | 'desktop'

type ChartResponsiveConfig = {
    margin: {
        top: number
        right: number
        bottom: number
        left: number
    }
    padding: {
        right: number
        left: number
    }
    xAxisAngle: number
    showYAxis: boolean
}

export const chartConfig: Record<ChartDevice, ChartResponsiveConfig> = {
    mobile: {
        margin: { top: 5, right: 0, bottom: 24, left: 0 },
        padding: { left: 15, right: 20 },
        xAxisAngle: -45,
        showYAxis: false,
    },
    tablet: {
        margin: { top: 0, right: 0, bottom: 18, left: 0 },
        padding: { left: 0, right: 20 },
        xAxisAngle: -45,
        showYAxis: true,
    },
    desktop: {
        margin: { top: 0, right: 0, bottom: 18, left: 0 },
        padding: { left: 0, right: 20 },
        xAxisAngle: 0,
        showYAxis: true,
    },
}
