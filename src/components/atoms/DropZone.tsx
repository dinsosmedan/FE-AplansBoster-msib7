/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type Accept, type FileRejection, type FileWithPath, useDropzone } from 'react-dropzone'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { bytesToSize, cn } from '@/lib/utils'
import { HiOutlineDocument, HiTrash } from 'react-icons/hi2'
import { type IconType } from 'react-icons'

export type FileWithPreview = FileWithPath & { preview: string }
interface DropZoneProps {
  accept?: Accept
  id: string
  maxFiles?: number
  helperText?: string
  subTitle?: string
  setValue: (value: unknown, options?: { shouldValidate?: boolean }) => void
  fileValue?: FileWithPreview[]
  Icon: IconType
  maxFileSize?: number
}

export default function DropZone({
  accept,
  id,
  maxFiles,
  helperText,
  setValue,
  fileValue,
  subTitle,
  Icon,
  maxFileSize
}: DropZoneProps) {
  const { setError, clearErrors, formState } = useFormContext()
  const { errors } = formState
  const dropzoneRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    errors[id] && dropzoneRef.current?.focus()
  }, [errors, id])

  const [files, setFiles] = React.useState<FileWithPreview[]>(fileValue ?? [])

  React.useEffect(() => {
    setFiles(fileValue as FileWithPreview[])
  }, [fileValue])

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(files ? [...files] : null)
        setError(id, {
          type: 'manual',
          message: rejectedFiles?.[0].errors[0].message
        })
      } else {
        const oversizedFiles = acceptedFiles.filter((file) => file.size > (maxFileSize ?? 2 * 1024 * 1024))
        if (oversizedFiles.length > 0) {
          setError(id, {
            type: 'manual',
            message: `File '${oversizedFiles[0].name}' melebihi ukuran maksimum ${
              maxFileSize ? bytesToSize(maxFileSize) : '2 MB'
            }.`
          })
        } else {
          const acceptedFilesPreview = acceptedFiles.map((file: T) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )

          setFiles(files ? [...files, ...acceptedFilesPreview].slice(0, maxFiles) : acceptedFilesPreview)

          setValue(files ? [...files, ...acceptedFiles].slice(0, maxFiles) : acceptedFiles, {
            shouldValidate: true
          })
          clearErrors(id)
        }
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  )

  React.useEffect(() => {
    return () => {
      ;() => {
        files.forEach((file) => URL.revokeObjectURL(file.preview))
      }
    }
  }, [files])

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: FileWithPreview) => {
    e.preventDefault()
    const newFiles = [...files]

    newFiles.splice(newFiles.indexOf(file), 1)

    if (newFiles.length > 0) {
      setFiles(newFiles)
      setValue(newFiles, { shouldValidate: true })
    } else {
      setFiles([])
      setValue(null, { shouldValidate: true })
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    maxFiles
  })

  return (
    <div className="flex w-full flex-col gap-1.5 xl:gap-2.5 relative">
      {files?.length ? (
        <div className="flex w-full flex-col gap-3">
          {files.map((file, id) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border border-slate-300 py-2.5 pl-4 pr-5"
            >
              <div className="flex items-center gap-2">
                <HiOutlineDocument className="text-slate-500" />
                <span className="truncate-1 text-sm text-slate-500">{file?.name ?? file}</span>
              </div>

              <button
                className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                onClick={(e) => deleteFile(e, file)}
              >
                <HiTrash className="m-auto text-xl text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <React.Fragment>
          <div className="relative" {...getRootProps()} ref={dropzoneRef}>
            <input id={id} {...getInputProps()} />
            <div
              className={cn(
                'flex min-h-[140px] xl:min-h-[160px] w-full cursor-pointer rounded-lg border-2 border-dashed border-primary p-4 bg-[#F7FBFF]'
              )}
            >
              <div className="flex w-full flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex">
                  <Icon className="flex text-xl text-white md:text-4xl m-auto" />
                </div>
                <span className="mt-3 text-center text-sm text-black md:text-base font-semibold">
                  Drag and drop or Upload File
                </span>
                {subTitle && <p className="mt-1 text-[10px] xl:text-xs text-slate-400">{subTitle}</p>}
              </div>
            </div>
          </div>
          {helperText && <p className="-mt-2 text-[10px] xl:text-xs text-zinc-500">{helperText}</p>}
        </React.Fragment>
      )}

      {errors[id] && (
        <span className="text-sm font-medium text-red-500 dark:text-red-900">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  )
}
