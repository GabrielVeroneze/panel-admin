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
}

export const MapTooltip = ({
    x,
    y,
    countryCode,
    countryName,
}: MapTooltipProps) => {
    const { sessions, previous } = getCountryMetrics(countryCode)

    const Flag = Flags[countryCode as FlagKey]

    return (
        <div
            style={{
                position: 'fixed',
                left: x,
                top: y - 12,
                pointerEvents: 'none',
            }}
        >
            <Tooltip
                showArrow
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {Flag && <Flag height={12} width={18} />}
                        <span style={{ marginLeft: 4 }}>{countryName}</span>
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
