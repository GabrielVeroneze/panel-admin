import { describe, expect, it } from 'vitest'
import { toFormData } from './toFormData'

describe('toFormData', () => {
    it('converts primitive values to strings', () => {
        const formData = toFormData({
            name: 'Gabriel',
            age: 28,
            active: true,
        })

        expect(formData.get('name')).toBe('Gabriel')
        expect(formData.get('age')).toBe('28')
        expect(formData.get('active')).toBe('true')
    })

    it('ignores null and undefined values', () => {
        const formData = toFormData({
            name: 'Gabriel',
            nickname: null,
            avatar: undefined,
        })

        expect(formData.get('name')).toBe('Gabriel')
        expect(formData.has('nickname')).toBe(false)
        expect(formData.has('avatar')).toBe(false)
    })

    it('converts array values to multiple form data entries', () => {
        const formData = toFormData({
            roles: ['admin', 'manager', 'user'],
        })

        expect(formData.getAll('roles')).toEqual(['admin', 'manager', 'user'])
    })

    it('converts non-file array items to strings', () => {
        const formData = toFormData({
            ids: [1, 2, 3],
        })

        expect(formData.getAll('ids')).toEqual(['1', '2', '3'])
    })

    it('appends a File value without converting it to a string', () => {
        const file = new File(['avatar content'], 'avatar.png', {
            type: 'image/png',
        })

        const formData = toFormData({
            avatar: file,
        })

        expect(formData.get('avatar')).toBe(file)
    })

    it('appends multiple File values using the same key', () => {
        const firstFile = new File(['first'], 'first.png', {
            type: 'image/png',
        })

        const secondFile = new File(['second'], 'second.png', {
            type: 'image/png',
        })

        const formData = toFormData({
            avatars: [firstFile, secondFile],
        })

        expect(formData.getAll('avatars')).toEqual([firstFile, secondFile])
    })

    it('supports mixed values in an array', () => {
        const file = new File(['document'], 'document.pdf', {
            type: 'application/pdf',
        })

        const formData = toFormData({
            attachments: ['cover', 123, file],
        })

        const values = formData.getAll('attachments')

        expect(values[0]).toBe('cover')
        expect(values[1]).toBe('123')
        expect(values[2]).toBe(file)
    })

    it('supports an empty array without adding an entry', () => {
        const formData = toFormData({
            attachments: [],
        })

        expect(formData.has('attachments')).toBe(false)
    })

    it('preserves different values under different keys', () => {
        const file = new File(['content'], 'document.pdf', {
            type: 'application/pdf',
        })

        const formData = toFormData({
            name: 'Document',
            tags: ['important', 'work'],
            attachment: file,
        })

        expect(formData.get('name')).toBe('Document')
        expect(formData.getAll('tags')).toEqual(['important', 'work'])
        expect(formData.get('attachment')).toBe(file)
    })
})
