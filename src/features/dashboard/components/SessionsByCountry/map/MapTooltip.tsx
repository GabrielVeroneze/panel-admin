import { formatChangePercent, formatCompactNumber } from '@/shared/utils'
import { Tooltip } from '@/shared/components'
import { getCountryMetrics } from './map.utils'
import * as Flags from '@/shared/assets/flags'

type FlagKey = keyof typeof Flags

type MapTooltipProps = {
    x: number
    y: number
    countryCode: string
    countryName: string
    sessionsMap: Map<string, number>
    previousMap: Map<string, number>
}

export const MapTooltip = ({
    x,
    y,
    countryCode,
    countryName,
    sessionsMap,
    previousMap,
}: MapTooltipProps) => {
    const { sessions, previous } = getCountryMetrics(
        countryCode,
        sessionsMap,
        previousMap,
    )

    const Flag = Flags[countryCode as FlagKey]

    return (
        <div className="tooltip-container" style={{ left: x, top: y }}>
            <Tooltip
                showArrow
                title={
                    <div className="tooltip-title">
                        {Flag && <Flag height={12} width={18} />}
                        <span>{countryName}</span>
                    </div>
                }
                items={[
                    {
                        name: 'Visitors',
                        value: formatCompactNumber(sessions, { decimals: 1 }),
                    },
                    {
                        name: 'Change',
                        value: formatChangePercent(sessions, previous),
                    },
                ]}
            />
        </div>
    )
}
