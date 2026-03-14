import type { Summary } from './'

export type TodayVisitor = {
    summary: Summary
    chart: {
        time: string
        visitors: number
    }[]
}

export type WeekVisitor = {
    summary: Summary
    chart: {
        key: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
        label: string
        day: string
        users: number
    }[]
}
