import { delay, http, HttpResponse } from 'msw'

export const dashboardHandlers = [
    http.get('/api/dashboard', async () => {
        await delay(1000)

        return HttpResponse.json({
        })
    }),
]
