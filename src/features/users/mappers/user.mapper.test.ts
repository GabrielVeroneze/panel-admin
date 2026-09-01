import { describe, expect, it } from 'vitest'
import {
    mapFormToCreatePayload,
    mapFormToUpdatePayload,
    mapUserToListItem,
    mapUserToUpdateFormValues,
} from './user.mapper'

describe('user.mapper', () => {
    describe('mapUserToUpdateFormValues', () => {
        it('maps a user to update form values', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: 'https://example.com/avatar.jpg',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result).toEqual({
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
            })
        })

        it('keeps a multi-word last name together', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze da Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result.firstName).toBe('Gabriel')
            expect(result.lastName).toBe('Veroneze da Silva')
        })

        it('uses an empty first name when the user name starts with a space', () => {
            const user = {
                id: 1,
                name: ' Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result.firstName).toBe('')
            expect(result.lastName).toBe('Gabriel Veroneze')
        })

        it('uses an empty last name when the user has only one name', () => {
            const user = {
                id: 1,
                name: 'Gabriel',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result.firstName).toBe('Gabriel')
            expect(result.lastName).toBe('')
        })

        it('does not include password fields in the mapped form values', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result).not.toHaveProperty('currentPassword')
            expect(result).not.toHaveProperty('newPassword')
            expect(result).not.toHaveProperty('password')
            expect(result).not.toHaveProperty('confirmPassword')
        })

        it('does not include the user image in the mapped form values', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: 'https://example.com/avatar.jpg',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToUpdateFormValues(user)

            expect(result).not.toHaveProperty('image')
        })
    })

    describe('mapUserToListItem', () => {
        it('maps a user to a list item', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: 'https://example.com/avatar.jpg',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToListItem(user)

            expect(result).toEqual({
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                image: 'https://example.com/avatar.jpg',
                position: 'Engineering',
                country: 'Brazil',
                status: 'active',
            })
        })

        it('maps department to position', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Product Design',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'offline' as const,
            }

            const result = mapUserToListItem(user)

            expect(result.position).toBe('Product Design')
        })

        it('does not include fields that are not part of UserListItem', () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const result = mapUserToListItem(user)

            expect(result).not.toHaveProperty('phone')
            expect(result).not.toHaveProperty('company')
            expect(result).not.toHaveProperty('department')
        })
    })

    describe('mapFormToCreatePayload', () => {
        it('maps create user form values to the API payload', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            }

            const result = mapFormToCreatePayload(data)

            expect(result).toEqual({
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
                avatar: undefined,
            })
        })

        it('combines first name and last name into name', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze da Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            }

            const result = mapFormToCreatePayload(data)

            expect(result.name).toBe('Gabriel Veroneze da Silva')
        })

        it('includes the avatar when provided', () => {
            const avatar = new File(['avatar'], 'avatar.png', {
                type: 'image/png',
            })

            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                avatar,
            }

            const result = mapFormToCreatePayload(data)

            expect(result.avatar).toBe(avatar)
        })

        it('does not include confirmPassword in the API payload', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            }

            const result = mapFormToCreatePayload(data)

            expect(result).not.toHaveProperty('confirmPassword')
        })
    })

    describe('mapFormToUpdatePayload', () => {
        it('maps update user form values to the API payload', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
            }

            const result = mapFormToUpdatePayload(data)

            expect(result).toEqual({
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
            })
        })

        it('includes current password when provided', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                currentPassword: 'Current1!',
            }

            const result = mapFormToUpdatePayload(data)

            expect(result.currentPassword).toBe('Current1!')
        })

        it('includes new password when provided', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                newPassword: 'NewPassword1!',
            }

            const result = mapFormToUpdatePayload(data)

            expect(result.newPassword).toBe('NewPassword1!')
        })

        it('includes avatar when provided', () => {
            const avatar = new File(['avatar'], 'avatar.png', {
                type: 'image/png',
            })

            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                avatar,
            }

            const result = mapFormToUpdatePayload(data)

            expect(result.avatar).toBe(avatar)
        })

        it('includes all optional fields when provided', () => {
            const avatar = new File(['avatar'], 'avatar.png', {
                type: 'image/png',
            })

            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                currentPassword: 'Current1!',
                newPassword: 'NewPassword1!',
                avatar,
            }

            const result = mapFormToUpdatePayload(data)

            expect(result).toEqual({
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                currentPassword: 'Current1!',
                newPassword: 'NewPassword1!',
                avatar,
            })
        })

        it('does not include optional fields when they are undefined', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                currentPassword: undefined,
                newPassword: undefined,
                avatar: undefined,
            }

            const result = mapFormToUpdatePayload(data)

            expect(result).not.toHaveProperty('currentPassword')
            expect(result).not.toHaveProperty('newPassword')
            expect(result).not.toHaveProperty('avatar')
        })

        it('does not include empty optional fields', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                currentPassword: '',
                newPassword: '',
            }

            const result = mapFormToUpdatePayload(data)

            expect(result).not.toHaveProperty('currentPassword')
            expect(result).not.toHaveProperty('newPassword')
            expect(result).not.toHaveProperty('avatar')
        })

        it('does not include confirmPassword in the update payload', () => {
            const data = {
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
            }

            const result = mapFormToUpdatePayload(data)

            expect(result).not.toHaveProperty('confirmPassword')
        })
    })
})
