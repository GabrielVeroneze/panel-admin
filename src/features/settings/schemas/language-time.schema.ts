import { z } from 'zod'

export const languageTimeSchema = z.object({
    language: z.string().trim().min(1, 'Language is required'),
    timezone: z.string().trim().min(1, 'Timezone is required'),
})

export type LanguageTimeFormValues = z.infer<typeof languageTimeSchema>
