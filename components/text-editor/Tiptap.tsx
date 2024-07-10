'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Button } from '../ui/button'
import MenuBar from './Menubar'
import { useEffect } from 'react'

interface TiptapProps {
  text: string;
  onChange: (hasChanges: string) => void;
}

function Tiptap({ text, onChange }: TiptapProps) {

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-dark my-5 mx-2 focus:outline-none',
      },
    },
    content: text,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
