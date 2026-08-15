import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { UploadDropzone } from './UploadDropzone'
import userEvent from '@testing-library/user-event'

describe('UploadDropzone', () => {
    describe('rendering', () => {
        it('renders the upload dropzone', () => {
            render(<UploadDropzone />)

            expect(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
            ).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(<UploadDropzone>Drop files here</UploadDropzone>)

            expect(screen.getByText('Drop files here')).toBeInTheDocument()
        })

        it('renders the file input', () => {
            render(<UploadDropzone />)

            expect(screen.getByLabelText('File upload')).toBeInTheDocument()
        })

        it('applies a custom className', () => {
            render(<UploadDropzone className="custom-dropzone" />)

            expect(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
            ).toHaveClass('custom-dropzone')
        })

        it.each(['success', 'error'] as const)(
            'applies the %s status',
            (status) => {
                render(<UploadDropzone status={status} />)

                expect(
                    screen.getByRole('generic', {
                        name: 'Upload files',
                    }),
                ).toHaveClass(status)
            },
        )

        it('applies the input id', () => {
            render(<UploadDropzone id="avatar-upload" />)

            expect(screen.getByLabelText('File upload')).toHaveAttribute(
                'id',
                'avatar-upload',
            )
        })

        it('applies the accept attribute', () => {
            render(<UploadDropzone accept="image/*" />)

            expect(screen.getByLabelText('File upload')).toHaveAttribute(
                'accept',
                'image/*',
            )
        })
    })

    describe('file selection', () => {
        it('calls onFileSelect with the selected file', async () => {
            const user = userEvent.setup()
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            const file = new File(['file content'], 'document.pdf', {
                type: 'application/pdf',
            })

            const input = screen.getByLabelText('File upload')

            await user.upload(input, file)

            expect(handleFileSelect).toHaveBeenCalledTimes(1)

            expect(handleFileSelect).toHaveBeenCalledWith(file)
        })

        it('calls onFileSelect with all selected files when multiple is true', async () => {
            const user = userEvent.setup()
            const handleFileSelect = vi.fn()

            render(<UploadDropzone multiple onFileSelect={handleFileSelect} />)

            const files = [
                new File(['first'], 'first.txt', { type: 'text/plain' }),
                new File(['second'], 'second.txt', { type: 'text/plain' }),
            ]

            const input = screen.getByLabelText('File upload')

            await user.upload(input, files)

            expect(handleFileSelect).toHaveBeenCalledTimes(1)

            expect(handleFileSelect).toHaveBeenCalledWith(files)
        })

        it('uses only the first file when multiple is false', async () => {
            const user = userEvent.setup()
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            const files = [
                new File(['first'], 'first.txt', { type: 'text/plain' }),
                new File(['second'], 'second.txt', { type: 'text/plain' }),
            ]

            const input = screen.getByLabelText('File upload')

            await user.upload(input, files)

            expect(handleFileSelect).toHaveBeenCalledWith(files[0])
        })

        it('does not call onFileSelect when no files are selected', () => {
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            fireEvent.change(screen.getByLabelText('File upload'), {
                target: {
                    files: [],
                },
            })

            expect(handleFileSelect).not.toHaveBeenCalled()
        })

        it('does not require onFileSelect', async () => {
            const user = userEvent.setup()

            render(<UploadDropzone />)

            const file = new File(['file content'], 'document.pdf', {
                type: 'application/pdf',
            })

            await user.upload(screen.getByLabelText('File upload'), file)
        })
    })

    describe('drop interaction', () => {
        it('calls onFileSelect when a file is dropped', () => {
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            const file = new File(['file content'], 'document.pdf', {
                type: 'application/pdf',
            })

            fireEvent.drop(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
                {
                    dataTransfer: {
                        files: [file],
                    },
                },
            )

            expect(handleFileSelect).toHaveBeenCalledTimes(1)

            expect(handleFileSelect).toHaveBeenCalledWith(file)
        })

        it('calls onFileSelect with all dropped files when multiple is true', () => {
            const handleFileSelect = vi.fn()

            render(<UploadDropzone multiple onFileSelect={handleFileSelect} />)

            const files = [
                new File(['first'], 'first.txt', { type: 'text/plain' }),
                new File(['second'], 'second.txt', { type: 'text/plain' }),
            ]

            fireEvent.drop(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
                {
                    dataTransfer: {
                        files,
                    },
                },
            )

            expect(handleFileSelect).toHaveBeenCalledWith(files)
        })

        it('uses only the first dropped file when multiple is false', () => {
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            const files = [
                new File(['first'], 'first.txt', { type: 'text/plain' }),
                new File(['second'], 'second.txt', { type: 'text/plain' }),
            ]

            fireEvent.drop(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
                {
                    dataTransfer: {
                        files,
                    },
                },
            )

            expect(handleFileSelect).toHaveBeenCalledWith(files[0])
        })

        it('does not call onFileSelect when no files are dropped', () => {
            const handleFileSelect = vi.fn()

            render(<UploadDropzone onFileSelect={handleFileSelect} />)

            fireEvent.drop(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
                {
                    dataTransfer: {
                        files: [],
                    },
                },
            )

            expect(handleFileSelect).not.toHaveBeenCalled()
        })
    })

    describe('drag state', () => {
        it('applies the dragging class on drag over', () => {
            render(<UploadDropzone />)

            const dropzone = screen.getByRole('generic', {
                name: 'Upload files',
            })

            fireEvent.dragOver(dropzone)

            expect(dropzone).toHaveClass('dragging')
        })

        it('removes the dragging class on drag leave', () => {
            render(<UploadDropzone />)

            const dropzone = screen.getByRole('generic', {
                name: 'Upload files',
            })

            fireEvent.dragOver(dropzone)

            expect(dropzone).toHaveClass('dragging')

            fireEvent.dragLeave(dropzone)

            expect(dropzone).not.toHaveClass('dragging')
        })

        it('removes the dragging class after dropping files', () => {
            render(<UploadDropzone />)

            const dropzone = screen.getByRole('generic', {
                name: 'Upload files',
            })

            fireEvent.dragOver(dropzone)

            expect(dropzone).toHaveClass('dragging')

            fireEvent.drop(dropzone, {
                dataTransfer: {
                    files: [
                        new File(['content'], 'file.txt', {
                            type: 'text/plain',
                        }),
                    ],
                },
            })

            expect(dropzone).not.toHaveClass('dragging')
        })
    })

    describe('input interaction', () => {
        it('opens the file picker when the dropzone is clicked', () => {
            const clickSpy = vi
                .spyOn(HTMLInputElement.prototype, 'click')
                .mockImplementation(() => {})

            render(<UploadDropzone />)

            fireEvent.click(
                screen.getByRole('generic', {
                    name: 'Upload files',
                }),
            )

            expect(clickSpy).toHaveBeenCalledTimes(1)

            clickSpy.mockRestore()
        })

        it('passes multiple to the file input', () => {
            render(<UploadDropzone multiple />)

            expect(screen.getByLabelText('File upload')).toHaveAttribute(
                'multiple',
            )
        })

        it('does not enable multiple by default', () => {
            render(<UploadDropzone />)

            expect(screen.getByLabelText('File upload')).not.toHaveAttribute(
                'multiple',
            )
        })
    })
})
