export const toFormData = (data: Record<string, unknown>) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return

        if (value instanceof File) {
            formData.append(key, value)
        } else {
            formData.append(key, String(value))
        }
    })

    return formData
}
