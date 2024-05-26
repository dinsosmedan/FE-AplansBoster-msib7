import ENV from '@/lib/environment'
import { Editor } from '@tinymce/tinymce-react'

interface TextEditorProps {
  id: string
  value: string
  onChange: (value: string) => void
}

export default function TextEditor({ id, value, onChange }: TextEditorProps) {
  apiKey='efa5um0ipuy2f437nmvmq6gfsdax3f439y8h3ncxee6zc1ud'
  const defaultInit = {
    height: 500,
    menubar: false,
    plugins: 'link lists advlist',
    placeholder: 'Masukkan Deskripsi Event',
    toolbar: 'undo redo ' + ' | bold italic | ' + ' | link | numlist bullist',
    advlist_number_styles: 'default,lower-alpha,lower-roman,upper-alpha,upper-roman'
  }

  return (
    <Editor
      id={id}
      init={defaultInit}
      apiKey={ENV.apiKeyTinyMce}
      value={value}
      onEditorChange={(newValue: string) => onChange(newValue)}
    />
  )
}
