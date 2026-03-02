import { renderToString } from 'react-dom/server'
import { formatChangePercent, formatCompactNumber } from '@/shared/utils'
import { Tooltip } from '@/shared/components'
import { previousMap, sessionsMap } from '../sessions.data'
import type { Feature } from 'geojson'
import type { Layer } from 'leaflet'
import * as Flags from '@/shared/assets/flags'

type FlagKey = keyof typeof Flags

export const createOnEachFeature = (feature: Feature, layer: Layer) => {
    const isoCode = feature.properties?.iso_a2
    const countryName = feature.properties?.name

    if (!isoCode || !countryName) return

    const sessions = sessionsMap.get(isoCode) ?? 0
    const previous = previousMap.get(isoCode) ?? 0

    const Flag = Flags[isoCode as FlagKey]

    const tooltipHtml = renderToString(
        <Tooltip
            showArrow
            title={
                <div style={{ alignItems: 'center', display: 'flex' }}>
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
        />,
    )

    layer.bindTooltip(tooltipHtml, {
        sticky: true,
        direction: 'top',
    })
}
