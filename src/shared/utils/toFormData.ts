export const toFormData = (data: Record<string, unknown>) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return

        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item instanceof File) {
                    formData.append(key, item)
                } else {
                    formData.append(key, String(item))
                }
            })
            return
        }

        if (value instanceof File) {
            formData.append(key, value)
            return
        }

        formData.append(key, String(value))
    })

    return formData
}
