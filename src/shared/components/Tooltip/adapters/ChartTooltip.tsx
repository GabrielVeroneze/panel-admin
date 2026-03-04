import { Tooltip } from '@/shared/components'
import type { TooltipContentProps } from 'recharts'

export const ChartTooltip = ({
    active,
    payload,
    label,
    formatter,
    labelFormatter,
}: TooltipContentProps<number, string>) => {
    if (!active || !payload.length) return null

    const formattedLabel = labelFormatter
        ? labelFormatter(label, payload)
        : label

    const getFormattedValue = (
        item: (typeof payload)[number],
        index: number,
    ) =>
        formatter
            ? formatter(item.value, item.name, item, index, payload)
            : item.value

    const title = formattedLabel !== null ? String(formattedLabel) : undefined

    return (
        <Tooltip
            title={title}
            items={payload.map((item, index) => ({
                name: item.name,
                value: getFormattedValue(item, index),
                color: item.color ?? item.payload?.fill,
            }))}
        />
    )
}
