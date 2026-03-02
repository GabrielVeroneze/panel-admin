import type { YAxisTickContentProps } from 'recharts'
import * as Flags from '@/shared/assets/flags'

type FlagKey = keyof typeof Flags

export const SessionsYAxisTick = ({
    x,
    y,
    payload,
    index,
    tickFormatter,
}: YAxisTickContentProps) => {
    const isoCode = payload.value
    const Flag = Flags[isoCode as FlagKey]

    const label = tickFormatter
        ? tickFormatter(payload.value, index)
        : payload.value

    return (
        <g transform={`translate(${Number(x) - 100}, ${Number(y) - 6.5})`}>
            {Flag && <Flag height={14} width={20} />}
            <text
                x={32}
                y={11}
                textAnchor="start"
                fill="#18181b"
                fontSize={12}
                fontWeight={500}
            >
                {label}
            </text>
        </g>
    )
}
