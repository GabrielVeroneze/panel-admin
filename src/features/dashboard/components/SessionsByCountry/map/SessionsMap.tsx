import { useState } from 'react'
import { mapFeatures } from './map.features'
import { path } from './map.projection'
import { getCountryColor } from './map.utils'
import { MapTooltip } from './MapTooltip'

type TooltipState = {
    x: number
    y: number
    countryCode: string
    countryName: string
} | null

type SessionsMapProps = {
    className?: string
}

export const SessionsMap = ({ className }: SessionsMapProps) => {
    const [tooltip, setTooltip] = useState<TooltipState>(null)

    return (
        <div>
            <svg className={className} viewBox="0 0 900 420">
                {mapFeatures.map((feature, index) => {
                    const isoCode = feature.properties?.iso_a2
                    const countryName = feature.properties?.name

                    return (
                        <path
                            key={index}
                            d={path(feature) || ''}
                            fill={getCountryColor(isoCode)}
                            stroke="#ffffff"
                            strokeWidth={1}
                            onMouseMove={(e) => {
                                setTooltip({
                                    x: e.clientX,
                                    y: e.clientY,
                                    countryCode: isoCode,
                                    countryName,
                                })
                            }}
                            onMouseLeave={() => setTooltip(null)}
                        />
                    )
                })}
            </svg>
            {tooltip && <MapTooltip {...tooltip} />}
        </div>
    )
}
