import type { TooltipProps } from 'recharts'

export type ChartValueFormatter = TooltipProps<number, string>['formatter']

export type ChartLabelFormatter = TooltipProps<number, string>['labelFormatter']
