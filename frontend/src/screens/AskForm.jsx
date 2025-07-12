import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import './styles/tiptap.css'

const AskForm = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [headingLevel, setHeadingLevel] = useState('Paragraph');
  const [isLinkMenuOpen, setIsLinkMenuOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'embedded-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'embedded-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '<p>Describe your question in detail...</p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = editor?.getHTML() || '';
    console.log({ title, description, tags });
  };

  const addImage = () => {
    const url = window.prompt('Enter the image URL:');
    if (url) {
      let imageUrl = url;
      if (url.includes('imgurl=')) {
        const match = url.match(/imgurl=([^&]+)/);
        if (match && match[1]) {
          imageUrl = decodeURIComponent(match[1]);
        }
      }
      editor?.chain().focus().setImage({ src: imageUrl }).run();
    }
  };

  const setLink = () => {
    if (!editor) return;
    
    if (isLinkMenuOpen) {
      if (linkUrl === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
      } else {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      }
      setIsLinkMenuOpen(false);
      setLinkUrl('');
    } else {
      const previousUrl = editor.getAttributes('link').href;
      setLinkUrl(previousUrl || '');
      setIsLinkMenuOpen(true);
    }
  };

  const setHeading = (level) => {
    if (!editor) return;
    
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
      setHeadingLevel('Paragraph');
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
      setHeadingLevel(`H${level}`);
    }
  };

  const setAlignment = (alignment) => {
    if (!editor) return;
    editor.chain().focus().setTextAlign(alignment).run();
  };

  const activeClass = "bg-[#D84040] text-white";
  const inactiveClass = "bg-white hover:bg-gray-100 text-gray-800";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-[#1D1616] text-gray-100 flex justify-center items-start py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="bg-[#D84040] p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D84040] to-red-300">
            Post Your Question
          </h1>
        </div>

        {/* Title */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-3 text-gray-300">Question Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your programming question?"
            className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D84040] focus:border-transparent transition-all text-white placeholder-gray-400"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-3 text-gray-300">Detailed Description</label>
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-700 rounded-t-lg border border-gray-600 mb-[-1px]">
            {/* Heading Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`px-2 py-1 rounded-md text-sm hover:bg-[#D84040] hover:text-white bg-[#EEEEEE] text-black`}
              >
                {headingLevel} ▼
              </button>
              <div className="absolute left-0 mt-1 w-32 bg-white shadow-lg rounded-md z-10 hidden group-hover:block">
                {[
                  { label: 'Paragraph', level: 0 },
                  { label: 'Heading 1', level: 1 },
                  { label: 'Heading 2', level: 2 },
                  { label: 'Heading 3', level: 3 },
                  { label: 'Heading 4', level: 4 },
                  { label: 'Heading 5', level: 5 },
                  { label: 'Heading 6', level: 6 },
                ].map(({ label, level }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setHeading(level)}
                    className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-black"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>


            <div className="h-5 w-px bg-gray-500 mx-1"></div>

            {/* Text Formatting */}
            {[
              { icon: 'B', action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
              { icon: 'I', action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
              { icon: 'U', action: () => editor?.chain().focus().toggleUnderline().run(), active: editor?.isActive('underline') },
            ].map(({ icon, action, active }, index) => (
              <button
                key={index}
                type="button"
                onClick={action}
                className={`px-3 py-2 rounded-md text-sm font-medium ${active ? activeClass : inactiveClass}`}
              >
                {icon}
              </button>
            ))}

            <div className="h-5 w-px bg-gray-500 mx-1"></div>

            {/* Lists */}
            {[
              { icon: '• List', action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
              { icon: '1. List', action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive('orderedList') },
            ].map(({ icon, action, active }, index) => (
              <button
                key={index}
                type="button"
                onClick={action}
                className={`px-3 py-2 rounded-md text-sm font-medium ${active ? activeClass : inactiveClass}`}
              >
                {icon}
              </button>
            ))}

            <div className="h-5 w-px bg-gray-500 mx-1"></div>

            {/* Alignment */}
            <div className="flex items-center space-x-1">
              {[
                { icon: '⬅', action: () => setAlignment('left'), active: editor?.isActive({ textAlign: 'left' }) },
                { icon: '🔘', action: () => setAlignment('center'), active: editor?.isActive({ textAlign: 'center' }) },
                { icon: '➡', action: () => setAlignment('right'), active: editor?.isActive({ textAlign: 'right' }) },
              ].map(({ icon, action, active }, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={action}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${active ? activeClass : inactiveClass}`}
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="h-5 w-px bg-gray-500 mx-1"></div>

            {/* Link Input */}
            {isLinkMenuOpen ? (
              <div className="flex items-center bg-gray-600 rounded-md overflow-hidden">
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL"
                  className="px-3 py-2 bg-gray-600 text-white text-sm w-40 focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={setLink}
                  className="px-2 py-2 bg-[#D84040] text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={setLink}
                className={`px-3 py-2 rounded-md text-sm font-medium ${editor?.isActive('link') ? activeClass : inactiveClass}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
            )}

            {/* Other Formatting */}
            {[
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                action: () => editor?.chain().focus().toggleCodeBlock().run(),
                active: editor?.isActive('codeBlock')
              },
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                ),
                action: () => editor?.chain().focus().toggleBlockquote().run(),
                active: editor?.isActive('blockquote')
              },
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                action: addImage,
                active: false
              },
            ].map(({ icon, action, active }, index) => (
              <button
                key={index}
                type="button"
                onClick={action}
                className={`px-3 py-2 rounded-md text-sm font-medium ${active ? activeClass : inactiveClass}`}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Editor Content */}
          <div className="bg-gray-700 border border-gray-600 rounded-b-lg overflow-hidden">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-3 text-gray-300">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, javascript, typescript"
            className="w-full px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D84040] focus:border-transparent transition-all text-white placeholder-gray-400"
          />
          <p className="mt-2 text-sm text-gray-400">Add up to 5 tags separated by commas</p>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-[#D84040] to-red-600 hover:from-[#8E1616] hover:to-[#D84040] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Post Question
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default AskForm;