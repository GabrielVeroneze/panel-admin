import type { Summary } from './'

export type Sale = {
    date: string
    templates: number
    hosting: number
}

export type TodaySale = {
    summary: Summary
    chart: {
        time: string
        sales: number
        profit: number
    }[]
}
