import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button'; // Assuming you have a custom Button component
import { useState } from 'react';
import { Redo, Undo } from 'lucide-react';

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const [currentColor, setCurrentColor] = useState('#958DF1'); // Example initial color

  if (!editor) {
    return null;
  }

  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleToggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const handleToggleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  const handleClearMarks = () => {
    editor.chain().focus().unsetAllMarks().run();
  };

  const handleClearNodes = () => {
    editor.chain().focus().clearNodes().run();
  };

  const handleSetParagraph = () => {
    editor.chain().focus().setParagraph().run();
  };

  const handleToggleHeading = (level: number) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const handleToggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleToggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const handleToggleCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  const handleToggleBlockquote = () => {
    editor.chain().focus().toggleBlockquote().run();
  };

  const handleSetHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  const handleSetHardBreak = () => {
    editor.chain().focus().setHardBreak().run();
  };

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  const handleSetColor = (color: string) => {
    setCurrentColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const isActive = (type: string, attrs?: Record<string, any>) => {
    return editor.isActive(type, attrs);
  };

  return (
    <div className="control-group space-x-1 space-y-1 overflow-x-scroll sm:w-6/ min-h-12 sm:h-fit">
      <Button
        onClick={handleToggleBold}
        disabled={!editor.can().toggleBold()}
        className={`editor-button ${isActive('bold') ? `is-active` : ''} p-2 py-1 h-fit ml-1 mt-1` }
      >
        Bold
      </Button>
      <Button
        onClick={handleToggleItalic}
        disabled={!editor.can().toggleItalic()}
        className={`editor-button ${isActive('italic') ? 'is-active' : ''} p-2 py-1 h-fit`}
      >
        Italic
      </Button>
      <Button
        onClick={handleToggleStrike}
        disabled={!editor.can().toggleStrike()}
        className={`editor-button ${isActive('strike') ? 'is-active' : ''} p-2 py-1 h-fit`}
      >
        Strike
      </Button>
      <Button
        onClick={handleToggleCode}
        disabled={!editor.can().toggleCode()}
        className={`editor-button ${isActive('code') ? 'is-active' : ''} p-2 py-1 h-fit`}
      >
        Code
      </Button>
      <Button onClick={handleSetParagraph}
      className={`editor-button p-2 py-1 h-fit`}>
        Paragraph</Button>
      <Button
        onClick={() => handleToggleHeading(1)}
        className={`editor-button ${isActive('heading', { level: 1 }) ? 'is-active' : ''} p-2 py-1 h-fit`}
      >
        H1
      </Button>
      <Button
        onClick={() => handleToggleHeading(2)}
        className={`editor-button ${isActive('heading', { level: 2 }) ? 'is-active' : ''} p-2 py-1 h-fit`}
      >
        H2
      </Button>
      <Button onClick={() => handleToggleHeading(3)}
        className={`editor-button p-2 py-1 h-fit`}>
            H3</Button>
      <Button onClick={handleToggleBulletList}
      className={`editor-button p-2 py-1 h-fit`}>
        Bullet list</Button>
      <Button onClick={handleToggleOrderedList}
      className={`editor-button p-2 py-1 h-fit`}>
        Ordered list</Button>
      <Button onClick={handleToggleCodeBlock}
      className={`editor-button p-2 py-1 h-fit`}>
        Code block</Button>
      <Button onClick={handleToggleBlockquote}
      className={`editor-button p-2 py-1 h-fit`}>
        Blockquote</Button>
      <Button onClick={handleSetHorizontalRule}
      className={`editor-button p-2 py-1 h-fit`}>
        Horizontal rule</Button>
        <div className='flex gap-1'>
      <Button onClick={handleUndo}
      className={`editor-button p-2 py-1 h-fit`}>
        <Undo size={20} /></Button>
      <Button onClick={handleRedo}
      className={`editor-button px-2 py-1 h-fit`}>
        <Redo size={20} /></Button>
        </div>
    </div>
  );
};

export default MenuBar;
