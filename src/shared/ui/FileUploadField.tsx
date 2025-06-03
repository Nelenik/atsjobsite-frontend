'use client'
import { ChangeEvent, DragEventHandler, InputHTMLAttributes, Ref, useImperativeHandle, useRef, useState } from "react";
import FormItem from "./FormItem";
import { Input } from "./shadcn/input";
import { cn } from "../lib/utils";
import UploadIcon from '@/assets/icons/upload-svg.svg?rc'
import BorderSvg from '@/assets/icons/border-svg.svg?rc'

/**
 * Parses the accept attribute string into an array of file types
 * @param accept - Accept string like ".pdf,.jpg,image/*"
 * @returns Array of trimmed file types
 */
const parseAcceptString = (accept: string): string[] => {
  return accept.split(',').map(type => type.trim())
}

/**
 * Filters files based on the accept criteria
 * Supports both file extensions (.pdf) and MIME types (image/png)
 * @param accept - Accept string from input element
 * @param files - Array of files to filter
 * @returns Filtered array of accepted files
 */
const filterFiles = (accept: string | undefined, files: File[]) => {
  const acceptedTypes = accept ? parseAcceptString(accept) : null
  if (!acceptedTypes) return files

  return files.filter(file => {
    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.endsWith(type);
      } else {
        return file.type === type;
      }
    });
  })
}

/**
 * Reference interface exposed to parent components
 * Allows external control of the file upload component
 */
export type FileUploadRef = {
  getFiles: () => File[],      // Get current files
  clearFiles: () => void,      // Clear all files
  addFiles: (files: File[]) => void  // Add files programmatically
}

type Props = {
  rootStyles?: string
  inputStyles?: string
  ref: Ref<FileUploadRef> | null
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

/**
 * A drag-and-drop file upload component with visual feedback and imperative API
 * 
 * Features:
 * - Drag and drop file upload
 * - Click to select files
 * - File type filtering based on accept attribute
 * - Visual feedback during drag operations
 * - Animated border effects
 * - Imperative API for external control
 * 
 * @param props - Component props extending HTML input attributes
 * @param props.rootStyles - Custom CSS classes for root container
 * @param props.inputStyles - Custom CSS classes for input (reserved)
 * @param props.ref - Reference for imperative API access
 * @param props.multiple - Allow multiple file selection
 * @param props.accept - File type restrictions (extensions or MIME types)
 * 
 * @example
 * ```tsx
 * const fileUploadRef = useRef<FileUploadRef>(null)
 * 
 * <FileUploadField
 *   ref={fileUploadRef}
 *   multiple
 *   accept=".pdf,.jpg,.png,image/*"
 *   rootStyles="custom-upload-area"
 * />
 * 
 * // Access files programmatically
 * const files = fileUploadRef.current?.getFiles()
 * fileUploadRef.current?.clearFiles()
 * ```
 */
export const FileUploadField = ({
  rootStyles,
  ref,
  multiple,
  accept,
  ...props
}: Props) => {
  // Ref to the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  // State to track selected files
  const [files, setFiles] = useState<File[]>([])
  // State to track drag over status for visual feedback
  const [isDragOver, setIsDragOver] = useState<boolean>(false)

  /**
  * Expose imperative API to parent components
  * This allows parent to programmatically interact with the file upload
  */
  useImperativeHandle(ref, () => ({
    getFiles: () => files,
    clearFiles: () => {
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    addFiles: (files: File[]) => {
      setFiles(prev => [...prev, ...files])
    }
  }), [files])

  /**
   * Update files state - centralized method for consistency
   */
  const updateFiles = (newFiles: File[]) => {
    setFiles(newFiles)
  }

  /**
   * Handle file selection via the file input dialog
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (!e.target.files || !e.target.files.length) return
    const newFiles = Array.from(e.target.files)
    console.log(newFiles)
    updateFiles(newFiles)
  }

  /**
   * Handle file drop event
   * Processes dropped files and applies accept filtering
   */
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (!files) return;

    // Filter files based on accept attribute
    const acceptedFiles = filterFiles(accept, Array.from(files))
    if (!acceptedFiles.length) return

    // Handle multiple vs single file selection
    const newFiles = multiple ? acceptedFiles : [acceptedFiles[acceptedFiles.length - 1]]

    // Clear the input value to ensure change events fire correctly
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setIsDragOver(false)
    updateFiles(newFiles)
  }

  /**
   * Handle drag enter - show visual feedback
   */
  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  /**
  * Handle drag leave - remove visual feedback
  */
  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }
  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
  }
  return (
    <FormItem
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={cn(
        'grow h-20',
        'hover:opacity-65 group/file-field',
        isDragOver && 'opacity-65',
        rootStyles
      )}
    >
      <Input
        onChange={handleChange}
        ref={fileInputRef}
        className={cn(
          'absolute w-full h-full left-0 top-0 appearance-none opacity-0 z-10 cursor-pointer',
        )}
        type="file"
        multiple={multiple}
        accept={accept}
        {...props}
      />
      <UploadIcon
        className={cn(
          'h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',

        )}
      />
      <BorderSvg
        className={cn(
          'w-full h-full',
          '[stroke-dasharray:5] group-hover/file-field:animate-move-border',
          isDragOver && 'animate-move-border'
        )}
      />
    </FormItem>
  )
}