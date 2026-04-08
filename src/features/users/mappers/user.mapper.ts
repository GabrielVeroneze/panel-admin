    if (!user) {
        return { ...baseDefaultValues }
    }

export const mapUserToUpdateFormValues = (user: User): UpdateUserFormValues => {
    const [firstName, ...rest] = user.name.split(' ')
    const lastName = rest.join(' ')

    return {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        email: user.email,
        phone: user.phone,
        company: user.company,
        department: user.department,
    }
}

export const mapUserToListItem = (user: User): UserListItem => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    position: user.department,
    country: user.country,
    status: user.status,
})
